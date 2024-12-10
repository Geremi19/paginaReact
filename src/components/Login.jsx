import React, { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import ImageProfile from '../assets/fotito.png';
import appFirebase from "../credenciales";
import Swal from 'sweetalert2';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(appFirebase);

const Login = () => {
    const [registrando, setRegistrando] = useState(false);

    const functAutentication = async (e) => {
        e.preventDefault();
        const correo = e.target.email.value;
        const contraseña = e.target.password.value;

        if (registrando) {
            try {
                await createUserWithEmailAndPassword(auth, correo, contraseña);
                Swal.fire({
                    title: "¡Registro exitoso!",
                    text: "Tu cuenta ha sido creada correctamente",
                    icon: "success",
                });
            } catch (error) {
                Swal.fire({
                    title: "Error en el registro",
                    text: "Asegúrate de que la contraseña tenga más de 8 caracteres",
                    icon: "error",
                });
            }
        } else {
            try {
                await signInWithEmailAndPassword(auth, correo, contraseña);
                Swal.fire({
                    title: "¡Inicio de sesión exitoso!",
                    text: "Has iniciado sesión correctamente",
                    icon: "success",
                });
            } catch (error) {
                Swal.fire({
                    title: "Error en inicio de sesión",
                    text: "El correo o la contraseña son incorrectos, o existen espacios en blancos.",
                    icon: "error",
                });
            }
        }
    };

    return (
        <div className="container">
            <img src={ImageProfile} alt="Profile" className="estilo-profile" />
            <form onSubmit={functAutentication}>
            <div className="label-text">Email</div>
                <div className="input-container">
                    <AiOutlineMail className="icon" />
                    <input type="text" placeholder="Ingresa tu email" className="cajatexto" id="email" />
                </div>
            <div className="label-text">Contraseña</div>
                <div className="input-container">
                    <AiOutlineLock className="icon" />
                    <input type="password" placeholder="Ingresa tu contraseña" className="cajatexto" id="password" />
                </div>
                <div className="texto">
                    {registrando ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
                    <span className="btnswitch" onClick={() => setRegistrando(!registrando)}>
                        {registrando ? "Inicia Sesión" : "Regístrate"}
                    </span>
                </div>
                <button type="submit" className="btnform">
                    {registrando ? "Regístrate" : "Inicia Sesión"}
                </button>
            </form>
        </div>
    );
};

export default Login;
