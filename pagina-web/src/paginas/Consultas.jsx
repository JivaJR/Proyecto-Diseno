import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchDatesPoliline } from '../store/dates/thunks';
import { SideBar } from '../componentes/SideBar';
import { ConsultasMap } from '../componentes/mapa/ConsultasMap';
import { Box } from '@mui/material';
import { ReactMap } from '../componentes/mapa/ReactMap';
import { ReactMapConsulta } from '../componentes/mapa/ReactMapConsulta';
const drawerWidth = '30%';

export const Consultas = () => {

    const Datos = {
        lat:11.018055555556,
        long:-74.851111111111,
        id: 0
    }
    const {latlong} = useSelector(state => state.dates)
    const [polyline, setpolyline] = useState([])

    useEffect(() => {
        console.log("cambio el vector")
        setpolyline(latlong.data)
    }, [latlong.data])
    
    return (
        <Box display='flex' marginTop='60px'>
            <SideBar drawerWidth={drawerWidth}/>
            {/* <ConsultasMap drawerWidth={'70%'}/> */}
            <ReactMapConsulta polyline={polyline} drawerWidth={'70%'} {...Datos}/>
        </Box>
        
    )
}
