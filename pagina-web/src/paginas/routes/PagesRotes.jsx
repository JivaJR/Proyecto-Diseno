import React from 'react'
import { Home } from '../Home'
import { Consultas2 } from '../Consultas2'
import { Navigate, Route,Routes } from 'react-router-dom'
import { NavBar } from '../../ui/NavBar'
import { useSelector } from 'react-redux'
import { Cargando } from '../../componentes/Cargando'

export const PagesRotes = () => {
    var {id} = useSelector(state => state.dates)
    if (id=="") return (<Cargando/>)
    return (
    
        <>
            <NavBar/>
            <br/>
            <Routes>
                    <Route path="consultas" element={<Consultas2 />} />
                    <Route path="home" element={<Home />} />
                                    
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path='/*' element={<Navigate to='/'/>}/>
            </Routes>
        </>
    )
}
