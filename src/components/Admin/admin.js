import React, { useEffect } from 'react';
import Logoutbtn from '../Logoutbtn';
import Homebtn from '../Homebtn';
import { useDispatch, useSelector } from 'react-redux';
import '../Styles/Admin.css'
import DataShown from './Data';
import { fetchaAsync, fetchsync } from '../../features/Admin/adminsSlice';

function Admin() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchsync())
    },[])

    return ( 
        <div>
            <div className='AdminDashboard'>
                <Logoutbtn></Logoutbtn>
                <Homebtn></Homebtn>
                <DataShown></DataShown>
            </div>
        </div>
     );
}

export default Admin;