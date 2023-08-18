import React from 'react';
import {FiLogOut} from 'react-icons/fi';
import { motion } from 'framer-motion';
import './Styles/Logout.css';
import { useDispatch } from 'react-redux';
import { Logout } from '../features/Users/usersSlice';
import { Logoutad } from '../features/Admin/adminsSlice';

function Logoutbtn() {
  const dispatch = useDispatch();
  const spring = {
      type: "spring",
      damping: 15
  }
    return ( 
        <motion.div whileHover={{scale: 1.2}} onClick={()=> {
          dispatch(Logout())
          dispatch(Logoutad())
        }} transition={spring} className="logoutbtn">
          <FiLogOut></FiLogOut>
        </motion.div>
     );
}

export default Logoutbtn;