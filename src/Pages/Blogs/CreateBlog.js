import React,{useRef,useState,useContext, useEffect} from 'react'
import { UserContext } from '../../theContext';
import "./CreateBlog.css"

export default function CreateBlog() 
{
    const formRef = useRef();
    const titleRef = useRef();
    const errorRef = useRef();
    const descriptionRef = useRef();
    const [Error,setError] = useState("");
    const {token} = useContext(UserContext);

    async function addArticle()
    {
        try
        {
            const envoi = await fetch(`http://localhost:3001/articles/addArticles`,{
            method:'POST',
            headers:{
                "Content-type":"application/json",
                Authorization: `Bearer ${token}`,
            },
            body:JSON.stringify({
                title:titleRef.current.value,
                description:descriptionRef.current.value,
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
        formRef.current.reset()
    }

    useEffect(() => {
        if (Error) {
          if(Error === "Post created successfully !!!"){
            errorRef.current.style.color='green';
          } else {
            errorRef.current.style.color='red';
          }
          const timeout = setTimeout(() => setError(""), 3000);
          return () => clearTimeout(timeout);
        }
      }, [Error]);
      

    const createArticle=()=>{
        if ((titleRef.current.value.length && descriptionRef.current.value.length)>0)
        {
            addArticle()
            setError("Post created successfully !!!")
        } else {
            
            setError("Both title and description are required !"); // Set error message when validation fails
        }
    }

  return (
    <div className='BlogContainer'>
        <form ref={formRef} onSubmit={handleFormArticle}>
            <div className='contenu'>
                <label htmlFor="titleInput">Post's title</label>
                <input type="text" ref={titleRef} id='titleInput'/>
            </div>

            <div className='contenu'>
                <label htmlFor="bodyInput">Post's body</label>
                <textarea type="text" ref={descriptionRef} id='bodyInput' cols={60} rows={15}/>
            </div>
            <button onClick={createArticle}>Save</button>
        </form>
       {Error && <p ref={errorRef}>{Error}</p>}
    </div>
  )
}
