import React, { useEffect, useState } from 'react'
import {useSelector } from 'react-redux'
import { SideBar } from '../componentes/SideBar';
import { Box } from '@mui/material';
import { ReactMapConsulta } from '../componentes/mapa/ReactMapConsulta';

export const Consultas = () => {
    const drawerWidth = '30%';
    const Datos = {
        lat:11.018055555556,
        long:-74.851111111111,
        id: 0
    }
    const {latlong} = useSelector(state => state.dates)
    const [polyline, setpolyline] = useState([])

    useEffect(() => {
        setpolyline(latlong.data)
    }, [latlong.data])
    
    return (
        <Box display='flex' marginTop='43px'>
            <SideBar drawerWidth={drawerWidth}/>
            <ReactMapConsulta polyline={polyline} drawerWidth={drawerWidth} {...Datos}/>
        </Box>
        
    )
}
