import {useState,useEffect} from 'react'
import axios from 'axios'

import styled from 'styled-components'

const Container = styled.div`
display:flex;
align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;

  :hover{
      background-color:rgb(245,243,243,0.68)
  }
 `

const ConversationImg = styled.img` 
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
margin-right: 20px;
`

const ConversationName = styled.span` 
font-weight: 500;
`

export default function Conversation({conversation,currentUser}){
    const [user,setUser] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id)

        const getUser = async() => {
            try{
                const res = await axios.get(`/users?userId=${friendId}`)
                setUser(res.data)

            }catch(err)
            {
                console.log(err)
            }
        }

        getUser();
    },[currentUser,conversation])

    return(
        <Container>
            <ConversationImg src={user?.profilePicture} alt=""/>
            <ConversationName>{user?.username}</ConversationName>
        </Container>
    )
}
