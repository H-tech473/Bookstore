import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsync,fetgenreAsync } from './features/Books/booksSlice';
import { fetchuAsync } from './features/Users/usersSlice';
import { fetchsync, updatePatch} from './features/Admin/adminsSlice';
import MainPage from './components/MainUserPage';
import Home from './components/Home';
import Books from './components/Books/Books'
import Users from './components/UserDashboard/Users'
import Admin from './components/Admin/admin';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAsync());
    dispatch(fetgenreAsync())
  },[])
  const user = useSelector(selector => selector.user)
  const [sta, setsta] = useState(1);
  useEffect(()=>{
    setsta(user.page)
  },[user.page])

  function SetPage(){
    switch (sta){
      case 1:
        return <MainPage />
      case 2:
        return <Home />
      case 3:
        return <Books />
      case 4:
        return <Users />
      case 5:
        return <Admin />
      default:
        return <></>
    }
  }

  return (
    <div className="App">
      {SetPage()}
    </div>
  );
}

export default App;
