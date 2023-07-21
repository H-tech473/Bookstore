import React, { useState } from 'react';
import './Styles/Signup.css';
import {BsEye, BsEyeSlash} from 'react-icons/bs';
import Motion from './Motion';

function Signup() {

    const [pvisible, setpvisible] = useState(false);
    const [cvisible, setcvisible] = useState(false);

    const bounceTransition = {
        y: {
          duration: 0.4,
          yoyo: Infinity,
          ease: "easeOut",
        },
        backgroundColor: {
          duration: 0,
          yoyo: Infinity,
          ease: "easeOut",
          repeatDelay: 0.8,
        },
      }

    return ( 
        <div className="signup-page-container">
            <div className="signup-page">
                <div className="signup-center">
                    <div className="signup-heading-container">
                        <span className="signup-heading">New Here!!</span>
                    </div>
                    <div className="signup-form-container">
                        <form action="/" method='post' className="signup-form">
                            <div className="susername-container">
                                <input type="text" name="username" id="u-name" className="username" autoComplete='off' autoFocus required />
                                <label htmlFor="u-name">Username</label>
                            </div>
                            <div className="semail-container">
                                <input type="email" name="email" id="e-mail" className='email' autoComplete='off' required />
                                <label htmlFor="e-mail">Email</label>
                            </div>
                            <div className="spassword-container">
                                <input type={pvisible? "text": "password"} name="password" id="pass-word" className="pass-code" autoComplete='off' required />
                                <label htmlFor="pass-word">Password</label>
                                <span className='visible' onClick={()=>{setpvisible(!pvisible)}}>{!pvisible ? <BsEye></BsEye>: <BsEyeSlash></BsEyeSlash>}</span>
                            </div>
                            <div className="spassword-confirm">
                                <input type={cvisible? "text": "password"} name="conpassword" id="c-password" className="cpassword" autoComplete='off' required />
                                <label htmlFor="c-password">Confirm Password</label>
                                <span className='visible' onClick={()=>{setcvisible(!cvisible)}}>{!cvisible ? <BsEye></BsEye>: <BsEyeSlash></BsEyeSlash>}</span>
                            </div>
                            <button type="submit" className='submit'>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
            <Motion></Motion>
        </div>
     );
}

export default Signup;