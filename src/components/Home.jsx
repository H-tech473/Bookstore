import React, { useEffect, useState } from 'react';
import Aboutpage from './HomePage/About';
import HomePage from './HomePage/Homepage';
import Contacts from './HomePage/Contacts';
import './Styles/Home.css'
import SideMenu from './HomePage/Side-Menu';
import Logout from './Logoutbtn';

function Home() {

    const [color, setcolor] = useState("var(--black-blur)");
    const [numb, setnumb] = useState(2);
    useEffect(()=>{
        let element = document.querySelector(".Homepages");
        element.scrollLeft = 1229.5999755859375;
        element.style.scrollBehavior = "smooth";
        element.addEventListener("scroll", ()=>{
            if(element.scrollLeft >= 0 && element.scrollLeft < 1200.5999755859375){
                setnumb(1);
                setcolor("var(--red-blur)");
            }else if(element.scrollLeft >= 1200.5999755859375 && element.scrollLeft < 2440.199951171875){
                setnumb(2);
                setcolor("var(--black-blur)");
            }else if(element.scrollLeft >= 2440.199951171875){
                setnumb(3);
                setcolor("var(--blue-blur)");
            }
        })
    }, [])

    function setleft(numb){
        let element = document.querySelector(".Homepages");
        switch(numb){
            case 1:
                element.scrollLeft = 0;
                break;
            case 2:
                element.scrollLeft = 1229.5999755859375;
                break;
            case 3:
                element.scrollLeft = 2440.199951171875;
        }
    }

    return ( 
        <div>
            <SideMenu backcolor={color} num={numb} setleft={setleft}></SideMenu>
            <Logout></Logout>
            <div className="Homepages" id="Homepages" style={{backgroundColor: color}}>
                <div className='sections-1 sect'><Aboutpage></Aboutpage></div>
                <div className='sections-2 sect'><HomePage></HomePage></div>
                <div className='sections-3 sect'><Contacts></Contacts></div>
            </div>
        </div>
     );
}

export default Home;