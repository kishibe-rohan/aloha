import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

import axios from 'axios';

const Container = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`

const ImgContainer = styled.div`
    margin-right: 10px;
    position: relative;
`

const ProfileImg = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
`

const OnlineIcon = styled.span`
width: 12px;
height: 12px;
border-radius: 50%;
background-color: limegreen;
position: absolute;
top: -2px;
right: 0;
border: 2px solid white;
`

const ProfileUsername = styled.span`
font-weight: 500;
color:white;
`

const Online = ({user}) => {
  //console.log(user);

  const [friend,setFriend] = useState({});
  useEffect(() => {
    const getProfile = async() => {
        const res = await axios.get(`/users?userId=${user}`)
        console.log(res);
        setFriend(res.data);
    }

    getProfile();
  },[user])

  return (
    <Container>
        <ImgContainer>
        <ProfileImg src={friend?.profilePicture? friend.profilePicture:"../assets/profile.png"}/>
        <OnlineIcon/>
        </ImgContainer>
        <ProfileUsername>
            {friend?.username}
        </ProfileUsername>
    </Container>
  )
}

export default Online
