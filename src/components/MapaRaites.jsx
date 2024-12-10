import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, StreetViewPanorama } from '@react-google-maps/api';

// Estilos personalizados para el mapa
const containerStyle = {
    width: '100%',
    height: '400px'
};

const MapaRaites = ({ oriLat, oriLng, desLat, desLng }) => {
    const [directionsResponse, setDirectionsResponse] = useState(null);

    useEffect(() => {
        const fetchDirections = async () => {
            if (oriLat && oriLng && desLat && desLng) {
                const directionsService = new window.google.maps.DirectionsService();
                const result = await directionsService.route({
                    origin: { lat: oriLat, lng: oriLng },
                    destination: { lat: desLat, lng: desLng },
                    travelMode: window.google.maps.TravelMode.DRIVING,
                });
                setDirectionsResponse(result);
            }
        };

        fetchDirections();
    }, [oriLat, oriLng, desLat, desLng]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyBGEINzWzOYMKjHG0Sp0oaRzVf0WInRAas">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: oriLat, lng: oriLng }} // Punto inicial del mapa
                zoom={14}
            >
                {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                )}
            </GoogleMap>

            <StreetViewPanorama
                position={{ lat: oriLat, lng: oriLng }}
                visible={true}
                pov={{ heading: 100, pitch: 0 }}
            />
        </LoadScript>
    );
};

export default MapaRaites;
