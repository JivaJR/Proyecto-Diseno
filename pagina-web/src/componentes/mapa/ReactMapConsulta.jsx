import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../css/react-leaflet.css';
import {CircleIcon, FlagIcon, TaxiIcon} from './react-leaflet-icon.js';
import { useSelector } from 'react-redux';
import { Box, IconButton, Slider } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const FinalMarker = ({pos}) =>{
    if(pos[0]!=0){
        return(
            <Marker position={pos} icon={FlagIcon} >
                <Popup><pre>final <a href="https://www.freepik.es/icono/bandera_559219#fromView=search&term=flag&page=1&position=34">Icon by Prosymbols</a></pre></Popup>
            </Marker>
        )
    }
    return(null)
}

export const ReactMapConsulta = ({lat,long,polyline=[],sliderValue=0}) => {

    const {datosconsulta} = useSelector(state => state.dates)
    var latlon,condf,latlon2,latf,longf;
    
    if(polyline.length != 0) {
        latlon=polyline[0]
        lat=latlon[0].toString();
        long=latlon[1].toString();

        condf=polyline.length-1;
        latlon2=polyline[condf]
        latf=latlon2[0].toString();
        longf=latlon2[1].toString();
    } else {
        lat=lat.toString();
        long=long.toString();
        latf=0;
        longf=0;
    }
    const [center, setcenter] = useState([lat,long]);
    const [mfinal, setmfinal] = useState([0,0])

    useEffect(() => { 
        setcenter([lat,long])
        setmfinal([latf,longf])
    }, [polyline.length])
    
    function ChangeView({ center}) {
        const map = useMap();
        map.setView(center);
        return null;
    }
    const limeOptions = { color: 'lime' }
    
    const mapconsulta = useRef(null)
    const centrarMapa = () => {
        if(mapconsulta.current){
            mapconsulta.current.setView(center)
        }
    }

    return (
        <Box>
            <MapContainer center={center} zoom={4} ref={mapconsulta}>
                <ChangeView center={center} />
                <Polyline pathOptions={limeOptions} positions={polyline} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={center} icon={TaxiIcon} >
                    <Popup><pre>inicio</pre></Popup>
                </Marker>
                {
                    datosconsulta.map(punto =>(
                        <Marker key={punto.IdEnvio} position={[punto.Latitud.toString(),punto.Longitud.toString()]} icon={CircleIcon}>
                            <Popup><pre>{"Fecha: "+ punto.Fecha.split('T')[0] +" Hora: " + punto.Hora+" id: "+punto.IdEnvio}</pre></Popup>
                        </Marker>
                    ))
                }
                <FinalMarker pos={mfinal}/>
                {
                    datosconsulta[sliderValue]
                    ? <div>
                        <Popup position={[datosconsulta[sliderValue].Latitud.toString(),datosconsulta[sliderValue].Longitud.toString()]} onClose={true}>
                            <pre>
                                {"Fecha: "+ datosconsulta[sliderValue].Fecha.split('T')[0] +" Hora: " + datosconsulta[sliderValue].Hora}
                            </pre>
                        </Popup>
                        <ChangeView center={[datosconsulta[sliderValue].Latitud.toString(),datosconsulta[sliderValue].Longitud.toString()]} />
                    </div>
                    :null
                }
                
            </MapContainer>
            <IconButton
                onClick={centrarMapa}
                sx={{position:'absolute',bottom:10,right:60,border:'solid blue',color:'red'}}
            >
                <MyLocationIcon/>
            </IconButton>
        </Box>
        
    )
}

