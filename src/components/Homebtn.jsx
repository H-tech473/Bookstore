import React from 'react';
import {FiLogOut} from 'react-icons/fi';
import { motion } from 'framer-motion';
import './Styles/Logout.css';
import {AiFillHome} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Homeredirect } from '../features/Users/usersSlice';

function Homebtn() {
  const dispatch = useDispatch();
  const spring = {
      type: "spring",
      damping: 15
  }
    return ( 
        <motion.div whileHover={{scale: 1.2}} onClick={()=>dispatch(Homeredirect())} transition={spring} className="homebtn">
          <AiFillHome></AiFillHome>
        </motion.div>
     );
}

export default Homebtn;