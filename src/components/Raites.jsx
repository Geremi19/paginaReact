// Raites.jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import appFirebase from "../credenciales";
import '../styles/Raites.css';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';


const Raites = () => {
    const [raites, setRaites] = useState([]);
    const [selectedCampus, setSelectedCampus] = useState('Campus el Naranjo');
    const [selectedRaite, setSelectedRaite] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    
    const db = getFirestore(appFirebase);

    useEffect(() => {
        const fetchRaites = async () => {
            try {
                const q = query(collection(db, 'publications'), where('campusDestination', '==', selectedCampus));
                const querySnapshot = await getDocs(q);
                
                const raitesData = await Promise.all(querySnapshot.docs.map(async (doc) => {
                    const raiteData = { id: doc.id, ...doc.data() };

                    // Buscar el username basado en el IdCreator
                    const userQuery = query(collection(db, 'users'), where('Id', '==', raiteData.IdCreator));
                    const userSnapshot = await getDocs(userQuery);

                    if (!userSnapshot.empty) {
                        const userDoc = userSnapshot.docs[0]; // Obtener el primer documento
                        raiteData.IdCreator = userDoc.data().username; // Reemplazar el IdCreator por el username
                    } else {
                        raiteData.IdCreator = 'Usuario desconocido'; // En caso de que no se encuentre el usuario
                    }

                    return raiteData;
                }));

                setRaites(raitesData);
            } catch (error) {
                Swal.fire({
                    title:"Error fetching raites",
                    text:"Asegurate de que esten disponibles los raites o existan lugares disponibles",
                    icon:"error",
                });
                //console.error("Error fetching raites: ", error.message);
            }
        };

        fetchRaites();
    }, [selectedCampus]);

    // Fetch directions when selected raite changes
    useEffect(() => {
        const fetchDirections = async () => {
            if (selectedRaite) {
                const { OriLat, OriLng, DesLat, DesLng } = selectedRaite;
                const directionsService = new window.google.maps.DirectionsService();
                const result = await directionsService.route({
                    origin: { lat: OriLat, lng: OriLng },
                    destination: { lat: DesLat, lng: DesLng },
                    travelMode: window.google.maps.TravelMode.DRIVING,
                });
                if (result.status === 'OK') {
                    setDirectionsResponse(result);
                } else {
                    console.error('Error fetching directions:', result);
                }
            }
        };
        fetchDirections();
    }, [selectedRaite]);

    // Handle raite click
    const handleRaiteClick = (raite) => {
        setSelectedRaite(raite);
    };

    return (
        <div className="raites-container">
            <h1 className="raites-h1">Raites Disponibles</h1>
            <select 
                id="campusSelect" 
                value={selectedCampus} 
                onChange={(e) => setSelectedCampus(e.target.value)}
            >
                <option value="Campus el Naranjo">Campus el Naranjo</option>
                <option value="Campus Barrio 3">Campus Barrio 3</option>
                <option value="Campus San Pedrito">Campus San Pedrito</option>
            </select>

            {/* Tabla de raites */}
            <div className="raites-table-responsive">
                <table className="raites-table">
                    <thead>
                        <tr>
                            <th className="raites-th">Creador</th>
                            <th className="raites-th">Destino</th>
                            <th className="raites-th">Hora</th>
                            <th className="raites-th">Asientos</th>
                            <th className="raites-th">Sale de</th>
                        </tr>
                    </thead>
                    <tbody className="raites-tbody">
                        {raites.map((raite) => (
                            <tr 
                                key={raite.id} 
                                className="raites-tr"
                                onClick={() => handleRaiteClick(raite)}
                            >
                                <td className="raites-td">{raite.IdCreator}</td>
                                <td className="raites-td">{raite.campusDestination}</td>
                                <td className="raites-td">{raite.timePublication}</td>
                                <td className="raites-td">{raite.travelSeating}</td>
                                <td className="raites-td">{raite.direccionPartida}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mapa con la ruta debajo de la tabla */}
            {selectedRaite && (
                <div className="map-container">
                    <LoadScript googleMapsApiKey="AIzaSyBGEINzWzOYMKjHG0Sp0oaRzVf0WInRAas">
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            center={{ lat: selectedRaite.OriLat, lng: selectedRaite.OriLng }}
                            zoom={10}
                        >
                            {directionsResponse && (
                                <DirectionsRenderer
                                    options={{ directions: directionsResponse }}
                                />
                            )}
                        </GoogleMap>
                    </LoadScript>
                </div>
            )}
        </div>
    );    
};

export default Raites;
