import React,{useState, useEffect, useRef} from 'react'
import ProfilPrint from '../Recherche/ProfilResearch/ProfilResearch';
import './Researches.css'
import {v4 as uuidv4} from 'uuid';

export default function Recherche() 
{
  const [contactTab, setContactTab] = useState([]);
  const [inputState, setInPutState] = useState("");

  const inputRef = useRef();

  const handleForm=(e)=>{
    e.preventDefault();
  }

  async function searchUser()
  {
    try
    {
      await fetch('http://localhost:3001/contacts',{
        method:'GET',
        headers:{
          'Content-type':'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then(data=>data.json())
      .then(response=>{
        console.log(response);
        setContactTab(response);
      })
    }
    catch(err)
    {
      console.error("the error : " + err)
    }
  } 

  async function searchUserOnInput()
  {
    try
    {
      fetch(`http://localhost:3001/contacts/${inputRef.current.value.trim()}`,{
        method:'GET',
        headers:
        {
          'Content-type':'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
      })
      .then(data=>data.json())
      .then(response=>{console.log(response);setContactTab(response)})
    }
    catch(err)
    {
      console.error("the error : " + err)
    }
  } 

  useEffect(()=>{
    searchUser()
  },[])

  useEffect(()=>{
    searchUserOnInput()
  },[inputState])

  return (
    <div className='ProfilContainer'>
      <form onSubmit={handleForm}>
        <input ref={inputRef} type="text" placeholder='Rechercher...' value={inputState} onInput={e=>setInPutState(e.currentTarget.value)} />
      </form>
      <section className='Profil-slides'>
        {contactTab.map(el=>{
          return (
            <ProfilPrint name={el.name==="" ? "No Name" : el.name} firstName={el.firstName==="" ? "No first Name" : el.firstName} location={el.location==="" ? "No location" : el.location} pseudo={el.pseudo} biography={el.bio==="" ? "No biography" : el.bio.length > 112 ? el.bio.substring(0,112)+"...":el.bio} isPending={el.hasFriendRequest ? true : false} key={uuidv4()} values={el._id} color={el.color}/>
          )
        })}
      </section>
    </div>
  )
}
