import React, { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { fetchAsync } from './features/Books/booksSlice';
import { fetchuAsync } from './features/Users/usersSlice';
import MainPage from './components/MainUserPage';
import Home from './components/Home';
import {Books} from './components/Books/Books'

function App() {

  const dispatch = useDispatch();

  // useEffect(()=>{
  //     dispatch(fetchAsync());
  //     dispatch(fetchuAsync(1))
  // }, [])

  return (
    <div className="App">
      <Books></Books>
    </div>
  );
}

export default App;
