import React, { useEffect, useState } from 'react';
import {VscClose} from 'react-icons/vsc';
import { useSelector, useDispatch } from 'react-redux';
import {motion} from 'framer-motion'
import {
  removeIssued,
  getFine,
  removeAsync,
  fineAsync,
  fetchuAsync,
  timestamp,
  incrementQueriedBooks,
  returnAsync
} from '../../features/Users/usersSlice';
import {
  updateAsync
} from '../../features/Admin/adminsSlice';
import {AiOutlineUser} from 'react-icons/ai';
import '../Styles/Users.css';

export default function Users({id}) {

  const user = useSelector(state=>state.user.user);
  const book = useSelector(state=>state.book.books);
  const dispatch = useDispatch();
  const dt = new Date();

  useEffect(()=>{
    if(user.id !== -1){
      dispatch(getFine(user))
      dispatch(fineAsync(user))
      setdix(addDays(new Date(user.latestissuedate),2) < new Date())
    }
  },[user.id])

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const [sel, setsel] = useState("1");
  const [ele, setele] = useState("");
  const [dix, setdix] = useState(true);

  return (
    <div className='Dashboard'>
      <div className='Dash-container'>
        <div className='user-img'>
          <div className='img-container'>
            <div className='user-imgs'>
              <AiOutlineUser></AiOutlineUser>
            </div>
          </div>
        </div>
        <div className='user-details'>
          <div className='user-id'>
            <label htmlFor='user-id'>Id</label>
            <input type='text' id='user-id' value={user.id < 10 ? '0'+user.id : user.id} readOnly='readOnly' />
            </div>
          <div className='user-name'>
            <label htmlFor='user-name'>Name</label>
            <input type='text' id='user-name' value={user.name} readOnly='readOnly' />
          </div>
          <div className='user-email'>
            <label htmlFor='user-email'>Email</label>
            <input type='email' id='user-email' value={user.email} readOnly='readOnly' />
            </div>
          <div className='user-phone'>
            <label htmlFor='user-phone'>Phone</label>
            <input type='tel' id='user-phone' value={user.phone} readOnly='readOnly' />
            </div>
          <div className='user-fine'>
            <label htmlFor='user-fine'>Fine</label>
            <input type='number' id='user-fine' value={user.Totfine} readOnly='readOnly' />
            </div>
        </div>
        <div className='user-actions'>
          <div className={sel==="1"?'selected':''} onClick={()=>setsel("1")}>Issue history</div>
          <div className={sel==="2"?'selected':''} onClick={()=>setsel("2")}>Messages</div>
        </div>
        <div className='user-history'>
          {sel === "1"? 
          <div className='history-cont'>
          {user !== undefined && user.id !== -1 && user.booksissued.length === 0 ? <div className='message-no-his'>No History</div>: ""}
          {user !== undefined && user.id !== -1 && user.booksissued.map((elem, ind)=>{
            return (
              <div className={new Date(elem.returndate) >= dt || elem.returndate === 'Returned' ? 'history' : 'history div--red'} key={ind}>
              <div className='book-img' style={{backgroundImage: `url(${book.find(ele=> ele.id === elem.bookid).image})`}}></div>
              <div className='book-det'>
                <div className='book-id'>{elem.bookid}</div>
                <div className='book-name'>{book.find(ele => ele.id === elem.bookid).title}</div>
                <div className='Date-of-return'>{new Date(elem.returndate) >= dt || elem.returndate === 'Returned' ? elem.returndate: "Late Submission"}</div>
              </div>
                {elem.returndate === 'Returned' ? <motion.div whileHover={{scale: 1.3}} onClick={()=>{
                  const e = user.booksissued.filter(ele => ele.issueid !== elem.issueid);
                  dispatch(removeIssued(elem.issueid))
                  dispatch(removeAsync({id: user.id , change: {booksissued: e}}))
                }} className='close-his'><VscClose /></motion.div>:
                new Date(elem.returndate) >= dt ? <motion.div whileHover={{scale: 1.1}} onClick={()=>{
                  setele(<div key="hello" className="message"><div className="bar"></div> Request sent </div>)
                  dispatch(incrementQueriedBooks({book: book.find(elee => elee.id === elem.bookid), type: "Return"}))
                  dispatch(returnAsync({user: user,book: book.find(elee => elee.id === elem.bookid), type: "Return"}))
                  dispatch(updateAsync({book: elem.bookid, issuer: user.id, type: "Return"}))
                  setdix(false)
                  setTimeout(() => {
                    setele("")
                  }, 1500);
                }} className={ele==="" && dix?'return-his':'return-his div--disabled'}>Return</motion.div>:
                ""}
            </div>
            )
          })}
        </div>
          :
          <div className='history-cont'>
          {user !== undefined && user.id !== -1 && user.messages.length === 0 ? <div className='message-no-his'>No Messages</div>: ""}
          {user !== undefined && user.id !== -1 && user.messages.map((elem, ind)=>{
            return (
              <div>
                hello
              </div>
            )
          })}
        </div>
          }
        </div>
      </div>
        {ele}
    </div>
  );
}
