import React from 'react'
import "./Card.css"
import { Link } from 'react-router-dom';

export default function Card(props) 
{
  async function eraseArticle()
  {
    try
    {
      const response = await fetch(`http://localhost:3001/articles/deletePost/${props.id}`,{
      method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });
           // Vérifiez la réponse
           if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }  
          else
          {
            props.onRemove(props.id)
          }
    }
    catch(err)
    {
      console.error("the error : " + err) 
    }
  }
  return (
    <div className='Card'>
      <h2>{props.title}</h2>
            <div className="links">
            <Link to="/Read" state={props.items}>Read/modify the post</Link>
              <button onClick={eraseArticle}>Erase the post</button>
            </div>
    </div>
  )
}
