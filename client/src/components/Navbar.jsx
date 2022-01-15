import React,{useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import {Link} from 'react-router-dom'
import {Search,Person,Chat,Notifications} from '@material-ui/icons'
import styled from 'styled-components'

const Container = styled.div` 
height:50px;
width:100%;
display:flex;
align-items:center;
position:sticky;
top:0;
z-index:999;
background-color: #121212;
-webkit-box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
`

const Left = styled.div`
flex:3
`

const Logo = styled.div`
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
  color: #1775ee;
  cursor: pointer;
`
const Center = styled.div`
flex:5;
` 
const Searchbar = styled.div` 
width:100%;
height:30px;
background-color:white;
border-radius:30px;
display:flex;
align-items:center;
`

const SearchInput = styled.input` 
border:none;
width:70%;
:focus{
    outline:none;
}
`
const Right = styled.div` 
flex:4;
display: flex;
align-items: center;
justify-content: space-around;
color: white;
`
const Icons = styled.div`
display:flex;
`

const IconItem = styled.div` 
  margin-right: 15px;
  cursor: pointer;
  position: relative;
`

const IconBadge = styled.span` 
width:15px;
height:15px; 
background-color:#0000FF;
border-radius: 50%;
  color: white;
  position: absolute;
  top: -5px;
  right: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`
const ProfileImg = styled.img` 
width:32px;
height:32px;
border-radius:50%;
object-fit:cover;
cursor:pointer;
`

const Navbar = () => {
    
    const {user} = useContext(AuthContext)

  return (
    <Container>
        <Left>
            <Link to="/" style={{textDecoration:"none"}}>
                <Logo>Aloha</Logo>
            </Link>
        </Left>
        <Center>
            <Searchbar>
                <Search style={{fontSize:"20px",marginLeft:"10px"}}/>
                <SearchInput placeholder="Search for people,posts,genres.."/>
            </Searchbar>
        </Center>
        <Right>
            <Icons>
                <IconItem>
                    <Person/>
                    <IconBadge>1</IconBadge>
                </IconItem>
                <IconItem>
                    <Chat/>
                    <Link to={'/messenger'}>
                    <IconBadge>2</IconBadge>
                    </Link>
                </IconItem>
                <IconItem>
                    <Notifications/>
                    <IconBadge>1</IconBadge>
                </IconItem>
            </Icons>
            {user && 
             <Link to={`/profile/${user.username}`}>
             <ProfileImg src={user.profilePicture ? user.profilePicture : "../assets/profile.png"} />
         </Link>
         }
           
        </Right>
    </Container>
  )
}

export default Navbar
