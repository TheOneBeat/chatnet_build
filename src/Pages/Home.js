import React from 'react'
import SignIn from './Login'
import SignUp from './SignUp'

export default function Home() {
  return (
    <>
        <h1 style={{fontSize:"30px",textAlign:"center",color:"white",marginTop:"20px"}}>Hi Log In or Sign Up</h1>
        <SignIn/>
        <SignUp/>
    </>
  )
}
