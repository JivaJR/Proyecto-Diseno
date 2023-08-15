
import { searchingDates} from './datesSlice';


export const searchDates = () => {

    return async(dispatch) => {
        await fetch('http://localhost:8080/recibir')
        .then(response => response.json())
        .then(data => {
            dispatch(searchingDates(data.data[0]));
        })

    }

}
