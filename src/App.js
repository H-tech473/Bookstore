import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsync,fetgenreAsync } from './features/Books/booksSlice';
import { fetchuAsync } from './features/Users/usersSlice';
import MainPage from './components/MainUserPage';
import Home from './components/Home';
import Books from './components/Books/Books'

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(fetchAsync());
      dispatch(fetgenreAsync())
  }, [])

  return (
    <div className="App">
      <Books></Books>
    </div>
  );
}

export default App;
