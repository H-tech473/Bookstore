import React, { useEffect, useState } from 'react';
import './Styles/Login.css'
import {BsEye, BsEyeSlash} from 'react-icons/bs';
import { Compare, Admin } from '../features/Users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';

function Login() {

    const [visible, setvisible] = useState(false);
    const dispatch = useDispatch();
    const err = useSelector(state => state.user.error)
    const [ele, setele] = useState('');
    const [user, setuser] = useState({
        username: '',
        password: ''
    })
    const [userco, setuserco] = useState({
        username: 'var(--black)',
        password: 'var(--black)'
    });
    function valid(){
        if(user.username === '' || user.password === ''){
            setele(<div key="hello" className="message1"><div className="bar"></div> Inputs invalid </div>)
            setTimeout(() => {
                setele("");
            }, 1000);
        }else{
            if(user.username === "admin" && user.password === "admin"){
                dispatch(Admin())
            }
            else dispatch(Compare({user: user}))
        }
    }
    useEffect(()=>{
        if(err !== undefined){
            setele(<div key="hello" className="message1"><div className="bar"></div>{err}</div>)
        setTimeout(() => {
            setele("");
        }, 1000);
        }
    },[err])

    return ( 
            <div className="login-page">
                {ele}
                <div className="login-center">
                    <div className="login-heading-container">
                        <span className="login-heading">Welcome Back...</span>
                    </div>
                    <div className="login-form-container">
                        <div className="login-form" >
                            <div className="username-container">
                                <input type="text" name="username" value={user.username} onChange={(e)=>{
                                    setuser({...user, username: e.target.value})
                                    if(e.target.value === ''){
                                        setuserco({...userco, username: 'var(--red)'})
                                    }else{
                                        setuserco({...userco, username: 'var(--black)'})
                                    }
                                    }} id="user-name" autoComplete='off' autoFocus required/>
                                <label style={{color: userco.username}} htmlFor="username">Username</label>
                            </div>
                            <div className="password-container">
                                <input type={visible? "text": "password"} value={user.password} onChange={(e)=>{
                                    setuser({...user, password: e.target.value})
                                    if(e.target.value === ''){
                                        setuserco({...userco, password: 'var(--red)'})
                                    }else{
                                        setuserco({...userco, password: 'var(--black)'})
                                    }
                                    }} name="password" autoComplete='off' id="pass-code" required/>
                                <label style={{color: userco.password}} htmlFor="password">Password</label>
                                <span className='visible' onClick={()=>{setvisible(!visible)}}>{!visible ? <BsEye></BsEye>: <BsEyeSlash></BsEyeSlash>}</span>
                            </div>
                            <button type="submit" onClick={valid} className='submit'>Log In</button>
                        </div>
                    </div>
                </div>
            </div>
     );
}

export default Login;