// Home.jsx
import React from "react"; 
import appFirebase from "../credenciales";
import { getAuth } from "firebase/auth";
import Raites from "./Raites";
import Perfil from "./Perfil";
import Menu from "./Menu"; // Importamos el menú lateral
import '../styles/Home.css'; // Para los estilos de la página principal
import UserCrud from "./UserCrud";

const auth = getAuth(appFirebase);

const Home = ({ correoUsuario }) => {
    return (
        <div className="home-container">
            {/* Menú lateral fijo */}
            <Menu />
            {/* Contenido principal */}
            <div className="content">
                {/* Perfil del usuario */}
                <Perfil correoUsuario={correoUsuario} />

                {/* Contenedor flexible para los componentes Raites y UserCrud */}
                <div className="flex-container">
                    {/* Componente Raites */}
                    <div className="raites-container">
                        <Raites />
                    </div>
                    {/* Componente UserCrud */}
                    <div className="crud-container">
                        <UserCrud />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
