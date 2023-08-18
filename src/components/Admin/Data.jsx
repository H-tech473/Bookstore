import React, { useEffect, useState } from 'react';
import '../Styles/Admin.css'
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { changeAsync, confirmAsync, fetchsync, sendAsync } from '../../features/Admin/adminsSlice';
import { IssueEntry, returnEntry } from '../../features/Users/usersSlice';
import { VscClose } from 'react-icons/vsc';

function DataShown() {

    const admin = useSelector(selector=>selector.admin);
    const books = useSelector(selector=>selector.book.books);
    const dispatch = useDispatch();
    const [selected, setselected] = useState(1);
    const [ele, setele] = useState('');
    const [users, setusers] = useState([]);
    const [requests, setrequests] = useState([]);
    const [message, setmessage] = useState({
        show: false,
        user: {},
        message: {}
    });
    const [confirm, setconfirm] = useState({
        show: false,
        user: {},
        request: {},
        type: ''
    })
    const [feedback, setfeedback] = useState([]);
    useEffect(()=>{
        if(admin.data !== undefined){
        if(admin.data.users !== undefined) setusers(admin.data.users.filter(element=> element.id !== -2))
        if(admin.data.admin !== undefined) setrequests(admin.data.admin.requests);
        if(admin.data.admin !== undefined) setfeedback(admin.data.admin.feedbacks)
        }
    },[admin.data])

    return ( 
        <div className='Admin-Dash'>
            {ele}
            <div className="user-dash">
                <div className="usercount">
                    <label>User count</label>
                    <input type="text" value={users.length} readOnly="readOnly" />
                </div>
                <div className="requestcount">
                    <label>Request count</label>
                    <input type="text" value={requests.length} readOnly="readOnly" />
                </div>
                <div className="feedcount">
                    <label>Feedback count</label>
                    <input type="text" value={feedback.length} readOnly="readOnly" />
                </div>
            </div>
            <div className="actions-dash">
                <div className="action-type">
                    <div className={selected === 1?"selected": ''} onClick={()=>setselected(1)}>Users</div>
                    <div className={selected === 2?"selected": ''} onClick={()=>setselected(2)}>Requests</div>
                    <div className={selected === 3?"selected": ''} onClick={()=>setselected(3)}>Feedbacks</div>
                </div>
                {message.show? <div className="messagebox">
                        <div className="menu">
                            <div className="heading">Message Something to { message.user.name.substring(0, 6)}</div>
                            <div className="severity">Type of message -  
                                <select>
                                    <option onClick={()=>setmessage({...message, message: {...message.message, type: "Normal"}})}>Normal</option>
                                    <option onClick={()=>setmessage({...message, message: {...message.message, type: "Warning"}})}>Warning</option>
                                </select>
                            </div>
                            <textarea value={message.message.message} onChange={(e)=>setmessage({...message, message: {...message.message, message: e.target.value}})} placeholder='Enter your Message here'></textarea>
                            <motion.div whileHover={{scale: 1.1, backgroundColor: 'var(--blue)'}} onClick={()=>{
                                setele(<div key="hello" className="message1"><div className="bar"></div>Message Sent</div>)
                                setTimeout(() => {
                                    setele("");
                                }, 1000);
                                dispatch(sendAsync({user: message.user, message: message.message}));
                                setmessage({show: false, user: {}, message: {}});
                            }} style={message.message.message.length === 0? {pointerEvents: 'none'}:{}} className='send'>Send</motion.div>
                            <motion.div whileHover={{scale: 1.1, backgroundColor: 'var(--red)'}} onClick={()=>setmessage({show: false, user: {}, message:{}})} className='reject'>Cancel</motion.div>
                        </div>
                    </div>: ''}
                {confirm.show? <div className="messagebox">
                        <div className="menu div--center">
                            <div className="heading-1">Confirm <span style={confirm.type==="Accept"? {color: 'var(--blue)',fontWeight: 'bolder'}: {color: 'var(--red)', fontWeight: 'bolder'}}>{confirm.type}</span> on the request by {confirm.user.name}?</div>
                            <motion.div whileHover={{scale: 1.1, backgroundColor: 'var(--blue)'}} onClick={()=>{
                                setele(<div key="hello" className="message1"><div className="bar"></div>Confirmed</div>)
                                setTimeout(() => {
                                    setele("");
                                }, 1000);
                                setrequests(admin.data.admin !== undefined ?admin.data.admin.requests.filter(elem => elem.reqid !== confirm.request.reqid): [])
                                setconfirm({show: false, user: {}, request: {}, type: ''});

                                dispatch(confirmAsync({user: confirm.user, request: confirm.request, type: confirm.type, message: {type: "Normal", message: `Your Request with request id ${confirm.request.reqid} is ${confirm.type==="Accept"? "Accepted": "Rejected"} by the admin.`}}))
                                if(confirm.type === "Accept"){
                                    if(confirm.request.type === "Issue") dispatch(IssueEntry({bookid: confirm.request.book, user: confirm.user}))
                                    else dispatch(returnEntry({bookid: confirm.request.book, user: confirm.user}))
                                }
                            }} className='send'>Confirm</motion.div>
                            <motion.div whileHover={{scale: 1.1, backgroundColor: 'var(--red)'}} onClick={()=>setconfirm({show: false, user: {}, request:{}, type: ''})} className='reject'>Cancel</motion.div>
                        </div>
                    </div>: ''}
                <div className="options-available">
                    
                    {admin.data !== undefined && selected === 1 ?
                        users.map((element,ind) => {
                            return (
                                <div key={ind} className="user-con">
                                    <div className="id">{element.id}</div>
                                    <div className="opt-name">Name - {element.name}</div>
                                    <div className="opt-email">Email - {element.email}</div>
                                    <div className="opt-phone">Phone - {element.phone}</div>
                                    <motion.div whileHover={{scale: 1.1, backgroundColor: 'var(--gray)', color: 'var(--blue)'}} onClick={()=>setmessage({show: true, user: element, message: {type: "Normal", message: ''}})} className="messagebtn">Message</motion.div>
                                </div>
                            )
                        }): ''
                    }
                    {admin.data !== undefined && selected === 1 && users.length === 0 ?
                        <div className='emptyuser'>No Users</div>:''
                    }
                    {admin.data !== undefined && selected === 2 ?
                        requests.map((element,ind) => {
                            return (
                                <div key={ind} className="request-con">
                                    <div className="id">{element.reqid}</div>
                                    <div className="book-issued-name">Bookname - {books.find(ele=> ele.id === element.book).title}</div>
                                    <div className="issuer-name">Issuer - {users.find(ele => ele.id === element.issuer).name}</div>
                                    <div className="issuer-id">IssuerId - {element.issuer}</div>
                                    <div className="req-type">Request Type - {element.type}</div>
                                    <motion.div whileHover={{scale: 1.1, backgroundColor: 'var(--gray)', color: 'var(--blue)'}} onClick={()=>setconfirm({show: true, user: users.find(ele=>ele.id === element.issuer), request: element, type: 'Accept'})} className="acceptbtn">Accept</motion.div>
                                    <motion.div whileHover={{scale: 1.1, backgroundColor: 'var(--gray)', color: 'var(--red)'}} onClick={()=>setconfirm({show: true, user: users.find(ele=>ele.id === element.issuer), request: element, type: 'Reject'})} className="rejectbtn">Reject</motion.div>
                                </div>
                            )
                        }): ''
                    }
                    {admin.data !== undefined && selected === 2 && requests.length === 0 ?
                        <div className='emptyuser'>No Requests</div>:''
                    }
                    {admin.data !== undefined && selected === 3 ?
                        feedback.map((element, ind) => {
                            return (
                                <div key={ind} className="feedback-con">
                                    <div className="id">{element.feedid}</div>
                                    <div className="opt-name">{element.name}</div>
                                    <div className="opt-email">{element.email}</div>
                                    <div className="opt-message">{element.message}</div>
                                    <motion.div whileHover={{scale: 1.2}} onClick={()=>{
                                        dispatch(changeAsync({feedid: element.feedid}))
                                        dispatch(fetchsync());
                                        setfeedback(admin.data.admin.feedbacks !== undefined? admin.data.admin.feedbacks: []);
                                    }} className='close2'><VscClose /></motion.div>
                                </div>
                            )
                        }): ''
                    }
                    {admin.data !== undefined && selected === 3 && feedback.length === 0 ?
                        <div className='emptyuser'>No feedback</div>:''
                    }
                    
                </div>
            </div>
        </div>
     );
}

export default DataShown;