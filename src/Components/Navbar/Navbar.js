import React,{useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import { UserContext } from '../../theContext';
import { useDispatch,useSelector } from 'react-redux';

export default function Navbar() {

  const {tab} = useSelector(state=>({
    ...state.ArticleReducer,
  }))

  const dispatch = useDispatch();

    const {changeState,token,changeToken} = useContext(UserContext);
    const deconnexion=()=>
    {
      changeToken("")
      sessionStorage.removeItem("token")
      // Cookies.remove("token");
      fetch('http://localhost:3001/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log('Logged out successfully');
          } else {
            console.error('Error logging out');
          }
        })
        .catch((error) => console.error('Error:', error));      
    }

    useEffect(()=>{
      if (tab.length>0)
      {
        dispatch(()=>({
          type:'EMPTY_ARTICLES',
          payload:[],
        }))
      }
    },[token])


  return (
    <nav className='navbar'>
        <h1>SpeakSphere</h1>
        {token ==="" ? 
        <div className='container'>
            <button onClick={()=>changeState("logIn")}>Sign up</button>
            <button onClick={()=>changeState("SignUp")}>Login</button>
        </div> : 
        <div className='container'>
          <Link to="/contacts">MyContacts</Link>
          <Link to="/search">Researches</Link>
          <Link to="/allblogs">AllArticles</Link>
          <Link to="/article">new Article</Link>
          <Link to="/profil">MyProfil</Link>
          <button onClick={deconnexion}>log Out</button>
      </div>
        }
    </nav>
  )
}
