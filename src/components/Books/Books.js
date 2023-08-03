import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {FaAngleLeft, FaAngleRight, FaStar} from 'react-icons/fa';
import {VscClose} from 'react-icons/vsc';
import {motion, useAnimate} from 'framer-motion';
import Homebtn from '../Homebtn';
import Logoutbtn from '../Logoutbtn';
import {
  fetchAsync,
  fetgenreAsync
} from '../../features/Books/booksSlice';
import '../Styles/Back.css';
import Searchbar from './Searchbar';
import Bookcont from './Bookcont';

function Books() {

  const [bookIndex, setbookIndex] = useState(0);
  const [dis, setdis] = useState("disabled");
  const [hove, sethove] = useState(false);
  const books = useSelector(selector=>selector.book.books);
  const genre = useSelector(selector=>selector.book.genre);
  const [allbooks, setallbooks] = useState([]);
  useEffect(()=>{
    setallbooks(books);
  },[books])
  useEffect(()=>{
    const e = document.querySelector(".Carousel")
    e.scrollLeft = 1536*bookIndex;
    e.style.scrollBehavior = "smooth";
    
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
    setsearch('')
    setallbooks(books.filter(ele=> ele.rating.rate >= num && ele.rating.rate < num+1));
  }
  const [search, setsearch] = useState("");
  useEffect(()=>{
    setallbooks(books.filter(ele=> ele.title.toLowerCase().includes(search.toLowerCase())))
  },[search])

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
    console.log(e);
    setbookIndex(e);
    setdis("")
  }

  return (
    <div className='books'>
      <Homebtn></Homebtn>
      <Logoutbtn></Logoutbtn>
      <Searchbar hove={hove} gen={genre} filtergen={filterByGenre} filterate={filterByRating} search={[search, setsearch]}></Searchbar>
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
          <div className='Carousel'>
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
                      <motion.div whileHover={{backgroundColor: 'var(--gray)', color: 'var(--black)'}} className='Issue'>Issue</motion.div>
                    </div>
                  </div>
                )
              })}
            </div>
            <Close />
            <PrevArrow />
            <NextArrow />
          </div>
        </motion.section>
    </div>
  );
}

export default Books;
