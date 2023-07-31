import React, { useState } from 'react';
import '../Styles/Contacts.css'
import {AiFillFacebook, AiOutlineCopy, AiFillInstagram, AiFillTwitterSquare} from 'react-icons/ai'
import {BiLogoGmail} from 'react-icons/bi'
import SideMenu from './Side-Menu';

function Contacts() {

    const [msg, setmsg] = useState("");
    const [emai, setemail] = useState("");
    const [name, setname] = useState("");
    const rows = [];
    for (let i = 0; i < 13; i++) {
        rows.push(<div key={i} className={"circle circles"+(i+1)} />);
    }
    function fillit(val){
        switch(val){
            case 1:
                setname("John Doe");
                break;
            case 2:
                setemail("email@gmail.com")
                break;
            case 3:
                setmsg("Hello, How are you, Harman?? I liked your website")
        }
    }
    function fillet(e,val){
        switch (val){
            case 1:
                setname(e.target.value);
                break;
            case 2:
                setemail(e.target.value);
                break;
            case 3:
                setmsg(e.target.value);
        }
    }
    function resetall(){
        setmsg("");
        setemail("");
        setname("");
    }

    return ( 
        <div className="contact-container">
            {rows}
            <div className="contactinfo-cont">
            <SideMenu backcolor={"var(--blue-blur)"} num={3}></SideMenu>
                <div className="infopanel">
                    <div className="info">Information Panel</div>
                    <div className="socialmed-cont">
                        <div className="socials name">Creator - Harmanpreet Kumar</div>
                        <div className="socials gmail"><span className='ic i1'><BiLogoGmail></BiLogoGmail></span>  sljdljslkdjlsj.com</div>
                        <div className="socials facebook"><span className='ic i2'><AiFillFacebook></AiFillFacebook></span>  sljdljslkdjlsj.com</div>
                        <div className="socials insta"><span className='ic i3'><AiFillInstagram></AiFillInstagram></span>  sljdljslkdjlsj.com</div>
                        <div className="socials twitter"><span className='ic i4'><AiFillTwitterSquare></AiFillTwitterSquare></span>  sljdljslkdjlsj.com</div>
                    </div>
                </div>
                <div className="feedbackpanel">
                    <div className="feed">Feedback</div>
                    <form action="/" method="post">
                        <div className="inp name-cont">
                            <input type="text" name="name" id="name" onChange={(e)=>fillet(e,1)} required value={name} />
                            <label htmlFor="name">Name</label>
                            <span className='feedback-icon' onClick={()=>fillit(1)}><AiOutlineCopy></AiOutlineCopy></span>
                        </div>
                        <div className="inp email-cont">
                            <input type="email" name="email" onChange={(e)=>fillet(e,2)} value={emai} required id="email" />
                            <label htmlFor="email">Email</label>
                            <span className='feedback-icon' onClick={()=>fillit(2)}><AiOutlineCopy></AiOutlineCopy></span>
                        </div>
                        <div className="inp textarea-cont">
                            <textarea name="message" id="message" onChange={(e)=>fillet(e,3)} required value={msg} />
                            <label htmlFor="message" autoFocus>Message</label>
                            <span className='feedback-icon' onClick={()=>fillit(3)}><AiOutlineCopy></AiOutlineCopy></span>
                        </div>
                        <div className="buttons">
                            <button type="submit" className='btns'>Submit</button>
                            <button type="reset" className='btns' onClick={resetall}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     );
}

export default Contacts;