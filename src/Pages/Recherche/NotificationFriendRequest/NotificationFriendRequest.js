import React,{useState, useEffect, useRef} from 'react'
import ProfilNotif from '../profilNotification/ProfilNotification';
import '../Researches.css'
import {v4 as uuidv4} from 'uuid';

export default function NotificationFriendRequest() 
{
  const [notifyTab, setnotifyTab] = useState([]);
  const [inputStateNotif, setInPutStateNotif] = useState("");

  const inputRef = useRef();

  const handleForm=(e)=>{
    e.preventDefault();
  }

  async function searchUsers()
  {
    try
    {
      fetch('http://localhost:3001/notifications/allNotif',{
        method:'GET',
        headers:{
          'Content-type':'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then(data=>data.json())
      .then(response=>{
        if (response.length>0)
        {
          setnotifyTab(response)
        }
      })
    }
    catch(err)
    {
      console.error("the error : " + err)
    }
  } 

  async function searchUserOnInputNotify()
  {
    try
    {
      fetch(`http://localhost:3001/notifications/allNotif/${inputRef.current.value.trim()}`,{
        method:'GET',
        headers:
        {
          'Content-type':'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
      })
      .then(data=>data.json())
      .then(response=>{
        if (response.length>0)
        {
          setnotifyTab(response)
        }
})
    }
    catch(err)
    {
      console.error("the error : " + err)
    }
  } 

  useEffect(()=>{
    searchUsers()
  },[])

  useEffect(()=>{
    searchUserOnInputNotify()
  },[inputStateNotif])


  return (
    <div className='ProfilContainer'>
      <form onSubmit={handleForm}>
        <input ref={inputRef} type="text" placeholder='Rechercher...' value={inputStateNotif} onInput={e=>setInPutStateNotif(e.currentTarget.value)}/>
      </form>
      <section className='Profil-slides'>
        {notifyTab.length!==0 ? notifyTab.map(el=>{
          return (
            <ProfilNotif name={el.name==="" ? "No Name" : el.name} firstName={el.firstName==="" ? "No first Name" : el.firstName} location={el.location==="" ? "No location" : el.location} pseudo={el.pseudo} biography={el.bio==="" ? "No biography" : el.bio.length > 112 ? el.bio.substring(0,112)+"...":el.bio} key={uuidv4()} values={el._id}
            onRemove={id=>{setnotifyTab(notifyTab.filter(notif=>notif._id !== id))}}/>
          )
        }): <h1 style={{color:'white',padding:'10px',fontSize:'2rem'}}>there is no notifications</h1>}
      </section>
    </div>
  )
}
