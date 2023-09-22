import { CircularProgress, CssBaseline, Grid } from '@mui/material'
import { useDispatch } from 'react-redux';
import { searchDates } from '../store/dates/thunks';

export const Cargando = () => {
    const dispatch=useDispatch();
    setInterval(() => {
        dispatch(searchDates())
    }, 1000);
    return (
        <>
            <CssBaseline />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems='center'
                justifyContent='center'
                
                sx={{minHeight:'100vh',minWidth:'100vh',backgroundColor:'#feeb00',padding:4}}
            >
                
                <Grid container
                    alignContent='center' justifyContent= 'center'>
                    <CircularProgress color='error'/>
                </Grid>
            </Grid>
        </>
        
    )
}


