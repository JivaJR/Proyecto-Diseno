
import { polilineDates, searchingDates} from './datesSlice';


export const searchDates = () => {

    return async(dispatch) => {
        await fetch('http://localhost:8080/recibir')
        .then(response => response.json())
        .then(data => {
            dispatch(searchingDates(data.data[0]));
        })

    }

}

export const searchDatesPoliline = (inicial,final) => {

    return async(dispatch) => {
        await fetch(`http://localhost:8080/consultas?inicial=${inicial}&final=${final}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            dispatch(polilineDates(data));
        })
    }

}
