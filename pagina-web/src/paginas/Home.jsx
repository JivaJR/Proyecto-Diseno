import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactMap } from '../componentes/mapa/ReactMap'
import {searchDates} from '../store/dates/thunks'
import { TableCoors } from '../componentes/TableCoors'

export const Home = () => {

    const Datos = useSelector(state => state.dates)
    const center = [Datos.lat,Datos.long]
    const dispatch=useDispatch();

    setInterval(() => {
        dispatch(searchDates())
    }, 1000);

    return (
        <>
            <TableCoors {...Datos}/>
            {/* <MapView/> */}
            <ReactMap drawerWidth={'100%'} {...Datos} center={center}/>
        </>
    )
}
