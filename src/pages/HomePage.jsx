import React, { useContext, useState } from "react";
import add from "../assets/add30.png"
import Gallery from "../components/Gallery"
import "./HomePage.scss"
import { UserContext } from "../App";

export default function HomePage(){

    const user = useContext(UserContext);

    const [productos,setProductos] = useState ([
        {
            name: "Lápiz",
            cantidad: 5,
            comentariosAdmin: ["Lapiz para escribir lo que quieras"],
            comentariosUser: ["comentario de usuario"]
        },{
            name: "Cuaderno",
            cantidad: 1,
            comentariosAdmin: [],
            comentariosUser: []
        },{
            name: "Goma",
            cantidad: 2,
            comentariosAdmin: [],
            comentariosUser: []
        }
    ]);

    const addProduct = () => {
       let name = prompt("Introduce nombre de producto:");
       let cant = prompt("Introduce cantidad del producto:");
       if(name !== "" && cant!=="" && Number(cant) ){
         setProductos([...productos, {name: name, cantidad: cant, comentarios: []}]);
       }else{
        alert("Acción cancelada o valores no introducidos");
       }
    }
    const eliminar = (index) => {
        const productosCopy = [...productos];
        productosCopy.splice(index, 1);
        setProductos(productosCopy);
    }

    return (
        <div>
            <h2>Productos</h2>
            <div className="gallery">
                {productos.map((producto, index) =>
                    <Gallery key={index} producto={producto} indice={index} eliminar={eliminar}/>
                )}
                {user.user==="Admin" &&<div className="producto" onClick={addProduct}>
                    <img src={add} alt="add" className="agregar agregar-img"></img>
                </div>}
            </div>
            
        </div>
    )
}