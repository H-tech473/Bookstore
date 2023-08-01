import React, { useEffect, useState } from 'react';
import '../Styles/Side-nav.css';
import {BiChevronRight, BiChevronLeft, BiSolidUserCircle} from 'react-icons/bi';
import {BsFillInfoCircleFill} from 'react-icons/bs';
import {AiFillHome} from 'react-icons/ai';
import {motion} from 'framer-motion';

function SideMenu({num, backcolor, setleft}) {

    const [onTapp, setonTap] = useState(true);
    const spring = {
        type: "spring",
        damping: 15
    }
    
    const [cont, setcont] = useState("cont")
    function fadeUp(){
      if(cont === "cont"){
        setcont("cover-container")
      }else{
        setcont("cont")
      }
    }

    const [numb, setnumb] = useState(num);
    useEffect(()=>{
        setnumb(num)
    },[num])

    return ( 
            <div className="side-nav-container" style={!onTapp? {paddingLeft: "75px"}: {}}>
                <motion.span
                    className="btn"
                    layout
                    transition={spring}
                >
                    <motion.span 
                        whileTap={{opacity: 0.4}}
                        whileHover={{scale: 1.2}}
                        onClick={()=>{
                            setonTap(!onTapp);
                            fadeUp();
                        }}
                        transition={{
                            type: "linear"
                        }}
                    >{onTapp? <BiChevronRight></BiChevronRight> : <BiChevronLeft></BiChevronLeft>}</motion.span>
                    <nav aria-label='primary-navigation' className='list-of-sections'>
                        <motion.div 
                            whileHover={{x: "50%"}} 
                            onClick={()=>{
                                setleft(1)
                                setnumb(1)
                                }} 
                            transition={spring} 
                            className={numb===1?'sects sect-1 selected-sect': 'sects sect-1'}>
                            <motion.span whileHover={{x: "-220%"}} transition={spring} className="sect-icon"><BsFillInfoCircleFill></BsFillInfoCircleFill><span className='sectspan'>About</span></motion.span>
                        </motion.div>
                        <motion.div whileHover={{x: "50%"}} onClick={()=>{setleft(2); setnumb(2)}} transition={spring} className={numb===2?'sects sect-2 selected-sect': 'sects sect-2'}>
                            <motion.span whileHover={{x: "-220%"}} transition={spring} className="sect-icon"><AiFillHome></AiFillHome><span className='sectspan'>Home</span></motion.span>
                        </motion.div>
                        <motion.div whileHover={{x: "50%"}} onClick={()=>{setleft(3); setnumb(3)}} transition={spring} className={numb===3?'sects sect-3 selected-sect': 'sects sect-3'}>
                            <motion.span whileHover={{x: "-220%"}} transition={spring} className="sect-icon"><BiSolidUserCircle></BiSolidUserCircle><span className='sectspan'>Contact</span></motion.span>
                        </motion.div>
                    </nav>
                </motion.span>
                <div className={cont} style={{backgroundColor: backcolor}}></div>
            </div>
     );
}

export default SideMenu;