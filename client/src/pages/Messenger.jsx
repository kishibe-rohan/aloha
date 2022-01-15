import {useContext,useState,useEffect,useRef} from 'react'
import Navbar from '../components/Navbar.jsx'
import Conversation from '../components/Conversation.jsx'
import Message from '../components/Message.jsx'
import OnlineChat from '../components/OnlineChat.jsx'

import axios from 'axios'
import {AuthContext} from '../context/AuthContext'
import {io} from "socket.io-client"

import styled from 'styled-components'

const Container = styled.div` 
display:flex;
background-color:#16161d;
color:white;
height:100vh;
`

const ChatMenu = styled.div` 
flex:3.5;`

const ChatMenuWrapper = styled.div`
padding: 10px;
height: 100%;
-webkit-box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
`

const ChatMenuInput = styled.input`
width:100%;
padding:10px 0;
border:none;
border-bottom:1px solid white;
`


const ChatBox = styled.div` 
flex:5.5
`

const ChatBoxWrapper = styled.div` 
padding: 10px;
height: 95%;
display:flex;
flex-direction: column;
  justify-content: space-between;
  position: relative;
  
`

const ChatBoxTop = styled.div`
height:100%;
overflow-y:scroll;
padding-right:10px;
`

const ChatBoxBottom = styled.div`
margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ChatMessageInput = styled.textarea`
width:80%;
height:90px;
padding:10px;
border-radius:20px;
`

const ChatSubmitButton = styled.button`
width:70px;
height:40px;
border:none;
border-radius:5px;
cursor:pointer;
background-color:#1775ee;
color:white;
`

const NoConversationText = styled.span`
position:absolute;
top:10%;
font-size:50px;
color: rgb(224,220,220);
cursor:default;
`

const ChatOnline = styled.div`
flex:3;
`
const ChatOnlineWrapper = styled.div` 
padding: 10px;
height: 100%;
-webkit-box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
`

export default function Messenger()
{
    const [conversations,setConversations] = useState([]);
    const [currentChat,setCurrentChat] = useState(null);
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("");
    const [arrivalMessage,setArrivalMessage] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    
    const {user} = useContext(AuthContext);

    const socket = useRef();
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:9000");
        socket.current.on("getMessage",(data) => {
            setArrivalMessage({
                sender:data.senderId,
                text:data.text,
                createdAt: Date.now()
            })
        })
    },[])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
        setMessages((prev) => [...prev,arrivalMessage])
    },[arrivalMessage,currentChat])

    useEffect(() => {
        socket.current.emit("addUser",user._id);
        socket.current.on("getUsers",(users) => {
            setOnlineUsers(
                user.followings.filter((f) => users.some((u) => u.userId === f))
            )
        })
    },[user])

    useEffect(() => {
      const getConversations = async() => {
          try{
              const res = await axios.get(`/conversation/${user._id}`)
              setConversations(res.data)
          }catch(err)
          {
              console.log(err)
          }
      }

      getConversations();
    },[user._id])

    useEffect(() => {
        const getMessages = async() => {
           try{
               const res = await axios.get(`/message/${currentChat?._id}`)
               setMessages(res.data);
           }catch(err)
           {
               console.log(err)
           }
    }
       getMessages();
    },[currentChat])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const message = {
            sender:user._id,
            text:newMessage,
            conversationId:currentChat._id
        }

        const receiverId = currentChat.members.find((member) => member !== user._id)

        socket.current.emit("sendMessage",{
            senderId:user._id,
            receiverId,
            text:newMessage
        })

        try{
            const res = await axios.post('/message',message);
            setMessages([...messages,res.data]);
            setNewMessage("");
        }catch(err)
        {
            console.log(err)
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    return(
        <>
       <Navbar/>
       <Container>
           <ChatMenu>
               <ChatMenuWrapper>
                   <ChatMenuInput placeholder="Search for friends"/>
                   {
                       conversations.map((c) => (
                           <div onClick={() => setCurrentChat(c)}>
                              <Conversation conversation={c} currentUser={user}/>
                           </div>
                       ))
                   }
               </ChatMenuWrapper>
           </ChatMenu>
           <ChatBox>
               <ChatBoxWrapper>
                   {
                       currentChat?(
                           <>
                           <ChatBoxTop>
                               {messages.map((m) => (
                                   <div ref={scrollRef}>
                                       <Message message={m} own={m.sender === user._id}/>
                                   </div>
                               ))}
                           </ChatBoxTop>
                           <ChatBoxBottom>
                               <ChatMessageInput placeholder="Write a message..." onChange={(e) => setNewMessage(e.target.value)} value={newMessage}/>
                               <ChatSubmitButton onClick={handleSubmit}>Send</ChatSubmitButton>
                           </ChatBoxBottom>
                           </>
                       ):(
                           <NoConversationText>
                               Open a conversation to start a chat
                           </NoConversationText>
                       )
                   }
               </ChatBoxWrapper>
           </ChatBox>
           <ChatOnline>
               <ChatOnlineWrapper>
                   <OnlineChat onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
               </ChatOnlineWrapper>
           </ChatOnline>
       </Container>
        </>
    )
}