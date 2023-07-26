import React from 'react';
import {FiLogOut} from 'react-icons/fi';
import { motion } from 'framer-motion';
import './Styles/Logout.css';

function Logoutbtn() {
  const spring = {
      type: "spring",
      damping: 15
  }
    return ( 
        <motion.div whileHover={{scale: 1.2}} transition={spring} className="logoutbtn">
          <FiLogOut></FiLogOut>
        </motion.div>
     );
}

export default Logoutbtn;