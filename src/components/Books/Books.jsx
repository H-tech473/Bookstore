import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {motion, useAnimation, useInView} from 'framer-motion';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from '../../features/Books/booksSlice';
import '../Styles/Back.css';
import Searchbar from './Searchbar';

export function Books() {
  const [hove, sethove] = useState(false);
  const spring = {
    type: "spring",
    damping: 15
}
const ref = useRef(null);
const isInView = useInView(ref, { once: true});
const maincontroller = useAnimation();
useEffect(()=>{
  if(isInView){maincontroller.start("visible")}
}, [isInView])

  return (
    <div className='books'>
      <Searchbar hove={hove}></Searchbar>
      <div className="books-result-container" onMouseDown={()=>sethove(true)} onMouseUp={()=>sethove(false)}>
        <div className="box-1 bookcont">
          <div className="books-cont"></div>
          <div className="books-name">hello Hi</div>
        </div>
        <motion.div className='box-2 bookcont' variants={{
          hidden: {opacity: 0, y: 30},
          visible: {opacity: 1, y: 0}
        }}
        ref={ref}
          initial="hidden"
          animate={maincontroller}
          transition={{duration: .5, delay: .25}}
        ></motion.div>
        <motion.div className='box-2 bookcont' variants={{
          hidden: {opacity: 0, y: 30},
          visible: {opacity: 1, y: 0}
        }}
        ref={ref}
        initial="hidden"
          animate={maincontroller}
          transition={{duration: .5, delay: .25}}
        ></motion.div>
        <motion.div className='box-2 bookcont' variants={{
          hidden: {opacity: 0, y: 30},
          visible: {opacity: 1, y: 0}
        }}
        initial="hidden"
        ref={ref}
          animate={maincontroller}
          transition={{duration: .5, delay: .25}}
        ></motion.div>
        <motion.div className='box-2 bookcont' variants={{
          hidden: {opacity: 0, y: 30},
          visible: {opacity: 1, y: 0}
        }}
        ref={ref}
        initial="hidden"
          animate={maincontroller}
          transition={{duration: .5, delay: .25}}
        ></motion.div>
        <motion.div className='box-2 bookcont' variants={{
          hidden: {opacity: 0, y: 30},
          visible: {opacity: 1, y: 0}
        }}
        initial="hidden"
         ref={ref}
          animate={maincontroller}
          transition={{duration: .5, delay: .25}}
        ></motion.div>
        <motion.div className='box-2 bookcont' variants={{
          hidden: {opacity: 0, y: 30},
          visible: {opacity: 1, y: 0}
        }}
         ref={ref}
         initial="hidden"
          animate={maincontroller}
          transition={{duration: .5, delay: .25}}
        ></motion.div>
        <motion.div className='box-2 bookcont' variants={{
          hidden: {opacity: 0, y: 30},
          visible: {opacity: 1, y: 0}
        }}
         ref={ref}
         initial="hidden"
          animate={maincontroller}
          transition={{duration: .5, delay: .25}}
        ></motion.div>
        <motion.div className='box-2 bookcont' variants={{
          hidden: {opacity: 0, y: 30},
          visible: {opacity: 1, y: 0}
        }}
         ref={ref}
         initial="hidden"
          animate={maincontroller}
          transition={{duration: .5, delay: .25}}
        ></motion.div>
        <motion.div className='box-2 bookcont' variants={{
          hidden: {opacity: 0, y: 30},
          visible: {opacity: 1, y: 0}
        }}
         ref={ref}
         initial="hidden"
          animate={maincontroller}
          transition={{duration: .5, delay: .25}}
        ></motion.div>
      </div>
    </div>
  );
}
