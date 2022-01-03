import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {profilePosts,feedPosts} from '../redux/actions/postActions'
import styled from 'styled-components'

import Post from './Post'
import Loading from './Loading'
import AddPost from './AddPost'

const Container = styled.div`
flex:6;
background-color:#16161d;
color:white;
`

const Wrapper = styled.div`
padding:20px;
`

const Feed = ({username}) => {
  const dispatch = useDispatch();
  const [posts,setPosts] = useState([]);
  const {loading,feedPosts:feed,profilePosts:profile} = useSelector((state) => state.posts)
  const {user} = useSelector((state) => state.user)

  const fetchPosts = () => {
    if(username)
    {
      dispatch(profilePosts(username))
      setPosts(profile);
    }
    
    else
    {
      dispatch(feedPosts(user._id))
      setPosts(feed)
    }
  }

  useEffect(() => {
    fetchPosts();
  },[user._id,username])

  return (
   <Container>
     <Wrapper>
      {/*<AddPost/>*/}
       {
         loading?(
           <Loading/>
         ):(
          posts.map((post) => (
            <Post key={post._id} post={post}/>
          ))
         )
       }
     </Wrapper>
   </Container>
  )
}

export default Feed
