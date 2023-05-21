import React, { useEffect,useContext} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import "./AllBlogs.css"
import Card from '../../Components/Card/Card'
import {v4 as uuidv4} from "uuid";
import { allArticlesLoad } from "../../Reducers/articleReducer";
import {UserContext} from '../../theContext'

export default function AllBlogs() 
{
  const {tab} = useSelector(state=>({
    ...state.ArticleReducer,
  }))

  const dispatch = useDispatch();
  const { token,setColorState } = useContext(UserContext);

  async function loadUserColor()
  {
    try
    {
      const envoi = await fetch(`http://localhost:3001/users/getUserColor`,{
      method:'GET',
      headers:{
        'Content-type':'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then(data=>data.json())
    .then(response=>setColorState(response))
    }catch(err)
    {
      console.error(err)
    }
  }

  useEffect(()=>{
    if (tab.length===0 || token)
      dispatch(allArticlesLoad())
  },[token])//[dispatch]

  useEffect(()=>{
    loadUserColor()
  },[])

  return (
    <div className='CardsContainer'>
    {Array.isArray(tab) && tab.map(item =>
      {
        return(
          <Card items={item} title={item.title} body={item.description} key={uuidv4()} onRemove={e=>dispatch(allArticlesLoad())} id={item._id}/>
        )})
    }
  </div>
    )
}