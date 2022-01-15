import {useState,useEffect} from 'react'
import axios from 'axios'

import styled from 'styled-components'

const Container = styled.div`

  ` 

const OnlineChatFriend = styled.div`
display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  `

const OnlineChatImgContainer = styled.div` position: relative;
margin-right: 10px;`

const OnlineChatImg = styled.img`  
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
border: 1px solid white;`

const OnlineChatBadge = styled.div` width: 10px;
height: 10px;
border-radius: 50%;
background-color: limegreen;
position: absolute;
top: 2px;
right: 2px;` 

const OnlineChatName = styled.span`
color:white;
`

export default function OnlineChat ({ onlineUsers, currentId, setCurrentChat }) {
   const [friends,setFriends] = useState([]);
   const [onlineFriends,setOnlineFriends] = useState([]);

   useEffect(() => {
       const getFriends = async() => {
           const res = await axios.get(`/users/followers/${currentId}`)
           setFriends(res.data)
       }

       getFriends();
   },[currentId])

   useEffect(() => {
       setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))
      // console.log(onlineFriends);
   },[friends,onlineUsers])

   const handleClick = async(user) => {
       try{
           const res = await axios.get(`/conversation/find/${currentId}/${user._id}`)
           setCurrentChat(res.data)
       }catch(err)
       {
           console.log(err)
       }
   }

   return(
       <Container>
        {onlineFriends.map((o) => (
            <OnlineChatFriend onClick={() => handleClick(o)}>
            <OnlineChatImgContainer>
                <OnlineChatImg src={o.profilePicture}/>
                <OnlineChatBadge/>
            </OnlineChatImgContainer>
            <OnlineChatName>{o?.username}</OnlineChatName>
            </OnlineChatFriend>
        ))}
       </Container>
   )
}