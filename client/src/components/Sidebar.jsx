import React,{useState,useEffect} from 'react'
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
  const [categories,setCategories] = useState([]);

 useEffect(() => {

  const fetchCategories = async() => {
    const res = await axios.get('/category/all');
    setCategories(res.data);
  }

  fetchCategories();
   

 },[])

  return (
   <Container>
     <Wrapper>
       <ItemList>
        {
            categories && categories.map((category) => (
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
