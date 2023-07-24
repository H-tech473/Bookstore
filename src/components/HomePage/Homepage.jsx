import React, { useState } from 'react';
import '../Styles/HomePage.css'
import SideMenu from './Side-Menu';
import { motion } from 'framer-motion';
import {BiChevronRight} from 'react-icons/bi';

function HomePage() {

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: () => {
          const delay = 0.1;
          return {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { delay, type: "spring", duration: 3, bounce: 0},
              opacity: { delay, duration: 0.01 }
            }
          };
        }
      };
    
    const [cont, setcont] = useState("cont")
    function fadeUp(){
      if(cont === "cont"){
        setcont("cover-container")
      }else{
        setcont("cont")
      }
    }
    const spring = {
        type: "spring",
        damping: 15
    }

    return ( 
        <div className='Homesection1'>
            <SideMenu num={2} clickfun={fadeUp}></SideMenu>
            <div className={cont}></div>
            <section className='Main-Sect'>
            <div className="welcome-name">
              <div className='welcomespan'>Welcome</div>
              <div className='namespan'>Harman Kumar</div>
            </div>
            <div className="panels">
              <motion.div whileHover={{scale: 1.02}} transition={spring} className="lib-panel">
                    <div className="heading-sp">Explore Books</div>
                    <div className="subheading-sp">Biographies, Dramas and many more</div>
                    <div className="icon-sp"><BiChevronRight></BiChevronRight></div>
                  </motion.div>
              <motion.div whileHover={{scale: 1.02}} transition={spring} className="dash-panel">
                    <div className="heading-sp">DashBoard</div>
                    <div className="subheading-sp">Check out your progress and books issued</div>
                    <div className="icon-sp"><BiChevronRight></BiChevronRight></div>
                    </motion.div>
            </div>
            <motion.svg
                className="svg-container"
                initial="hidden"
                animate="visible"
            >
                <motion.circle
                    className="cir"
                    variants={draw}
                />
                <motion.circle
                    className="cir2"
                />
                <motion.rect
                />
            </motion.svg>
                <div className="blue-curtain-container">
                  <div className="curtain1">
                  </div>
                  <div className="curtain2">

                  </div>
                </div>
            </section>
        </div> 
        );
}

export default HomePage;