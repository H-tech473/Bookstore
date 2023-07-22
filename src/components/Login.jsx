import React, { useState } from 'react';
import './Styles/Login.css'
import {BsEye, BsEyeSlash} from 'react-icons/bs';

function Login() {

    const [visible, setvisible] = useState(false);

    return ( 
            <div className="login-page">
                <div className="login-center">
                    <div className="login-heading-container">
                        <span className="login-heading">Welcome Back...</span>
                    </div>
                    <div className="login-form-container">
                        <form action="/" method="post" className="login-form" autoComplete='off'>
                            <div className="username-container">
                                <input type="text" name="username" id="user-name" autoFocus required/>
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="password-container">
                                <input type={visible? "text": "password"} name="password" id="pass-code" required/>
                                <label htmlFor="password">Password</label>
                                <span className='visible' onClick={()=>{setvisible(!visible)}}>{!visible ? <BsEye></BsEye>: <BsEyeSlash></BsEyeSlash>}</span>
                            </div>
                            <button type="submit" className='submit'>Log In</button>
                        </form>
                    </div>
                </div>
            </div>
     );
}

export default Login;