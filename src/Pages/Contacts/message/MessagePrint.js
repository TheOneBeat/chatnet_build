import React from 'react'
import './MessagePrint.css'

export default function MessagePrint(props) {

    function printDate(e)
    {
        //e c'est la date en isoDate... du message en question...
        let date = new Date(e);

        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0'); // les mois sont de 0 à 11, donc nous ajoutons 1
        let year = date.getFullYear();

        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');

        let formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
        return formattedDate;
    }
    const sms = props.sms;
  return (
    <div className='messageCard'>
      <div className='auth_img' style={{backgroundColor:sms.color}}></div>
      <div className='message_descript'>
        <div className='message_auth'>
            <span style={{color:sms.color}}>{sms.pseudo}</span>
            <span>{printDate(sms.timestamp)}</span>
        </div>
        <p className='txt'>{sms.content}</p>
      </div>
    </div>
  )
}
