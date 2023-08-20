import { createSlice } from '@reduxjs/toolkit';

export const datesSlice = createSlice({
    name: 'name',
    initialState: {
        id:'',
        date: '',
        time: '',
        long:'',
        lat: '',
        latlong:[],
        timehour:[]
    },
    reducers: {
        searchingDates: (state,action) =>{
            state.id=action.payload.IdEnvio;
            state.date=action.payload.Fecha.split('T')[0];
            state.time=action.payload.Hora;
            state.long=action.payload.Longitud;
            state.lat=action.payload.Latitud;
        },
        polilineDates: (state,action) => {
            state.latlong=action.payload;
        }
    }
});

export const { 

    searchingDates,polilineDates

} = datesSlice.actions;