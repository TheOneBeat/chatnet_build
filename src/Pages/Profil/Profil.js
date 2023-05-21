import React,{useState,useEffect,useContext} from 'react'
import { UserContext } from '../../theContext';
import './Profil.css'

export default function Profil()
{
    const [nameState,setNameState] = useState("");
    const [firstNameState,setFirstNameState] = useState("")
    const [locationState,setLocationState] = useState("");
    const [professionState,setProfessionState] = useState("");
    const [hobbiesState,setHobbiesState] = useState("");
    const [birthDateState,setBirthDateState] = useState("")
    const [bioState,setBioState] = useState("");
    const {token,colorState,setColorState} = useContext(UserContext);
    // const [fileState,setFileState] = useState('');
    // const [imgURL, setImgURL] = useState('');


    // const handleChange=e=>{
    //     console.log(e.target.files[0])
    //     setFileState(e.target.files[0])
    //     if (e.target.files[0].name!=="")
    //         setImgURL(URL.createObjectURL(e.target.files[0]));
    // }

    async function changeMessageColor()
    {
        try
        {
            await fetch('http://localhost:3001/messages/modifyColor',
            {
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body:JSON.stringify({newColor:colorState})
            })
            .then(data=>data.json())
            .then(response=>console.log(response))
        }
        catch(err)
        {
            console.error(err);
        }
    }


    async function loadUser()
    {
        try
        {
            await fetch('http://localhost:3001/users/getUser',{
                method:'GET',
                headers:{
                    "Content-type":"application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(data=>data.json())
            .then(response=>{
                setNameState(response.name)
                setBioState(response.bio)
                setFirstNameState(response.firstName)
                setProfessionState(response.profession)
                setLocationState(response.location)
                setHobbiesState(response.hobbies)
                // setFileState("http://localhost:3001/"+response.profilPicture);
                const date = new Date(response.birthDay);
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                setBirthDateState(formattedDate);
                // setImgURL(fileState);
            })
        }
        catch(err)
        {
            console.error(err)
        }
    }

    // async function loadImg()
    // {
    //     if (fileState!=="")
    //     {
    //         try{
    //             await fetch(`${fileState}`)
    //             .then(response=>response.blob())
    //             .then(image=>{console.log(image);setImgURL(URL.createObjectURL(image))});
   
    //         }
    //         catch(err)
    //         {
    //             console.error(err)
    //         }
    //      }
    // }

    useEffect(()=>{
        loadUser();
    },[])

    // useEffect(()=>{
    //     loadImg();
    // },[fileState])//[fileState]
    
    
    const modifyProfil=()=>
    {
        const obj = {
            name:nameState,
            firstName:firstNameState,
            location:locationState,
            profession:professionState,
            hobbies:hobbiesState,
            bio:bioState,
            birthDay:birthDateState,
            color:colorState,
        }
        try
        {
            changeMessageColor();
            fetch(`http://localhost:3001/users/modify/profil`,{
                method:'PUT',
                headers:{
                    "Content-type":"application/json",
                    Authorization: `Bearer ${token}`,
                },
                body:JSON.stringify(obj)
            })
        }
        catch(err)
        {
            console.error(err)
        }
    }
    const handleForm = async (e)=>
    {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('image',fileState);
        // try
        // {
        //     await fetch(`http://localhost:3001/images/profilPicture`,{
        //         method:'POST',
        //         headers:{
        //             'Authorization': `Bearer ${token}`,
        //         },
        //         body:formData
        //     })
        //     .then(data=>data.json())
        //     .then(response=>console.log(response))
        //     .catch(err=> console.error(err))
        // }
        // catch(err)
        // {
        //     console.error(err)
        // }
    }

    const getRandomColor=()=>
    {
        let letters = "01234567891BCDEF";
        let color = "#"
        for(let i = 0; i < 6; i++)
        {
            color += letters[Math.floor(Math.random()*16)];
        }
        setColorState(color);
    }

    // eslint-disable-next-line no-lone-blocks
    {/*fileState!==''? {backgroundImage:`url(${imgURL})`,backgroundSize:'cover',backgroundPosition:'center'}: */}
  return (
    <div className='MyProfilContainer'>
        <h1>Your profil</h1>
        <p>Be irresistible! Complete your profile and showcase your personality to everyone. Don't miss out on this opportunity.</p>
        <form onSubmit={handleForm} enctype='multipart/form-data'>
            <div className='initInfo'>
                <div className='profil-img'>
                    <div className='img' style={{backgroundColor:colorState}}></div>
                    {/* <input type="file" onChange={handleChange} name='image'/> */}
                    <button onClick={getRandomColor}>Change Color</button>
                </div>
                <div className='personalInfo'>
                    <div className='Info Name'>
                        <div>
                            <label htmlFor="your_name">name</label>
                            <input type="text" placeholder='your name' id="your_name" value={nameState} onChange={e=>setNameState(e.target.value)}/>
                        </div>
                    <div>
                            <label htmlFor="your_fstName">firstName</label>
                            <input type="text" placeholder='your first Name' id='your_fstName' value={firstNameState} onChange={e=>setFirstNameState(e.target.value)}/>    
                        </div>                
                    </div>
                    <div className='Info Location'>
                        <div>
                            <label htmlFor="your_location">Location</label>
                            <input type="text" placeholder='your location' id='your_location' value={locationState} onChange={e=>setLocationState(e.target.value)}/>    
                        </div>
                        <div>
                            <label htmlFor="your_birth">BirthDate</label>
                            <input type="date" id='your_birth' value={birthDateState} onChange={e=>setBirthDateState(e.target.value)}/>
                        </div>
                    </div>

                    <div className='Info Profession'>
                        <div>
                            <label htmlFor="your_profession">Profession</label>
                            <input type="text" placeholder='your profession' id='your_profession' value={professionState} onChange={e=>setProfessionState(e.target.value)}/>    
                        </div>
                        <div>
                            <label htmlFor="your_hobbies">Hobbies</label>
                            <input type="text" placeholder='your hobbies' id='your_hobbies' onChange={e=>setHobbiesState(e.target.value)} value={hobbiesState}/>
                        </div>
                    </div>
                    <div className='mainInfo'>
                        <label htmlFor="bio">Biography</label>
                        <textarea name="your_biography" id="bio" onChange={e=>setBioState(e.target.value)} value={bioState}></textarea>
                    </div>
                </div>
            </div>
            <button onClick={modifyProfil}>Modifier</button>
        </form>
        {/* {Error && <span></span>} */}
    </div>
  )
}
