import React, { useState } from 'react';
import './ContactPrint.css';

export default function ContactPrint(props) {

  return (
    <div 
      className={`contact-box ${props.isActive ? 'active' : ''}`} 
      onClick={props.onClick}
    >
      <div className='box-image' style={{backgroundColor:props.color}}>
      </div>
      <span>{props.pseudo}</span>
    </div>
  );
}

