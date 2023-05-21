import React, {useState,useContext,useRef} from 'react'
import "./Sign.css"
import { UserContext } from '../theContext';

export default function Login() 
{
    const {themeState,changeState} = useContext(UserContext);
    const [errorText,setErrorText] = useState('');

    const enterInputPseudo = useRef();
    const enterInputEmail = useRef();
    const enterInputPass = useRef();
    const enterInputPassTwo = useRef();
    const formRef = useRef();


    const handleForm = async(e)=>{
        e.preventDefault();
        if ((enterInputPass.current.value.length || enterInputPassTwo.current.value.length)<6)
        {
            console.log(enterInputPass.current.value)
            setErrorText("mots de passe < 6 ...")
            return
        }
        if (enterInputPass.current.value !== enterInputPassTwo.current.value)
        {
            console.log(enterInputPass.current.value)
            setErrorText(" mots de passe différents...")
            return
        }

        try
        {
            //await signUpFunc(enterInputEmail.current.value,enterInputPass.current.value)
            //appeler le fetch ici...
            const newUser={
                pseudo:enterInputPseudo.current.value,
                email:enterInputEmail.current.value,
                password:enterInputPass.current.value,
            }
            console.log(newUser)
            addUser(newUser);
        }
        catch(err)
        {
            setErrorText(err)
        }
        formRef.current.reset()
        setErrorText("")
    }

    const closeModal=()=>{
        setErrorText("");
        formRef.current.reset()
        changeState("close")
    }

    async function addUser(user) 
    {
       try{
        const envoi = await fetch("http://localhost:3001/users/add",{
        method:"POST",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify(user)
        });

        if (!envoi.ok)
            throw new Error("Fail to add user");

        const response = await envoi.json();
        console.log("user added successfully " + response);
       }
       catch(err)
       {
        console.error('Error adding user:', err);
       }
    }

      
  return (
    <>
      {themeState.logIn && 
      (<div className="modal-container">
        <div className="layout">
            <div className="modal-form">
                <form onSubmit={handleForm} ref={formRef} className='loginForm'>
                    <div className='title'>
                        <h3>Inscription</h3>
                        <button className='close' onClick={closeModal}>Close</button>
                    </div>
                    <label htmlFor="pseudo-in">pseudo</label>
                    <input type="text" ref={enterInputPseudo}
                     id='pseudo-in'/>
                    <label htmlFor="email-in">email</label>
                    <input type="email" ref={enterInputEmail}
                     id='email-in'/>
                    <label htmlFor="passwordfirst">password</label>
                    <input type="password" ref= {enterInputPass} id='passwordfirst' />
                    <label htmlFor="passwordscd">reenter your password</label>
                    <input type="password" ref={enterInputPassTwo} id='passwordscd'/>
                    <p>{errorText}</p>
                    <button className='send'>Envoyer</button>
                </form>
            </div>
        </div>

      </div>)
      }
    </>
  )
}
