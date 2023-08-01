import React, { useEffect, useState } from 'react';
import {AiOutlineSearch} from 'react-icons/ai'
import '../Styles/Searchbar.css';

function Searchbar({hove}) {
  useEffect(()=>{
    if(hove){
      if(barstate === 2){
        setclos("none")
        sethov(false)
        setbarstate(1);
        settype(<AiOutlineSearch />);
        setTimeout(() => {
          setclos("all")
        }, 500);
      }else if(barstate === 3){
        setclos("none")
        sethov(false)
        setbarstate(2);
        setTimeout(() => {
          setbarstate(1);
          settype(<AiOutlineSearch />);
          setTimeout(() => {
            setclos("all")
          }, 1000);
        }, 1000);
      }
    }
  },[hove])
  const [type, settype] = useState(<AiOutlineSearch />)
  const [hov, sethov] = useState(false);
  const [barstate, setbarstate] = useState(1)
  const [clos, setclos] = useState("all");
  function closeSugession(){
    setbarstate(2)
    settype("Type");
    setclos("none")
    sethov(false)
    setTimeout(() => {
        setclos("all")
    }, 1000);
  }
  function openSugession(){
    if(clos === "none") return;
    if(barstate === 1){
      if(hov === true){
        setclos("none")
        sethov(false)
        setbarstate(2);
        settype("Type");
        setTimeout(() => {
          setclos("all")
        }, 500);
      }else if(hov === false){
        return;
      }
    }else if(barstate === 2){
      if(hov === false){
        setclos("none")
        sethov(false)
        setbarstate(1);
        settype(<AiOutlineSearch />);
        setTimeout(() => {
          setclos("all")
        }, 500);
      }else if(hov === true){
        setclos("none")
        sethov(false)
        setbarstate(3);
        setTimeout(() => {
          setclos("all")
        }, 1000);
      }
    }else if(barstate === 3){
      if(hov === false){
        setclos("none")
        sethov(false)
        setbarstate(2);
        setTimeout(() => {
          setbarstate(1);
          settype(<AiOutlineSearch />);
          setTimeout(() => {
            setclos("all")
          }, 1000);
        }, 1000);
      }if(hov === true){
        return;
      }
    }
  }

  const res = [];
  for(let i=0;i<12;i++){
    res.push(<div key={i} className={'book'+i}>Books</div>)
  }
    return ( 
        <div className="books-search-container" onClick={openSugession}>
        <div className={"books-search-bar "+(barstate===1?" books-search-bar-closed ":"")} style={{pointerEvents: clos}} onMouseOver={()=>sethov(true)} onMouseLeave={()=>sethov(false)}>
          <div className={"books-search-type"+(barstate===1?" books-search-type-closed":"")} onClick={barstate===1?openSugession:closeSugession}>{type}</div>
          <div className="input-searchbar">
            <input type="text" name="search" id="searchres" onFocus={openSugession} placeholder='Search...' autoComplete='off'/>
          </div>
          <div className="input-search-btn"><AiOutlineSearch></AiOutlineSearch></div>
        </div>
        <div className="search-sugestions" style={{pointerEvents: clos}}>
          <div className={"suggestioncont"+(barstate===3?" suggestioncont-open":" suggestioncont-closed")}  onMouseOver={()=>sethov(true)} onMouseLeave={()=>sethov(false)}>
            <div className={"genre"+(barstate===3?" div-visible":" div-invisible")}>{res}</div>
            <div className={"rating"+(barstate===3?" div-visible":" div-invisible")}>{res}</div>
          </div>
        </div>
      </div>
     );
}

export default Searchbar;