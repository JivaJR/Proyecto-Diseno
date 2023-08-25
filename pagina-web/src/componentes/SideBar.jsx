import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box,Typography } from "@mui/material"
import { useDispatch } from 'react-redux';
import { searchDatesPoliline } from '../store/dates/thunks';


export const SideBar = ({drawerWidth = 270}) => {
    const today = new Date;
    const newmin = new Date("2023-07-01")
    
    const dispatch = useDispatch();

    const [maxdatefi, setmaxdatefi] = useState(today);
    const [mindateff, setmindateff] = useState(newmin);

    const [finalDate, setfinalDate] = useState(today)
    const [initialDate, setinitialDate] = useState(newmin);

    const newmaxdate = (data) => {
        setfinalDate(data) 
        setmaxdatefi(data)
    }

    const newmindate = (data) => {
        setinitialDate(data)
        setmindateff(data)
    }
    
    
    const buscarfecha = () =>{
        var final = finalDate.toLocaleDateString();
        var inicial = initialDate.toLocaleDateString();
        var final = final.split('/').reverse().join('-');
        var inicial = inicial.split('/').reverse().join('-');
        dispatch(searchDatesPoliline(inicial,final))
    } 
    
    return (
        <Box>
            <Box
            className='calendario'
            >
                <Typography variant='h6' marginBottom={'10px'}> Fecha de inicio</Typography>
                <Calendar margin='auto'onChange={newmindate} value={initialDate} maxDate={maxdatefi} minDate={newmin}/>
                <Typography variant='h6' marginBottom={'10px'} marginTop={'10px'}>Fecha final</Typography>
                <Calendar onChange={newmaxdate} value={finalDate} maxDate={today} minDate={mindateff}/>
                <button onClick={buscarfecha}>Buscar</button>
            </Box>
        </Box>
        
    )
}
