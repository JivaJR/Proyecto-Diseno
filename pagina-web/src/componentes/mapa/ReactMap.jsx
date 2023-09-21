import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../css/react-leaflet.css';
import {CircleIcon, FlagIcon, MarkerIcon, StartIcon} from './react-leaflet-icon.js';
import { Box, IconButton } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';

export const ReactMap = ({id,polireal}) => {

    var polyline=[]
    polireal.map(datos =>{
        var latlong=[datos.Latitud,datos.Longitud];
        polyline.push(latlong)
    })
    var latlon=polyline[0]
    var lat=latlon[0].toString();
    var long=latlon[1].toString();

    var latlonf=polyline[polyline.length-1]
    var latf=latlonf[0].toString();
    var longf=latlonf[1].toString();
        
    const [center, setcenter] = useState([lat,long]);
    const [mfinal, setmfinal] = useState([0,0])

    useEffect(() => {
        setcenter([lat,long])
        setmfinal([latf,longf])
    }, [id])
    
    const mapRef = useRef(null);
    const centerMap = () => { 
        if (mapRef.current) {
            mapRef.current.setView(center); 
        }
    };

    const limeOptions = { color: 'red'}
    
    return (
        <Box>
            <MapContainer center={center} zoom={12} ref={mapRef}>
                <Polyline pathOptions={limeOptions} positions={polyline} />
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={center} icon={MarkerIcon} className="marcador">
                    <Popup><pre>{"Latitude: "+ center[0]+ " ,Longitude: "+ center[1]}</pre></Popup>
                </Marker>
                {
                    polireal.map(punto =>(
                        <Marker key={punto.IdEnvio} position={[punto.Latitud.toString(),punto.Longitud.toString()]} icon={CircleIcon}>
                            <Popup><pre>{"Hora: " + punto.Hora}</pre></Popup>
                        </Marker>
                    ))
                }
                <Marker position={mfinal} icon={MarkerIcon} >
                    <Popup><pre>{"Latitude: "+ center[0]+ " ,Longitude: "+ center[1]}</pre></Popup>
                </Marker>
            </MapContainer> 
            <IconButton
                onClick={centerMap}
                size="small"
                sx={{
                    border:'solid',
                    color:"gray",
                    zIndex:100,
                    backgroundColor:'whithe',
                    ':hover': {backgroundColor:'green',opacity:0.7},
                    position:'absolute',
                    right:'10vw',
                    bottom:'-15vh'
                    }}
            >
                <MyLocationIcon sx={{fontSize:20}}/>
            </IconButton>
        </Box>
    )
}

