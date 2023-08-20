import React from 'react'
import { CircularProgress, Grid } from '@mui/material'
import { useDispatch } from 'react-redux';
import { searchDates } from '../store/dates/thunks';

export const Cargando = () => {
    const dispatch=useDispatch();
    setInterval(() => {
        dispatch(searchDates())
    }, 1000);
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems='center'
            justifyContent='center'
            sx={{minHeight:'100vh',minWidth:'100vh',backgroundColor:'blue',padding:4}}
        >
            <Grid container
                alignContent='center' justifyContent= 'center'>
                <CircularProgress color='warning'/>
            </Grid>
        </Grid>
    )
}


