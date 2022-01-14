import React,{useState,useEffect,useContext} from 'react'
import styled from 'styled-components'

import Post from './Post'
import Loading from './Loading'
import AddPost from './AddPost'

import axios from 'axios'
import {AuthContext} from '../context/AuthContext'

const Container = styled.div`
flex:6;
background-color:#16161d;
color:white;
`

const Wrapper = styled.div`
padding:20px;
`

const Feed = ({username}) => {
  const [posts,setPosts] = useState([]);
  const {isFetching,user} = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async() => {
      const res = username? await axios.get(`/posts/profile/${username}`): await axios.get(`/posts/feed/${user._id}`)
      setPosts(res.data.sort((p1,p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }))
    }

    fetchPosts();
  },[username,user._id])

  return (
   <Container>
     <Wrapper>
     {(!username || username === user.username) && <AddPost/>}
       {
         isFetching?(
           <Loading/>
         ):(
           posts.map((p) => (
             <Post key={p._id} post={p}/>
           ))
         )
       }
     </Wrapper>
   </Container>
  )
}

export default Feed
