import { useAnimation, useInView, motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import '../Styles/Back.css';

function Bookcont({keyy, name, genre, rating, img, onclick}) {    
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false});
    const maincontroller = useAnimation();
    useEffect(()=>{
    if(isInView){maincontroller.start("visible")}
    }, [isInView])
    return ( 
        <motion.div key={keyy} className={`box-${keyy} bookcont`} onClick={onclick} variants={{
            hidden: {opacity: 0, y: 30},
            visible: {opacity: 1, y: 0}
          }}
            ref={ref}
            initial="hidden"
            animate={maincontroller}
            transition={{duration: .5, delay: .25}}
            style={{backgroundImage: `url('${img}')`}}
          >
          <div className="books-cont"></div>
          <div className="books-name">
            <div>{name.substring(0,20)}{name.length > 20?"...":""}</div>
            <div>genre - {genre}</div>
            <div>rating - {rating}</div>
          </div></motion.div>
     );
}

export default Bookcont;