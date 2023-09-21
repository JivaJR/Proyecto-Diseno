import { useDispatch} from 'react-redux';
import { AppTheme } from './theme/AppTheme';
import { AppRouter } from './router/AppRouter'
import { searchDates } from './store/dates/thunks';
import './App.css'
import 'react-calendar/dist/Calendar.css';

function App() {

  const dispatch=useDispatch();
  dispatch(searchDates())

  return (
    <AppTheme>
      <AppRouter/>
    </AppTheme>
  )
}

export default App
