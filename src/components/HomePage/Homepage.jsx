import React, { useState } from 'react';
import '../Styles/HomePage.css'
import { motion } from 'framer-motion';
import {BiChevronRight} from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Books, Dashboard } from '../../features/Users/usersSlice';


function HomePage() {
    const user = useSelector(selector=>selector.user.user)
    const dispatch = useDispatch();
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { delay: 0.1 , type: "spring", duration: 3, bounce: 0},
              opacity: { delay: 0.1 , duration: 0.01 }
            }
        }
      };
    const spring = {
        type: "spring",
        damping: 15
    }

    return ( 
        <div className='Homesection1'>
            {user.id !== -1 ? 
            <section className='Main-Sect'>
            <div className="welcome-name">
              <div className='welcomespan'>Welcome</div>
              <div className='namespan'>{user.name !== undefined? user.name: ''}</div>
            </div>
            <div className="panels">
              <motion.div whileHover={{scale: 1.02}} onClick={()=>dispatch(Books())} transition={spring} className="lib-panel">
                    <div className="heading-sp">Explore Books</div>
                    <div className="subheading-sp">Biographies, Dramas and many more</div>
                    <div className="icon-sp"><BiChevronRight></BiChevronRight></div>
                  </motion.div>
              <motion.div whileHover={{scale: 1.02}} onClick={()=>dispatch(Dashboard())} transition={spring} className="dash-panel">
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
            </section>:
            ""}
        </div> 
        );
}

export default HomePage;