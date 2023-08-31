import { useDispatch} from 'react-redux';
import './App.css'
import { AppRouter } from './router/AppRouter'
import { searchDates } from './store/dates/thunks';

function App() {

  const dispatch=useDispatch();
  dispatch(searchDates())

  return (
    <>
      <AppRouter/>
    </>
    
  )
}

export default App
