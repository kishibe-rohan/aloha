import React,{useState,useEffect,useContext} from 'react'
import {Link} from 'react-router-dom';
import {MoreVert} from '@material-ui/icons'
import {format} from 'timeago.js'
import styled from 'styled-components'

import axios from 'axios'
import { AuthContext } from "../../context/AuthContext";

import LikeImg from '../assets/like.png'

const Container = styled.div`
width: 100%;
border-radius: 10px;
margin: 30px 0;
background-color:black;
color:white;
-webkit-box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
`

const Wrapper = styled.div`
padding:10px;
`

const Top = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
` 

const TopLeft = styled.div`
display: flex;
align-items: center;
`

const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  `

const ProfileUsername = styled.span`
font-size: 15px;
font-weight: 500;
margin: 0 10px;`

const ProfileDate = styled.span` font-size: 12px;`

const TopRight = styled.div``

const Center = styled.div`
margin:20px 0;
`

const PostText  = styled.p``

const PostImg = styled.img`
margin-top:20px;
width:100%;
max-height:500px;
object-fit:contain;
`

const Bottom = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const BottomLeft = styled.div`
display: flex;
align-items: center;   
`

const BottomRight = styled.div``

const LikeIcon = styled.img`
width: 24px;
height: 24px;
margin-right: 5px;
cursor: pointer;
`

const LikeCounter = styled.span`
font-size:15px;
`

const PostCategory = styled.span`
cursor:pointer;
font-size:15px;
`

const Post = ({post}) => {
    const [likes,setLikes] = useState(post.likes.length);
    const [isLiked,setIsLiked] = useState(false);
    const [author,setAuthor] = useState({});
    const [categoryName,setCategoryName] = useState('');
    const {user} = useContext(AuthContext)

    useEffect(() => {
        setIsLiked(post.likes.includes(user._id))
    },[user._id,post.likes])

    useEffect(() => {
        const fetchAuthor = async() => {
            const res = await axios.get(`/users?userId=${post.userId}`)
           // console.log(res);
            setAuthor(res.data);
        }

        fetchAuthor();

        const fetchCategory = async() => {
            const res = await axios.get(`/category/${post.categoryId}`)
           // console.log(res);
            setCategoryName(res.data.name);
        }

        fetchCategory();
    },[post.userId,post.categoryId])

   
    const handleLike = () => {
        try{
            axios.put(`/posts/${post._id}/like`,{userId: user._id})
           // console.log('Liked');
        }catch(err)
        {
           console.log(err); 
        }
       
        setLikes(isLiked? likes - 1 : likes + 1);
        setIsLiked(!isLiked);
    }

  return (
    <Container>
        <Wrapper>
            <Top>
                <TopLeft>
                    <Link to={`/profile/${author?.username}`}>
                        <ProfileImg src={author.profilePicture?author.profilePicture:"../assets/profile.png"}/>
                    </Link>
                    <ProfileUsername>{author?.username}</ProfileUsername>
                    <ProfileDate>{format(post.createdAt)}</ProfileDate>
                </TopLeft>
                <TopRight>
                    <MoreVert/>
                </TopRight>
            </Top>
            <Center>
                <PostText>{post.review}</PostText>
                {post.img && <PostImg src={post.img}/>}
            </Center>
            <Bottom>
                <BottomLeft>
                    <LikeIcon onClick={handleLike} src={LikeImg}/>
                    <LikeCounter>
                        {likes} people like this
                    </LikeCounter>
                </BottomLeft>
                <BottomRight>
                    <PostCategory>
                       {categoryName}
                    </PostCategory>
                </BottomRight>
            </Bottom>
        </Wrapper>
    </Container>
  )
}

export default Post
