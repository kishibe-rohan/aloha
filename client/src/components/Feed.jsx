import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

import Post from './Post'

const posts = [
  {_id:"61ce73044c12eda57d22d049",userId:"61ce58856b1ce776268cfb70",review:"Strong and gripping. Consistent story flow and engaging background music keeps the viewers gripped to the story from the first shot. One of the better shows of the year. (4/5)",img:"https://meltingpotsandothercalamities.files.wordpress.com/2017/07/img_8961.jpg","likes":[],"categoryId":"61ce60b6452534caa7fc00e7","__v":0,createdAt
  :
  "2021-12-31T01:40:49.406Z"},
  {_id:"61ce73044c12eda57d22d048",userId:"61ce58856b1ce776268cfb70",review:"Strong and gripping. Consistent story flow and engaging background music keeps the viewers gripped to the story from the first shot. One of the better shows of the year. (4/5)",img:"https://meltingpotsandothercalamities.files.wordpress.com/2017/07/img_8961.jpg","likes":[],"categoryId":"61ce60b6452534caa7fc00e7","__v":0,createdAt:"2021-12-31T01:40:49.406Z"
  },
  {_id:"61ce73044c12eda57d22d047",userId:"61ce58856b1ce776268cfb70",review:"Strong and gripping. Consistent story flow and engaging background music keeps the viewers gripped to the story from the first shot. One of the better shows of the year. (4/5)",img:"https://meltingpotsandothercalamities.files.wordpress.com/2017/07/img_8961.jpg","likes":[],"categoryId":"61ce60b6452534caa7fc00e7","__v":0,createdAt
  :
  "2021-12-31T01:40:49.406Z"},
  {_id:"61ce73044c12eda57d22d046",userId:"61ce58856b1ce776268cfb70",review:"Strong and gripping. Consistent story flow and engaging background music keeps the viewers gripped to the story from the first shot. One of the better shows of the year. (4/5)",img:"https://meltingpotsandothercalamities.files.wordpress.com/2017/07/img_8961.jpg","likes":[],"categoryId":"61ce60b6452534caa7fc00e7","__v":0,createdAt
  :
  "2021-12-31T01:40:49.406Z"}
]

const Container = styled.div`
flex:6;
background-color:#16161d;
color:white;
`

const Wrapper = styled.div`
padding:20px;
`

const Feed = () => {
  return (
   <Container>
     <Wrapper>
       <h2 style={{textAlign:"center"}}>Create Post</h2>
       {
         posts.map((post) => (
           <Post key={post._id} post={post}/>
         ))
       }
     </Wrapper>
   </Container>
  )
}

export default Feed
