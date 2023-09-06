
import { searchingDates} from './datesSlice';


export const searchDates = () => {

    return async(dispatch) => {
        await fetch('http://34.227.100.66:8050/recibir')
        .then(response => response.json())
        .then(data => {
            dispatch(searchingDates(data.data[0]));
        })

    }

}
