import React from 'react'
import '../ProfilResearch/ProfilResearch.css'

export default function ProfilNotification(props) 
{
    async function AcceptRequest() {
        try {
          const response = await fetch('http://localhost:3001/contacts/newContact', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({ id: props.values })
          });
      
          // Vérifiez la réponse
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          else
          {
            props.onRemove(props.values)
          }

          // Vous pouvez utiliser la réponse ici si nécessaire...
      
        } catch (err) {
          console.error("the error : " + err)
        }
        // setPending(true);

      }

      async function RefuseRequest() 
      {
        try {
          const response = await fetch(`http://localhost:3001/notifications/supp/${props.values}`, {
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
            props.onRemove(props.values)
          }    
        } catch (err) {
          console.error("the error : " + err)
        }
      }
      
  return (
    <div className='Profil-box'>
        <div className='profil-contenu'>
            <div className="part-pseudo">
                <div className="img"></div>
                <span>{props.pseudo}</span>
            </div>
            <div className="biography">
                <div className="fst-biography">
                    <span>Name:{props.name}</span>
                    <span>FirstName:{props.firstName}</span>
                    <span>Location:{props.location}</span>
                    {/* <span>id: {typeof props.values}</span> */}
                </div>
                <p className="scd-biography">{props.biography}</p>
            </div>
        </div>
        <button onClick={AcceptRequest} style={{left:'15%'}}>Accepter</button>
        <button onClick={RefuseRequest}>Refuser</button>
    </div>
  )
}
