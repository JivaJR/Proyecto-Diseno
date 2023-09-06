
import env from '../../../env';
import { searchingDates} from './datesSlice';


export const searchDates = () => {

    return async(dispatch) => {
        await fetch(`http://${env.FETCHIP}/recibir`)
        .then(response => response.json())
        .then(data => {
            dispatch(searchingDates(data.data[0]));
        })

    }

}
