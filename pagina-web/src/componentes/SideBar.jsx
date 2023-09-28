import { useState } from 'react'
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { Box,Button,Typography } from "@mui/material"
import { useDispatch } from 'react-redux';
import { searchDatesPoliline } from '../store/dates/thunks';
    
export const SideBar = () => {
    const today = new Date;
    const newmin = new Date("2023-07-01")
    const [hinicial, sethinicial] = useState('00:00:00')
    const [hfinal, sethfinal] = useState('23:59:59')
    
    const dispatch = useDispatch();

    const [maxdatefi, setmaxdatefi] = useState(today);
    const [mindateff, setmindateff] = useState(today); //aqui newmin

    const [finalDate, setfinalDate] = useState(today)
    const [initialDate, setinitialDate] = useState(today); //aqui newmin

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
        final = final.split('/').reverse().join('-');
        inicial = inicial.split('/').reverse().join('-');
        var inicialcompleto= inicial+'T'+hinicial;
        var finalcompleto = final+'T'+hfinal
        console.log('fecha inicial: ',inicialcompleto)
        console.log('fecha Final: ',finalcompleto)
        dispatch(searchDatesPoliline(inicialcompleto,finalcompleto))
    } 
    
    return (
        <Box>
            <Box
            className='calendario'
            >
                <Typography variant='h6' marginBottom={'10px'}> Fecha de inicio</Typography>
                <strong>Hora inicial por defecto: 00:00:00</strong>
                {/*ESte es el de inicio*/}
                <Calendar margin='auto'onChange={newmindate} value={initialDate} maxDate={maxdatefi} minDate={newmin}/>
                <form className='time-selector'>
                    <input
                        type="time"
                        step="1"
                        className="form-control"
                        placeholder="Time"
                        onChange={(ev) =>{sethinicial(ev.target.value)}}
                    />
                    <input type="time" />
                </form>
                <Typography variant='h6' marginBottom={'10px'} marginTop={'10px'}>Fecha final</Typography>
                <strong>Hora final por defecto: 23:59:59</strong>
                <Calendar onChange={newmaxdate} value={finalDate} maxDate={today} minDate={mindateff}/>
                <form className='time-selector'>
                    <input
                        type="time"
                        step="1"
                        className="form-control"
                        placeholder="Time"
                        onChange={(ev) =>{sethfinal(ev.target.value)}}
                    />
                </form>
                <Button 
                    variant="contained"
                    sx={{marginTop:'10px'}}
                    onClick={buscarfecha}
                >
                    Buscar
                </Button>
            </Box>
        </Box>
        
    )
}