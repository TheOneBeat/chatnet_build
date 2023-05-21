import React,{useState,useRef,useContext, useEffect} from 'react';
import { UserContext } from '../../theContext';
import "../Blogs/CreateBlog.css";
import {useLocation} from 'react-router-dom';

export default function Read() 
{
    const location = useLocation();

    const [stateInput,setStateInput]=useState(location.state.title);
    const [stateDescription,setStateDescription]=useState(location.state.description);
    
    const [Error,setError] = useState("");
    const {token} = useContext(UserContext);

    const errorRef = useRef("");

    async function modifyArticle_aux()
    {
        try
        {
            const envoi = await fetch(`http://localhost:3001/articles/modify/${location.state._id}`,{
            method:'PUT',
            // credentials: 'include', // Important pour inclure les cookies
            headers:{
                "Content-type":"application/json",
                Authorization: `Bearer ${token}`,
            },
            body:JSON.stringify({
                title:stateInput,
                description:stateDescription,
            })
        })

            if (!envoi.ok)
            {
                throw new Error("Erreur lors de la requête")
            }
            const data = await envoi.json();
            console.log(data)
        }
        catch(err)
        {
            console.error("Erreur :" + err)
        }
    }

    const handleFormArticle=(e)=>
    {
        e.preventDefault();
    }

    useEffect(() => {
        if (Error) {
          if(Error === "Post modified successfully !!!"){
            errorRef.current.style.color='green';
          } else {
            errorRef.current.style.color='red';
          }
          const timeout = setTimeout(() => setError(""), 3000);
          return () => clearTimeout(timeout);
        }
      }, [Error]);
      

    const modifyArticle=()=>{
        if ((stateInput.length && stateDescription.length)>0)
        {
          modifyArticle_aux()
          setError("Post modified successfully !!!")
        } else {
            
            setError("Both title and description are required !"); // Set error message when validation fails
        }
    }

  return (
    <div className='BlogContainer'>
        <form onSubmit={handleFormArticle}>
            <div className='contenu'>
                <label htmlFor="titleInput">Post's title</label>
                <input type="text" id='titleInput' onChange={e=>setStateInput(e.currentTarget.value)} value={stateInput}/>
            </div>

            <div className='contenu'>
                <label htmlFor="bodyInput">Post's body</label>
                <textarea type="text" id='bodyInput' cols={60} rows={15}  onChange={e=>setStateDescription(e.currentTarget.value)} value={stateDescription}/>
            </div>
            <button onClick={modifyArticle}>Modify</button>
        </form>
       {Error && <p ref={errorRef}>{Error}</p>}
    </div>
  )
}
