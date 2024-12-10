// Perfil.js
import React, { useState, useEffect } from "react";
import appFirebase from "../credenciales";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import '../styles/Perfil.css'; // Asegúrate de crear este archivo para los estilos

const Perfil = ({ correoUsuario }) => {
    const [userData, setUserData] = useState(null);
    const auth = getAuth(appFirebase);
    const db = getFirestore(appFirebase);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDoc = doc(db, "users", user.uid);
                    const docSnapshot = await getDoc(userDoc);
                    if (docSnapshot.exists()) {
                        setUserData(docSnapshot.data());
                    }
                }
            } catch (error) {
                Swal.fire({
                    title:"Error fetching user data: ",
                    icon:"Error",
                });
            }
        };

        fetchUserData();
    }, [auth, db]);

    return (
        <div className="perfil-container">
            <div className="perfil-card">
                <div className="perfil-header">
                    <h2>Bienvenido</h2>
                    <p className="perfil-email">{correoUsuario}</p>
                </div>
                <div className="perfil-body">
                    {userData ? (
                        <>
                            <img src={userData.photo} alt="User" className="perfil-photo" />
                            <div className="perfil-details">
                                <p className="perfil-school">{userData.school}</p>
                                <p className="perfil-username">{userData.username}</p>
                            </div>
                        </>
                    ) : (
                        <p className="loading-text">Cargando datos del usuario...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Perfil;
