import React, {useContext,useRef,useState} from 'react'
import "./Sign.css"
import { UserContext } from '../theContext';

export default function SignUp() 
{
    const {themeState,changeState,changeToken} = useContext(UserContext);
    const [errorText,setErrorText] = useState('');
    const formRef = useRef();

    const EmailRef = useRef();
    const PasswordRef = useRef();

    const handleForm = e=>{
        e.preventDefault();
        verifyIdentity();
    }

    async function verifyIdentity()
    {
        try{
          const envoi = await fetch("http://localhost:3001/users/authlogin",{
          method:"POST",
          
          headers:{
            "content-type":"application/json",
          },
          body:JSON.stringify({email:EmailRef.current.value,password:PasswordRef.current.value})
        });

        if (!envoi.ok)
        {
          setErrorText("Fail to authenticate user");
          throw new Error("Fail to authenticate user");
        }
        else 
          setErrorText("Token get successfully !");
        
        const response = await envoi.json();
        //Pour se connecter
        
        changeToken(response.token);        
        //Pour rester connecté quand on s'est connecté pour la première fois
        sessionStorage.setItem("token",response.token);
        // Cookies.set("token", response.token);
        console.log("user authenticated successfully " + response.token);

        }catch(err)
        {
          console.error("Error authenticating user:", err);
        }
    }

    const closeModal=()=>
    {
      setErrorText("");
      formRef.current.reset()
      changeState("close")
    }

  return (
    <>
      {themeState.SignUp && 
      (<div className="modal-container">
        <div className="layout">
            <div className="modal-form">
                <form onSubmit={handleForm} ref={formRef}  className='loginForm'>
                    <div className='title'>
                        <h3>Connexion</h3>
                        <button className='close' onClick={closeModal}>Close</button>
                    </div>
                    <label htmlFor="email-in">email</label>
                    <input type="text" id='email-in' ref={EmailRef}/>
                    <label htmlFor="passwordfirst">password</label>
                    <input type="password" id='passwordfirst' ref={PasswordRef} />
                    <p className='error'>{errorText}</p>
                    <button className='send'>Envoyer</button>
                </form>
            </div>
        </div>

      </div>)
      }
    </>
  )
}
