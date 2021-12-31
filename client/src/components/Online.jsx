import React from 'react'
import styled from 'styled-components'

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
  console.log(user);
  return (
    <Container>
        <ImgContainer>
        <ProfileImg src={user.profilePicture}/>
        <OnlineIcon/>
        </ImgContainer>
        <ProfileUsername>
            {user.username}
        </ProfileUsername>
    </Container>
  )
}

export default Online
