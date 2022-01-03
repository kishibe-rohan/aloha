import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

import { Add, Remove } from "@material-ui/icons";
import styled from 'styled-components'

import Online from './Online';

/*
const users = [
  {id:"61ce58856b1ce776268cfb70",username:"Kogami Rogue","email":"kogami123@gmail.com",profilePicture:"https://i.pinimg.com/originals/05/d7/76/05d77621c5371ed2b6bdba84091927dc.png","coverPicture":"https://wallpapercave.com/wp/O0rSWxg.jpg","followers":["61ce59336b1ce776268cfb78","61ce59066b1ce776268cfb76"],"followings":["61ce58e06b1ce776268cfb74"],"followedCategories":["61ce5f33452534caa7fc00db","61ce5fa1452534caa7fc00df","61ce602d452534caa7fc00e3"],"isAdmin":false,"createdAt":"2021-12-31T01:10:29.419Z","__v":0},
  {id:"61ce58856b1ce776268cfb71",username:"Kogami Rogue","email":"kogami123@gmail.com",profilePicture:"https://i.pinimg.com/originals/05/d7/76/05d77621c5371ed2b6bdba84091927dc.png","coverPicture":"https://wallpapercave.com/wp/O0rSWxg.jpg","followers":["61ce59336b1ce776268cfb78","61ce59066b1ce776268cfb76"],"followings":["61ce58e06b1ce776268cfb74"],"followedCategories":["61ce5f33452534caa7fc00db","61ce5fa1452534caa7fc00df","61ce602d452534caa7fc00e3"],"isAdmin":false,"createdAt":"2021-12-31T01:10:29.419Z","__v":0},
  {id:"61ce58856b1ce776268cfb72",username:"Kogami Rogue","email":"kogami123@gmail.com",profilePicture:"https://i.pinimg.com/originals/05/d7/76/05d77621c5371ed2b6bdba84091927dc.png","coverPicture":"https://wallpapercave.com/wp/O0rSWxg.jpg","followers":["61ce59336b1ce776268cfb78","61ce59066b1ce776268cfb76"],"followings":["61ce58e06b1ce776268cfb74"],"followedCategories":["61ce5f33452534caa7fc00db","61ce5fa1452534caa7fc00df","61ce602d452534caa7fc00e3"],"isAdmin":false,"createdAt":"2021-12-31T01:10:29.419Z","__v":0},
  {id:"61ce58856b1ce776268cfb73",username:"Kogami Rogue","email":"kogami123@gmail.com",profilePicture:"https://i.pinimg.com/originals/05/d7/76/05d77621c5371ed2b6bdba84091927dc.png","coverPicture":"https://wallpapercave.com/wp/O0rSWxg.jpg","followers":["61ce59336b1ce776268cfb78","61ce59066b1ce776268cfb76"],"followings":["61ce58e06b1ce776268cfb74"],"followedCategories":["61ce5f33452534caa7fc00db","61ce5fa1452534caa7fc00df","61ce602d452534caa7fc00e3"],"isAdmin":false,"createdAt":"2021-12-31T01:10:29.419Z","__v":0},
]
*/

const Container = styled.div` 
flex:3;
background-color:#16161d;
-webkit-box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
color:white;
`

const Wrapper = styled.div`
padding: 20px 20px 0 0;
`

const PromoContainer = styled.div`
display: flex;
align-items: center;
`

const PromoImg = styled.img`
width: 40px;
height: 40px;
margin-right: 10px;`

const PromoText = styled.span`
font-weight: 300;
font-size: 15px;
`

const AdImg = styled.img` 
width: 100%;
border-radius: 10px;
margin: 30px 0;
-webkit-box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
`

const FriendListTitle = styled.h2`
font-size: 18px;
font-weight: 500;
margin-bottom: 10px;
text-align:center;
`

const FriendList = styled.ul` 
padding: 0;
margin: 0;
list-style: none;
`

const RightbarTitle = styled.h2` 
font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`

const RightbarInfo = styled.div` 
margin-bottom: 30px;
`

const RightbarInfoItem = styled.div`
margin-bottom: 10px;
`

const RightbarInfoKey = styled.span` 
font-weight: 500;
  margin-right: 15px;
  color: blue;
`

const RightbarInfoValue = styled.span` 
font-weight: 300;
  color: white;
`

const RightbarFollowings = styled.div` 
display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const RightbarFollowing = styled.div` 
display: flex;
flex-direction: column;
margin-bottom: 20px;
cursor: pointer;
`

const RightbarFollowingImg = styled.img` 
width: 100px;
height: 100px;
object-fit: cover;
border-radius: 5px;
`

const RightbarFollowingName = styled.span` 
font-weight:300;
color:white;
`

const RightbarFollowButton = styled.button` 
margin-top: 30px;
  margin-bottom: 10px;
  border: none;
  background-color: #1872f2;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  :focus{
    outline:none;
  }
`


const Rightbar = ({user}) => {
  const dispatch = useDispatch();
  const {isLoading,loading,user:currentUser,friends} = useSelector((state) => state.user)
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    dispatch(fetchFriends());
  },[user])

  const handleClick = () => {
      try{
        if(followed)
        {
          dispatch(unfollowUser(currentUser._id))
        }else{
          dispatch(followUser(currentUser._id))
        }

        setFollowed(followed => !followed)
      }
      catch(err)
      {

      }
  }

  const HomeRightbar = () => {
    return (
      <>
      
        <PromoContainer>
          <PromoImg src="https://www.kindpng.com/picc/m/86-863785_calendar-vector-icon-png-www-pixshark-com-images.png"/>
          <PromoText>
            <b>Jersey</b> and <b>3 other movies</b> releasing this weekend
          </PromoText>
        </PromoContainer>
        <AdImg src="https://m.media-amazon.com/images/M/MV5BYzRjNzQ0YzYtYWRhZC00ZjgwLWFjNTktZjk3N2MwZjJhNTgxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"/>
        <FriendListTitle> 
              Online 
        </FriendListTitle>
        <FriendList>
           {
             friends.map((user) => {
               <Online key={user.id} user={user}/>
             })
           }
        </FriendList>
  
      </>
    )
  }

  const ProfileRightbar = () => {
    return(
      <>
      {user.username !== currentUser.username && (
        <RightbarFollowButton onClick={handleClick}>
          {followed?"Unfollow":"Follow"}
          {followed?<Remove/>:<Add/>}
        </RightbarFollowButton>
      )}

      <RightbarTitle>User Info</RightbarTitle>
      <RightbarInfo>
        <RightbarInfoItem>
          <RightbarInfoKey>From:</RightbarInfoKey>
          <RightbarInfoValue>{user.from}</RightbarInfoValue>
        </RightbarInfoItem>
        <RightbarInfoItem>
          <RightbarInfoKey>Fav Genre:</RightbarInfoKey>
          <RightbarInfoValue>{user.genre}</RightbarInfoValue>
        </RightbarInfoItem>
      </RightbarInfo>

      <RightbarTitle>User Followers</RightbarTitle>
      <RightbarFollowings>
        {friends.map((friend) => (
          <Link to={`/profile`+ friend.username}  style={{ textDecoration: "none" }}>
            <RightbarFollowing>
              <RightbarFollowingImg src={friend.profilePicture}/>
              <RightbarFollowingName>{friend.username}</RightbarFollowingName>
            </RightbarFollowing>
          </Link>
        ))}
      </RightbarFollowings>
      </>
    )
  }
  return (
    <Container>
      <Wrapper>
        {user? <ProfileRightbar/>:<HomeRightbar/>}
      </Wrapper>
    </Container>
   
  )
}

export default Rightbar
