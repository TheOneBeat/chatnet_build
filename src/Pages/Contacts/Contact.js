import React,{useState,useRef, useEffect,useContext,useCallback} from 'react'
import './Contact.css'
import MessagePrint from './message/MessagePrint';
import { UserContext } from '../../theContext';
import ContactPrint from './contactPrint/ContactPrint';
export default function Contact() 
{

  const {token,socket,colorState} = useContext(UserContext);

  const [stateInput, setInputState] = useState("");
  const textareaRef = useRef(null);
  const formRef = useRef();
  const [stateAllContacts,setstateAllContacts] = useState([]);
  const [stateUser,setStateUser] = useState("");
  const [receiverIdState,setReceiverIdState] = useState("");
  const [allMessagesState,setAllMessagesState] = useState([]);
  const [pseudoState,setPseudoState] = useState("");
  const [isActiveComponent,setIsActiveComponent] = useState("");

  const handleFormOne=(e)=>
  {
    e.preventDefault();
  }

  const handleForm=(e)=>
  {
    e.preventDefault();
    socket.emit('sendMessage', {
      senderId: `${stateUser}`,
      receiverId: `${receiverIdState}`,
      message: `${stateInput}`,
      theColor:colorState,
      thePseudo:pseudoState,
    });
    console.log("message envoyé "+ stateInput);
    setInputState("")
  }
const contacts=useCallback(async ()=>{
  try{
    const envoi = await fetch('http://localhost:3001/contacts/allMyContacts',
    {
        method:'GET',
        headers:{
            "Content-type":"application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    })
    const data = await envoi.json();
    setstateAllContacts(data);
  }
  catch(err)
  {
    console.error("l'erreur est depuis le côté client : "+ err)
  }
})

  const getUserId=useCallback(async ()=>
  {
    try
        {
            await fetch('http://localhost:3001/users/getUser',{
                method:'GET',
                headers:{
                    "Content-type":"application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then(data=>data.json())
            .then(response=>{
              // console.log(response);
              setStateUser(response._id);
              setPseudoState(response.pseudo);
            })
        }
        catch(err)
        {
            console.error(err)
        }
  })

  const loadAllMessages = useCallback(async ()=>{
    try{
      await fetch(`http://localhost:3001/messages/message-history/${stateUser}/${receiverIdState}`,{
        method:'GET',
        headers:{
          'Content-type':'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      .then(data=>data.json())
      .then(response=>{console.log(response);setAllMessagesState(response)})
    }
    catch(err)
    {
      console.error(err)
    }
  })


    useEffect(()=>{
      contacts()
      getUserId()
    },[contacts,getUserId])

    useEffect(()=>{
      loadAllMessages()
    },[receiverIdState])
  
    function clickProfil(e)
    {
      setReceiverIdState(e)
      socket.emit('joinRoom', {
        senderId: `${stateUser}`,
        receiverId: e
      });
      console.log("l'id du profil est "+ e)
      setIsActiveComponent(e)
    }

    useEffect(() => {
      socket.on('receiveMessage', ({ senderId, message }) => {
        // Ajout du code pour gérer le message reçu ici
        console.log("le message reçu est "+message);
        loadAllMessages();
      });
    
      // On se désabonne de l'événement lorsque le composant est démonté
      return () => {
        socket.off('receiveMessage');
      };
    }, [socket,loadAllMessages]);

    useEffect(()=>{
      if (textareaRef.current !==null)
      {
        textareaRef.current.style.height='auto';
        textareaRef.current.style.height=`${textareaRef.current.scrollHeight}px`;
      }
    },[stateInput])

  return (
    <div className='contactContainer'>
      <section className='section-contact'>
        <form onSubmit={handleFormOne}>
          <input type="text" placeholder='Recherche...' />
          <div className='
          allContacts'>
            {stateAllContacts.map(item=>{
              return(
                <ContactPrint pseudo={item.pseudo} key={item._id} onClick={()=>clickProfil(item._id)} color={item.color} isActive={item._id===isActiveComponent}/>
              )})
          } 
          </div>
        </form>
      </section>
      {stateAllContacts.map(item=>{
        return (
          <section className={item._id===receiverIdState ? "messages active" :"messages"} key={item._id}>
            <div className='allMessagesContainer'>
              <div className='allMessages'>
                {allMessagesState.map(message=>{
                  return (<MessagePrint key={message._id} sms={message}/>)
                })}
              </div>
            </div>
            <form onSubmit={handleForm} ref={formRef}>
              <textarea ref={textareaRef} value={stateInput} onChange={e=>setInputState(e.currentTarget.value)} placeholder='Message...'
              onKeyDown={e=>{
                if (e.key==='Enter' && !e.shiftKey)
                {
                  handleForm(e)
                }
              }}
              />
            </form>
      </section>
        )
      })}
    </div>
  )
}
