import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router'

import {Navbar,Sidebar,Feed,Rightbar} from '../components'
import styled from 'styled-components'

const Container = styled.div`
display:flex;
`

const ProfileRight = styled.div`
flex:9;
`

const ProfileRightTop = styled.div``

const ProfileCover = styled.div`
height:320px;
position:relative;
`

const ProfileCoverImg = styled.img`
width: 100%;
height: 250px;
object-fit: cover;
`

const ProfileImg = styled.img`
width:150px;
height:150px;
border-radius:50%;
object-fit:cover;
position:absolute;
left: 0;
    right: 0;
    margin: auto;
    top: 150px;
    border: 3px solid white;
`

const ProfileInfo = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const ProfileInfoName = styled.span`
font-size: 24px;
`

const ProfileInfoBio = styled.span`
font-weight: 300;
`

const ProfileRightBottom = styled.div`
display:flex;
`


const Profile = () => {
  return (
   <>
   <Navbar/>
   <Container>
       <Sidebar/>
       <ProfileRight>
           <ProfileRightTop>
               <ProfileCover>
                   <ProfileCoverImg src="https://wallpapercave.com/wp/O0rSWxg.jpg" />
                   <ProfileImg src="https://i.pinimg.com/originals/05/d7/76/05d77621c5371ed2b6bdba84091927dc.png" />
               </ProfileCover>
               <ProfileInfo>
                   <ProfileInfoName>Shinya Kogami</ProfileInfoName>
                   <ProfileInfoBio>Bimbo E-boy</ProfileInfoBio>
               </ProfileInfo>
           </ProfileRightTop>
           <ProfileRightBottom>
               <Feed />
               <Rightbar />
           </ProfileRightBottom>
       </ProfileRight>
   </Container>
   </>
  )
}

export default Profile
