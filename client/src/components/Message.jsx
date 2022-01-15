import { useContext,useState,useEffect } from 'react'
import {format} from 'timeago.js'
import styled from 'styled-components'


import axios from 'axios'
import {AuthContext} from '../context/AuthContext'

const MessageSent = styled.div`
display: flex;
flex-direction: column;
margin-top: 20px;
align-items:flex-end;
` 

const MessageReceived = styled.div`
display: flex;
flex-direction: column;
margin-top: 20px;
`

const MessageTop = styled.div`
display:flex;
`

const MessageImg = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;
margin-right: 10px;
` 

const MessageText = styled.p`
padding:10px;
border-radius:20px;
background-color:#1775ee;
color:white;
max-width:300px;
`

const MessageSentText = styled.p`
padding:10px;
border-radius:20px;
background-color:tomato;
color:white;
max-width:300px;
`

const MessageBottom = styled.div`
font-size: 12px;
margin-top: 10px;
`



export default function Message({message,own}){
    const [receiver,setReceiver] = useState(null);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const getReceiver = async() => {
            const {data} = await axios.get(`/conversation/members/${message.conversationId}`)
           // console.log(data);
            const notUser = data.filter((r) => r._id !== user._id)
            setReceiver(notUser[0])
        }

        getReceiver();
        
       
    },[message.conversationId])

    const MessageFriend = () => {
        return(
            <MessageReceived>
                <MessageTop>
                    <MessageImg src={receiver?.profilePicture}/>
                    <MessageText>{message.text}</MessageText>
                </MessageTop>
                <MessageBottom>
                    {format(message.createdAt)}
                </MessageBottom>
            </MessageReceived>
        )
    }

    const MessageSelf = () => {
        return(
            <MessageSent>
                <MessageTop>
                    <MessageImg src={user?.profilePicture}/>
                    <MessageSentText>{message.text}</MessageSentText>
                </MessageTop>
                <MessageBottom>
                    {format(message.createdAt)}
                </MessageBottom>
            </MessageSent>
        )
    }
    


    return(
        <>
        {
            own?(
                <MessageSelf/>
            ):(
                <MessageFriend/>
            )
        }
        </>   
    )
}