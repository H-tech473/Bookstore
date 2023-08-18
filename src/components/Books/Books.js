import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {FaAngleLeft, FaAngleRight, FaStar} from 'react-icons/fa';
import {VscClose} from 'react-icons/vsc';
import {motion} from 'framer-motion';
import Homebtn from '../Homebtn';
import Logoutbtn from '../Logoutbtn';
import {
  incrementQueriedBooks,
  fineAsync,
  removeAsync,
  IssueUpdate
} from '../../features/Users/usersSlice';
import '../Styles/Back.css';
import Searchbar from './Searchbar';
import Bookcont from './Bookcont';
import {
  updateAsync
} from '../../features/Admin/adminsSlice';

function Books() {

  const [bookIndex, setbookIndex] = useState(0);
  const [scb, setscb] = useState("auto")
  const [dis, setdis] = useState("disabled");
  const [ele, setele] = useState("");
  const [dix, setdix] = useState(true);
  const [hove, sethove] = useState(false);
  const dispatch = useDispatch();
  const books = useSelector(selector=>selector.book.books);
  const genre = useSelector(selector=>selector.book.genre);
  const userLogged = useSelector(selector=>selector.user.user)
  const [allbooks, setallbooks] = useState([]);
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  useEffect(()=>{
    const e = document.querySelector(".Carousel")
    setallbooks(books);
  },[books])
  useEffect(()=>{
    setdix(addDays(new Date(userLogged.latestissuedate),2) < new Date() || userLogged.latestissuedate === '')
  },[userLogged])
  useEffect(()=>{
    const e = document.querySelector(".Carousel")
    e.scrollLeft = 1536*bookIndex;
    setscb("smooth")
  },[bookIndex])

  function filterByGenre(type){
    setsearch("")
    if(type === "All") {
      setallbooks(books)
      return;
    }
    setallbooks(books.filter(ele=>ele.category === type))
  }

  function filterByRating(num){
    setsearch("")
    setallbooks(books.filter(ele=> ele.rating.rate >= num && ele.rating.rate < num+1));
  }

  function SearchByText(Text){
    setallbooks(books.filter(ele=> ele.title.toLowerCase().includes(Text.toLowerCase())))
  }
  const [search, setsearch] = useState("");

  const NextArrow = () => {

    function onClick(){
      setbookIndex(bookIndex < allbooks.length-1?bookIndex+1:bookIndex);
    }
    return (
      <motion.div whileHover={{opacity: 1, fontSize: '80px'}}  className="arrow next" onClick={onClick}>
        <FaAngleRight />
      </motion.div>
    );
  };
  const Close = () => {



    return (
      <motion.div whileHover={{opacity: 1, scale: 1.1}}  className="arrow close" onClick={()=>{
        setdis("disabled")
        const e = document.querySelector(".Carousel")
        e.style.scrollBehavior = 'auto'
        }}>
        <VscClose />
      </motion.div>
    );
  };

  const PrevArrow = () => {

    function onClick(){
      setbookIndex(bookIndex > 0?bookIndex-1:bookIndex);
    }

    return (
      <motion.div whileHover={{opacity: 1, fontSize: '80px'}} className="arrow prev" onClick={onClick}>
        <FaAngleLeft />
      </motion.div>
    );
  };
  const NumbStars = ({num}) => {
    const stars = []
    for(let i=0; i<Math.floor(num); i++){
      stars.push(<div key={i} className='Star-y'><FaStar></FaStar></div>)
    }
    for(let i=Math.floor(num); i<5; i++){
      stars.push(<div key={i} className='Star-g'><FaStar></FaStar></div>)
    }
    return stars;
  }

  function Clicked(e){
    setscb("auto")
    setbookIndex(e);
    setdis("")
  }

  const issued = (book) => {
    const dt = new Date();
    dispatch(incrementQueriedBooks({user: userLogged, book: book, type: "Issue"}));
    dispatch(IssueUpdate({user: userLogged, book: book, type: "Issue"}))
    setdix(false)
    setele(<div key="hello" className="message"><div className="bar"></div> Request sent </div>)
    dispatch(updateAsync({book: book.id, issuer: userLogged.id, type: "Issue"}))
    setTimeout(() => {
      setele("")
    }, 1500);
  }

  return (
    <div className='books'>
      <Homebtn></Homebtn>
      <Logoutbtn></Logoutbtn>
      <Searchbar hove={hove} gen={genre} filtergen={filterByGenre} filterate={filterByRating} search={[search, setsearch]} searchtext={SearchByText}></Searchbar>
      <div className="books-result-container" onMouseOver={()=>sethove(true)} onMouseLeave={()=>sethove(false)}>
        <div className='dropshadow'></div>
        {allbooks.length === 0 ? <div className='no-match'>No match found</div>: ""}
        {(allbooks !== undefined) && allbooks.map((element, ind)=>{
          return (
            <Bookcont key={element.id} keyy={element.id} name={element.title} genre={element.category} rating={element.rating.rate} img={element.image} onclick={()=>Clicked(ind)} />
          )
        })}
      </div>
        <motion.section variants={{hidden: {opacity: 0}, visible: {opacity: 1}}} initial={dis==="disabled"?"visible":"hidden"} animate={dis==="disabled"?"hidden":"visible"} className={"Desc-container"+dis}>
          <div className='Carousel' style={{scrollBehavior: scb}}>
            <div className='Car-cont'>
              {allbooks.map((book, ind)=>{
                return (
                  <div key={ind} className='Car-pages'>
                    <div className='Image-cont' style={{backgroundImage: `url(${book.image})`}}></div>
                    <div className='Text-cont'>
                      <div className='Title'>{book.title}</div>
                      <div className='ratings'>Rating - {<NumbStars num={book.rating.rate} />} {book.rating.rate}</div>
                      <div className='small-details'>
                        <div className='genre-c'>Type - {book.category}</div>
                        <div className='pagecount-c'>Pages - {book.rating.pageCount}</div>
                        <div className='bookcount-c'>Count - {book.rating.count}</div>
                      </div>
                      <div className='description'>{book.description}</div>
                      <motion.div onClick={()=>
                        issued(book)
                      } whileHover={{backgroundColor: 'var(--gray)', color: 'var(--black)'}} className={dix?'Issue': 'Issue div--disabled'}>Issue</motion.div>
                    </div>
                  </div>
                )
              })}
            </div>
            <Close />
            <PrevArrow />
            <NextArrow />
          </div>
          {ele}
        </motion.section>
    </div>
  );
}

export default Books;
