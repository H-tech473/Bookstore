import React, { useEffect } from 'react';
import { Books, Counter } from './features/Books/Books';
import './App.css';
import { useDispatch } from 'react-redux';
import { fetchAsync } from './features/Books/booksSlice';
import { fetchuAsync } from './features/Users/usersSlice';
import Login from './components/Login';
import Signup from './components/Signup';
import Buttonflip from './components/ShiftBtn';
import MainPage from './components/MainUserPage';
import SideMenu from './components/HomePage/Side-Menu';
import HomePage from './components/HomePage/Homepage';

function App() {

  const dispatch = useDispatch();

  // useEffect(()=>{
  //     dispatch(fetchAsync());
  //     dispatch(fetchuAsync(1))
  // }, [])

  return (
    <div className="App">
      <HomePage></HomePage>
    </div>
  );
}

export default App;
