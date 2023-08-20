import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { AppRouter } from './router/AppRouter'
import { searchDates } from './store/dates/thunks';
import { useState } from 'react';

function App() {
  const dispatch=useDispatch();
    // setInterval(() => {
    //     dispatch(searchDates())
    // }, 10000);
    dispatch(searchDates())
  return (
    <>
      <AppRouter/>
    </>
    
  )
}

export default App
