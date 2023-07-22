import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Styles/ShiftBtn.css';

function Buttonflip({flip, Text}) {

    const [isOn, setisOn] = useState(false);
    function toggleSwitch(){
        flip();
        setisOn(!isOn);
    }
    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
    }
    const color1 = {
        backgroundColor: "#08D9D6"
    }
    const color2 = {
        backgroundColor: "#FF2E63"
    }

    return ( 
        <div className="switch" data-isOn={isOn} onClick={toggleSwitch}>
            <motion.div style={!isOn?color1:color2} className="handle" layout transition={spring} >{Text}</motion.div>
        </div>
     );
}

export default Buttonflip;