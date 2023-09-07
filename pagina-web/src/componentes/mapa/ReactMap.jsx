import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../css/react-leaflet.css';
import {MarkerIcon} from './react-leaflet-icon.js';
import { useSelector } from 'react-redux';
import { useMapEvents } from 'react-leaflet/hooks'

export const ReactMap = ({lat,long,id}) => {
    lat=lat.toString();
    long=long.toString();

    const [center, setcenter] = useState([lat,long]);

    useEffect(() => {
        setcenter([lat,long])
    }, [id])
    
    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }
    

    return (
        <MapContainer center={center} zoom={4}>
            <ChangeView center={center} zoom={16} /> 
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center} icon={MarkerIcon} >
                <Popup><pre>{"Latitude: "+ center[0]+ " ,Longitude: "+ center[1]}</pre></Popup>
            </Marker>
        </MapContainer>
    )
}

