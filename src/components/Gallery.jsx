import { useContext, useRef, useState } from "react";
import delet from "../assets/delete.png";
import editar from "../assets/edit.png";
import "./Gallery.scss";
import { UserContext } from "../App";

export default function Gallery({producto, indice, eliminar}){
    const user = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [comentAdmin, setComentAdmin] = useState(producto.comentariosAdmin);
    const [comentUser, setComentUser] = useState(producto.comentariosUser);
    const [ setName] = useState(producto.name);
    const [ setCantidad] = useState(producto.cantidad);
    const commentInputRef = useRef(null);
    let text = "";

    const handleModal = () => {
        setShowModal(true);
    }
    const handleClick = (text) => {
        if(user.user === "Admin"){
            let comentAdminCopy = [...comentAdmin];
            comentAdminCopy.push(text);
            setComentAdmin([...comentAdminCopy]);
            commentInputRef.current.value = "";
        } else {
            let comentUserCopy = [...comentUser];
            comentUserCopy.push(text);
            setComentUser([...comentUserCopy]);
            commentInputRef.current.value = "";
        }
    }
    const edit = () => {
        producto.name = prompt("Introduce el nuevo nombre: ");
        setName(producto.name);
        producto.cantidad = prompt("Introduce la nueva cantidad: ");
        setCantidad(producto.cantidad);
    }

    const borrar = (indice) => {
        console.log(indice);
        eliminar(indice);
    }
    return(
        <div className="gallery--prod">
            <div className="producto">
                {user.user==="Admin" &&<div className="producto__item--buttons">
                    <div>
                        <img onClick={edit} src={editar} alt="edit" />
                        <img onClick={()=>borrar(indice)} src={delet} alt="delete"/> 
                    </div>
                </div>}
                <div className="producto__item--info">
                        <h3>{producto.name}</h3>
                        <p>Cantidad: {producto.cantidad}</p>
                </div>
            </div>
            <button onClick={handleModal} className="producto__comment">COMENTAR</button>
            {showModal && (
                <div className="modal">
                    <div className="modal__content">
                        <button className="close" onClick={() => setShowModal(false)}>X</button>
                        <h2>Comentarios</h2>
                        {user.user==="Admin" && comentAdmin && comentAdmin.map((coment,index) => 
                            <div key={index} className="modal__content--coment">
                                <p>{coment}</p>
                            </div>
                        )}
                        {user.user==="Usuario" && comentUser && comentUser.map((coment,index) => 
                            <div key={index} className="modal__content--coment">
                                <p>{coment}</p>
                            </div>
                        )}
                        <label className="modal__content--add">
                            <p>Añade un comentario</p>
                            <textarea ref={commentInputRef} onChange={(e)=> text=e.target.value} placeholder="Escribe un breve comentario sobre el producto" />
                        </label>
                        <button onClick={()=>handleClick(text)}>Añadir</button>
                    </div>
                </div>
            )}
        </div>
    )
}