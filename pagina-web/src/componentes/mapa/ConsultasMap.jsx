import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../css/react-leaflet.css';
import {MarkerIcon} from './react-leaflet-icon.js';
import { useSelector } from 'react-redux';
import { useMapEvents } from 'react-leaflet/hooks'
import { Box } from '@mui/material';

export const ConsultasMap = ({drawerWidth='70%'}) => {


    // useEffect(() => {
    //     setcenter([﻿11.018055555556, -74.851111111111.])
    // }, [])
    const center= [11.018055555556, -74.851111111111];
    
    // function ChangeView({ center, zoom }) {
    //     const map = useMap();
    //     map.setView(center, zoom);
    //     return null;
    // }
    

    return (
        <Box
            sx={{ width:{sm:drawerWidth},flexShrink:{sm:0} }}
        >
            <MapContainer  center={center} zoom={4}>
            {/* <ChangeView center={center} zoom={16} />  */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center} icon={MarkerIcon} >
                <Popup><pre>{"Latitude: "+ center[0]+ " ,Longitude: "+ center[1]}</pre></Popup>
            </Marker>
        </MapContainer>
        </Box>
        
    )
}

