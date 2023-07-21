import React, { useState } from 'react';
import './Styles/Login.css'
import {BsEye, BsEyeSlash} from 'react-icons/bs';
import { motion } from 'framer-motion';

function Login() {

    const [visible, setvisible] = useState(false);

    return ( 
        <div className='login-page-container'>
            <div className="login-page">
                <div className="login-center">
                    <div className="login-heading-container">
                        <span className="login-heading">Welcome Back...</span>
                    </div>
                    <div className="login-form-container">
                        <form action="/" method="post" className="login-form" autoComplete='off'>
                            <div className="username-container">
                                <input type="text" name="username" id="user-name" autoFocus/>
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="password-container">
                                <input type={visible? "text": "password"} name="password" id="pass-code" />
                                <label htmlFor="password">Password</label>
                                <span className='visible' onClick={()=>{setvisible(!visible)}}>{!visible ? <BsEye></BsEye>: <BsEyeSlash></BsEyeSlash>}</span>
                            </div>
                            <button type="submit" className='submit'>Log In</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="animation-side">

                <motion.div
                    className="box"
                    animate={{
                        rotate: [0, 0, 180, 180, 0],
                        borderRadius: ["0%", "0%", "50%", "50%", "0%"]
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        delay: 0,
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                />
                <motion.div
                    className="box"
                    animate={{
                        rotate: [0, 0, 180, 180, 0],
                        borderRadius: ["0%", "0%", "50%", "50%", "0%"]
                    }}
                    transition={{
                        duration: 2,
                        delay: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                />
                <motion.div
                    className="box"
                    animate={{
                        rotate: [0, 0, 180, 180, 0],
                        borderRadius: ["0%", "0%", "50%", "50%", "0%"]
                    }}
                    transition={{
                        duration: 2,
                        delay: 1,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                />
            </div>
        </div>
     );
}

export default Login;