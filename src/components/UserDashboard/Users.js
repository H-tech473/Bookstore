import React, { useEffect, useState } from 'react';
import {VscClose} from 'react-icons/vsc';
import validator from 'validator';
import { useSelector, useDispatch } from 'react-redux';
import {motion} from 'framer-motion'
import {
  removeIssued,
  getFine,
  removeAsync,
  incrementQueriedBooks,
  fineAsync,
  returnAsync,
  setDetails
} from '../../features/Users/usersSlice';
import {
  updateAsync
} from '../../features/Admin/adminsSlice';
import {AiFillEdit, AiOutlineUser, AiFillSave} from 'react-icons/ai';
import '../Styles/Users.css';
import Logoutbtn from '../Logoutbtn';
import Homebtn from '../Homebtn';

export default function Users({id}) {

  const user = useSelector(state=>state.user.user);
  const book = useSelector(state=>state.book.books);
  const [sel, setsel] = useState("1");
  const [ele, setele] = useState("");
  const [dix, setdix] = useState(true);
  const [edit,setedit] = useState(false);
  const [color, setcolor] = useState({
    name: "var(--black)",
    email: "var(--black)",
    error: 0,
    phone: "var(--black)"
  })
  const dispatch = useDispatch();
  const dt = new Date();
  const [use, setuse] = useState({
    name: "",
    email: "",
    phone: ""
  })
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  useEffect(()=>{
    if(user.id !== -1){
      dispatch(getFine(user))
      dispatch(fineAsync(user))
      setuse({name: user.name, email: user.email, phone: user.phone});
    }
  },[user.id])
  useEffect(()=>{
    const dt = new Date();
    setdix(addDays(user.latestissuedate, 2) < dt || user.latestissuedate === '');
  },[user.latestissuedate])

  const [opt, setopts] = useState({'readOnly': 'readOnly'});

  return (
    <div className='Dashboard'>
      <Logoutbtn></Logoutbtn>
      <Homebtn></Homebtn>
      {user.id !== -1 ?
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
          <input type='text' id='user-id' value={user !== undefined ? user.id < 10 ? '0'+user.id : user.id: ''} readOnly="readOnly" />
          </div>
        <div className='user-name'>
          <label htmlFor="user-name">Name</label>
          <input type='text' id={edit === false ?"user-name": "inp--editable"} style={{color: color.name}} value={use.name} onChange={(e)=>{
              setuse({...use, name: e.target.value})
            if(e.target.value.length > 3 && e.target.value.length < 24 && validator.isAlphanumeric(e.target.value)){
              setcolor({...color, name: 'var(--black)'})
            }else{
              setcolor({...color, name: 'var(--red)'})
            }
          }} {...opt} />
        </div>
        <div className='user-email'>
          <label htmlFor='user-email'>Email</label>
          <input type='email' id={edit === false ?"user-email": "inp--editable"} style={{color: color.email}} value={use.email} onChange={(e)=>{
            setuse({...use, email: e.target.value})
            if(validator.isEmail(e.target.value)){
              setcolor({...color, email: 'var(--black)'})
            }else{
              setcolor({...color, email: 'var(--red)'})
            }
          }} {...opt} />
          </div>
        <div className='user-phone'>
          <label htmlFor='user-phone'>Phone</label>
          <input type='tel' id={edit === false ?"user-phone": "inp--editable"} style={{color: color.phone}} value={use.phone} onChange={(e)=>{
            setuse({...use, phone: e.target.value})
            if(validator.isMobilePhone(e.target.value) && e.target.value.length === 10){
              setcolor({...color, phone: 'var(--black)'})
            }else{
              setcolor({...color, phone: 'var(--red)'})
            }
          }} {...opt} />
          </div>
        <div className='user-fine'>
          <label htmlFor='user-fine'>Fine</label>
          <input type='number' id='user-fine' value={user !== undefined ? user.Totfine: ''} readOnly='readOnly' />
          </div>
      </div>

      <motion.div whileHover={{scale: 1.1, color: 'var(--gray)'}} onClick={()=>{
        if(edit){
          dispatch(setDetails({id: user.id, change: use}));
          setopts({'readOnly': 'readOnly'})
          setele(<div key="hello" className="message"><div className="bar"></div> Details Changed </div>)
          setedit(false)
          setTimeout(() => {
            setele("")
          }, 1500);
        }else{
          setopts({});
          setedit(true)
        }
      }} className='edit' style={color.name === 'var(--red)' || color.phone === 'var(--red)' || color.email === 'var(--red)' ? {pointerEvents: 'none'}: {pointerEvents: 'all'}}>{!edit ?<AiFillEdit></AiFillEdit>: <AiFillSave />}<span>{!edit ?" Edit": " Save"}</span></motion.div>


      <div className='user-actions'>
        <div className={sel==="1"?'selected':''} onClick={()=>setsel("1")}>Issue history</div>
        <div className={sel==="2"?'selected':''} onClick={()=>setsel("2")}>Messages</div>
        <div className={sel==="3"?'selected':''} onClick={()=>setsel("3")}>Request history</div>
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
        :sel === "2"?
        <div className='history-cont'>
        {user !== undefined && user.id !== -1 && user.messages.length === 0 ? <div className='message-no-his'>No Messages</div>: ""}
        {user !== undefined && user.id !== -1 && user.messages.map((elem, ind)=>{
          return (
            <div key={ind} className='message-con' style={elem.type==="Accept"?{backgroundColor: 'var(--red)'}: {backgroundColor: 'var(--blue)'}}>
              {elem.message}
              <motion.div whileHover={{scale: 1.2}} onClick={()=>{
                dispatch(setDetails({id: user.id, change: {messages: user.messages.filter(ele => ele.messageid !== elem.messageid)}}))
              }} className='close1'><VscClose /></motion.div>
            </div>
          )
        })}
      </div>
        :
        <div className='history-cont'>
        {user !== undefined && user.id !== -1 && user.booksrequested.length === 0 ? <div className='message-no-his'>No Requests</div>: ""}
        {user !== undefined && user.id !== -1 && user.booksrequested.map((elem, ind)=>{
          return (
            <div className={'history'} key={ind}>
            <div className='book-img' style={{backgroundImage: `url(${book.find(ele=> ele.id === elem.bookid).image})`}}></div>
            <div className='book-det'>
              <div className='book-id'>{elem.bookid}</div>
              <div className='book-name'>{book.find(ele => ele.id === elem.bookid).title}</div>
              <div className='Date-of-return1'>{elem.replied === true ? "Replied": "Not replied yet"}</div>
            </div>
              {elem.replied === true?<motion.div whileHover={{scale: 1.3}} onClick={()=>{
                dispatch(setDetails({id: user.id, change: {booksrequested: user.booksrequested.filter(ele => ele.queryid !== elem.queryid)}}))
              }} className='close-his'><VscClose /></motion.div>: ''}
          </div>
          )
        })}
      </div>
        }
      </div>
    </div>: ''
      }
        {ele}
    </div>
  );
}
