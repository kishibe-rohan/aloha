import React from 'react'
import axios from 'axios';
import styled from 'styled-components'

const Container = styled.div`
flex:3;
height:calc(100vh-50px);
position:sticky;
top:50px;
background-color:#16161d;
color:white;
-webkit-box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
`

const Wrapper = styled.div`
padding: 20px;
`

const ItemList = styled.ul`
padding: 0;
margin: 0;
list-style: none;
`

const Item = styled.li`
display: flex;
align-items: center;
margin-bottom: 20px;
`

const ItemIcon = styled.img`
margin-right: 15px;
width:32px;
height:32px;
border-radius:50%;
object-fit:cover;
cursor:pointer;
`

const ItemText = styled.span``


const Sidebar = () => {

 const categories = [{_id:"61ce5f33452534caa7fc00db",name:"Hollywood",img:"https://www.filmibeat.com/img/320x100x392/popcorn/trending_news/spider-man-arriving-early-in-india-5761-20211129130135.jpg","followers":["61ce58856b1ce776268cfb70"],"createdAt":"2021-12-31T01:38:59.144Z","updatedAt":"2021-12-31T02:47:35.124Z","__v":0},{_id:"61ce5f69452534caa7fc00dd",name:"Bollywood",img:"https://cdn.lifestyleasia.com/wp-content/uploads/sites/7/2021/11/23171804/243790350_4438147812927955_1754826358579203828_n.webp_-645x806.jpg","followers":[],"createdAt":"2021-12-31T01:39:53.956Z","updatedAt":"2021-12-31T01:39:53.956Z","__v":0},{_id:"61ce5fa1452534caa7fc00df",name:"Thriller",img:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/716riayrvwl-ac-sl1500-1595956613.jpg?crop=1xw:0.948xh;center,top&resize=480:*","followers":["61ce58856b1ce776268cfb70"],"createdAt":"2021-12-31T01:40:49.406Z","updatedAt":"2021-12-31T02:49:13.561Z","__v":0},{_id:"61ce5fff452534caa7fc00e1",name:"Comedy",img:"https://flxt.tmsimg.com/assets/p15781_p_v8_ac.jpg","followers":[],"createdAt":"2021-12-31T01:42:23.149Z","updatedAt":"2021-12-31T01:42:23.149Z","__v":0},{_id:"61ce602d452534caa7fc00e3",name:"Action",img:"https://assets.vogue.in/photos/5f16b3bc9ffca08d1848369b/3:2/w_1919,h_1280,c_limit/must-watch%20action%20movies.jpg","followers":["61ce58856b1ce776268cfb70","61ce58e06b1ce776268cfb74"],"createdAt":"2021-12-31T01:43:09.160Z","updatedAt":"2021-12-31T02:50:30.553Z","__v":0},{_id:"61ce608a452534caa7fc00e5",name:"Series",img:"https://m.media-amazon.com/images/M/MV5BNDJkYzY3MzMtMGFhYi00MmQ4LWJkNTgtZGNiZWZmMTMxNzdlXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg","followers":[],"createdAt":"2021-12-31T01:44:42.875Z","updatedAt":"2021-12-31T01:44:42.875Z","__v":0},{_id:"61ce60b6452534caa7fc00e7",name:"Anime",img:"https://upload.wikimedia.org/wikipedia/en/7/75/JoJo_Part_3_Stardust_Crusaders.jpg","followers":[],"createdAt":"2021-12-31T01:45:26.982Z","updatedAt":"2021-12-31T01:45:26.982Z","__v":0}]
 //console.log(categories);
  return (
   <Container>
     <Wrapper>
       <ItemList>
        {
            categories.map((category) => (
            <Item key={category._id}>
              <ItemIcon src={category.img}/>
              <ItemText>{category.name}</ItemText>
            </Item>
          ))
        }
       </ItemList>
     </Wrapper>
   </Container>
  )
}

export default Sidebar
