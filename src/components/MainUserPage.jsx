import React, { useState } from 'react';
import './Styles/Login.css';
import Motion from './Motion';
import Buttonflip from './ShiftBtn';
import Login from './Login';
import './Styles/MainPage.css';
import Signup from './Signup';

function MainPage() {

    const [logorsign, setlogorsign] = useState(false);
    function toggleSwitc(){
        setlogorsign(!logorsign);
    }

    return ( 
        <section className='Login-Signup-section'>
            <div className="Switchbtn">
                    <Buttonflip flip={toggleSwitc} Text={!logorsign?"L":"S"}></Buttonflip>
            </div>
            <div className='login-page-container'>
                {logorsign?<Signup></Signup>:<Login></Login>}
                <Motion></Motion>
            </div>
        </section>
     );
}

export default MainPage;