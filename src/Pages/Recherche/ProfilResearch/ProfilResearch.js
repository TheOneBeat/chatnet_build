import React,{useState} from 'react'
import './ProfilResearch.css'

export default function ProfilResearch(props) 
{
  const [pending,setPending] = useState(props.isPending);
    async function sendNotification() {
        try {
          const response = await fetch('http://localhost:3001/contacts/friendRequest', {
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
          // Vous pouvez utiliser la réponse ici si nécessaire...
      
        } catch (err) {
          console.error("the error : " + err)
        }
        setPending(true);
      }
      
  return (
    <div className='Profil-box'>
        <div className='profil-contenu'>
            <div className="part-pseudo">
                <div className="img" style={{backgroundColor:`${props.color}`}}></div>
                <span>{props.pseudo}</span>
            </div>
            <div className="biography">
                <div className="fst-biography">
                    <span>Name : {props.name}</span>
                    <span>FirstName : {props.firstName}</span>
                    <span>Location : {props.location}</span>
                    {/* <span>id: {typeof props.values}</span> */}
                </div>
                <p className="scd-biography">{props.biography}</p>
            </div>
        </div>
        <button disabled={pending} onClick={sendNotification}>Envoyer</button>
    </div>
  )
}
