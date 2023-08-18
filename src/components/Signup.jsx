import React, { useEffect, useState } from 'react';
import './Styles/Signup.css';
import {BsEye, BsEyeSlash} from 'react-icons/bs';
import validator from 'validator';
import {createUser} from '../features/Users/usersSlice'
import { useDispatch } from 'react-redux';

function Signup() {

    const [pvisible, setpvisible] = useState(false);
    const [sin, setsin] = useState(true);
    const dispatch = useDispatch();
    const [cvisible, setcvisible] = useState(false);
    const [ele, setele] = useState('');
    const [user, setuser] = useState({
        username: '',
        password: '',
        email: '',
        conpassword: ''
    });
    const [userco, setuserco] = useState({
        username: 'var(--black)',
        password: 'var(--black)',
        email: 'var(--black)',
        conpassword: 'var(--black)'
    });

    function valid(){
        let e = true;
        setsin(false);
        if(user.username === '' || user.password === '' || user.email === '' || user.conpassword === '') e = false;
        if(userco.username === 'var(--red)' || userco.password === 'var(--red)' || userco.email === 'var(--red)' || userco.conpassword === 'var(--red)') e = false;
        if(e){
            dispatch(createUser({user: user}));
            setsin(true);
        }else{
            setele(<div key="hello" className="message1"><div className="bar"></div> Inputs invalid </div>)
            setTimeout(() => {
                setele("");
                setsin(true);
            }, 1000);
        }
    }

    return ( 
            <div className="signup-page">
                {ele}
                <div className="signup-center">
                    <div className="signup-heading-container">
                        <span className="signup-heading">New Here!!</span>
                    </div>
                    <div className="signup-form-container">
                        <div className="signup-form">
                            <div className="susername-container">
                                <input type="text" name="username" id="u-name" className="username" value={user.username} onChange={(e)=>{
                                    setuser({...user, username: e.target.value});

                                    user.username.length >= 3 && user.username.length <= 24 && validator.isAlphanumeric(e.target.value)?
                                        setuserco({...userco, username: 'var(--black)'})
                                    :
                                        setuserco({...userco, username: 'var(--red)'})
                                }} autoComplete='off' autoFocus required />
                                <label htmlFor="u-name" style={{color: userco.username}}>Username</label>
                            </div>
                            <div className="semail-container">
                                <input type="email" name="email" id="e-mail" className='email' value={user.email} onChange={(e)=>{
                                    setuser({...user, email: e.target.value})
                                    validator.isEmail(e.target.value)?
                                        setuserco({...userco, email: 'var(--black)'})
                                    :
                                        setuserco({...userco, email: 'var(--red)'})
                                }} autoComplete='off' required />
                                <label htmlFor="e-mail" style={{color: userco.email}}>Email</label>
                            </div>
                            <div className="spassword-container">
                                <input type={pvisible? "text": "password"} name="password" id="pass-word" value={user.password} onChange={(e)=>{
                                    setuser({...user, password: e.target.value})
                                    user.password.length < 3?
                                        setuserco({...userco, password: 'var(--red)'})
                                    :
                                        setuserco({...userco, password: 'var(--black)'})
                                    }} className="pass-code" autoComplete='off' required />
                                <label htmlFor="pass-word" style={{color: userco.password}}>Password</label>
                                <span className='visible' onClick={()=>{setpvisible(!pvisible)}}>{!pvisible ? <BsEye></BsEye>: <BsEyeSlash></BsEyeSlash>}</span>
                            </div>
                            <div className="spassword-confirm">
                                <input type={cvisible? "text": "password"} name="conpassword" value={user.conpassword} onChange={(e)=>{
                                    setuser({...user, conpassword: e.target.value})
                                    user.password === e.target.value?
                                    setuserco({...userco, conpassword: 'var(--black)'})
                                :
                                    setuserco({...userco, conpassword: 'var(--red)'})
                                }} id="c-password" className="cpassword" autoComplete='off' required />
                                <label htmlFor="c-password" style={{color: userco.conpassword}}>Confirm Password</label>
                                <span className='visible' onClick={()=>{setcvisible(!cvisible)}}>{!cvisible ? <BsEye></BsEye>: <BsEyeSlash></BsEyeSlash>}</span>
                            </div>
                            <button type="submit" className='submit' onClick={valid}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
     );
}

export default Signup;