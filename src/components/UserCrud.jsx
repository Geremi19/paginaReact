// UserCrud.jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import appFirebase from "../credenciales";
import '../styles/UserCrud.css'; // Asegúrate de que este archivo incluya los estilos nuevos

const UserCrud = () => {
    const [users, setUsers] = useState([]);
    const db = getFirestore(appFirebase);

    // Fetch users from Firestore
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const usersData = usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching users: ", error.message);
            }
        };
        fetchUsers();
    }, []);

    // Delete user function
    const handleDeleteUser = async (userId) => {
        try {
            await deleteDoc(doc(db, 'users', userId));
            setUsers(users.filter(user => user.id !== userId)); // Update local state
        } catch (error) {
            console.error("Error deleting user: ", error.message);
        }
    };

    return (
        <div className="user-crud-container">
            <h2 className="users-h2">Usuarios</h2>
            <div className="users-table-responsive">
                <div className="users-scroll-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th className="users-th">Nombre</th>
                                <th className="users-th">Correo</th>
                                <th className="users-th">Teléfono</th>
                                <th className="users-th">Escuela</th>
                                <th className="users-th">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="users-tbody">
                        {users.map((user) => ( // Mostramos todos los usuarios
                                <tr key={user.id} className="users-tr">
                                    <td className="users-td">{user.username}</td>
                                    <td className="users-td">{user.email}</td>
                                    <td className="users-td">{user.phone}</td>
                                    <td className="users-td">{user.school}</td>
                                    <td className="users-td">
                                        <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserCrud;
