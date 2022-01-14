import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router'
import axios from 'axios';

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

    const [user,setUser] = useState({});
    const username = useParams().username;

useEffect(() => {
   //console.log(username);
   const fetchUser = async() => {
       const res = await axios.get(`/users?username=${username}`);
       //console.log(res.data);
       setUser(res.data)
   }

   fetchUser();
},[username])

  return (
   <>
   <Navbar/>
   <Container>
       <Sidebar/>
       <ProfileRight>
           <ProfileRightTop>
               <ProfileCover>
                   <ProfileCoverImg src={user.coverPicture?user.coverPicture:"../assets/cover.png"} alt=""/>
                   <ProfileImg src={user.profilePicture?user.profilePicture: "../assets/profile.png"} alt=""  />
               </ProfileCover>
               <ProfileInfo>
                   <ProfileInfoName>{user?.username}</ProfileInfoName>
                   <ProfileInfoBio>{user?.bio}</ProfileInfoBio>
               </ProfileInfo>
           </ProfileRightTop>
           <ProfileRightBottom>
               <Feed username={username}/>
               <Rightbar user={user}/>
           </ProfileRightBottom>
       </ProfileRight>
   </Container>
   </>
  )
}

export default Profile
