
import "./App.scss";
import HomePage from "./pages/HomePage";
import React, { useState } from "react";

export const UserContext = React.createContext("Admin");

function App() {
  const [user,setUser] = useState("Admin");
  
  const changeUser = () => {
    if( user === "Usuario"){
      setUser("Admin");
    } else {
      setUser("Usuario");
    }
  }
  return (
    <div className="App">
      <UserContext.Provider value={{user,setUser}}>
 
        <header className={"App-header " + (user.user === "Usuario" ? "App-header blue" : "App-header black")}>
 
          <div className="App-header__user">
            <p>{user}</p>
            <button onClick={changeUser}>CAMBIAR DE USUARIO</button>
          </div>
          <HomePage />

        </header>
      </UserContext.Provider>
    </div>
  );
}

export default App;
