import React from 'react';

function Signup() {
    return ( 
        <div className="signup-page-container">
            <div className="signup-page">
                <div className="signup-heading-container">
                    <span className="signup-heading">New Here!!</span>
                </div>
                <div className="signup-form-container">
                    <form action="/" method='post' className="signup-form">
                        <div className="username-container">
                            <input type="text" name="username" id="u-name" className="username" placeholder='Username' required />
                        </div>
                        <div className="email-container">
                            <input type="email" name="email" id="e-mail" className='email' placeholder='Email' required />
                        </div>
                        <div className="password-container">
                            <input type="password" name="password" id="pass-word" className="pass-code" placeholder='Password' required />
                        </div>
                        <div className="password-confirm">
                            <input type="password" name="conpassword" id="c-password" className="cpassword" placeholder='Confirm Password' required />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
     );
}

export default Signup;