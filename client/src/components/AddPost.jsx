import {useState,useEffect,useContext,useRef} from 'react'
import {PermMedia} from '@material-ui/icons'
import styled from 'styled-components'

import axios from 'axios'
import {AuthContext} from '../context/AuthContext'

const Container = styled.div` 
width: 100%;
border-radius: 10px;
-webkit-box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
`

const Wrapper = styled.div` 
padding:10px;
`

const Top = styled.div`
display: flex;
align-items: center;
`

const ProfileImg = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
object-fit: cover;
margin-right: 10px;
`
const ShareInput = styled.input`
background-color:#16161d;
border:none;
height:80%;
width: 80%;
color:white;

:focus{
    outline:none
}
`
const ShareHr = styled.hr` 
margin: 20px;
`

const Bottom = styled.div` 
display: flex;
align-items: center;
justify-content: space-between;
`

const ShareOptions = styled.div`
display: flex;
margin-left: 20px;
`
const ShareOption = styled.div` 
display: flex;
align-items: center;
margin-right: 15px;
cursor: pointer;
`

const ShareButton = styled.button` 
border: none;
padding: 7px;
border-radius: 5px;
background-color: green;
font-weight: 500;
margin-right: 20px;
cursor: pointer;
color: white;
`


export default function Share() {
   const {user} = useContext(AuthContext)
   const desc = useRef();
   const [categories,setCategories] = useState([]);
   const [image,setImage] = useState("");
   const [category,setCategory] = useState("61ce60b6452534caa7fc00e7");

   const handleDropdownChange = (e) => {
       setCategory(e.target.value);
   }

   const handleImage = (e) => {
       setImage(e.target.value);
   }

   const submitHandler = async(e) => {
       e.preventDefault();
       const newPost = {
        userId: user._id,
        review: desc.current.value,
        categoryId: category,
        img:image
      };

      console.log(newPost);

      try{
          await axios.post('/posts/new',newPost);
          window.location.reload();
      }catch(err){}
   }

   useEffect(() => {

    const fetchCategories = async() => {
      const res = await axios.get('/category/all');
      setCategories(res.data);
    }
  
    fetchCategories();
     
  
   },[])

   return(
       <Container>
           <Wrapper>
               <Top>
                   <ProfileImg src={user.profilePicture}/>
                   <ShareInput placeholder="Review a movie.." ref={desc}/>
               </Top>
               <ShareHr/>
               <Bottom>
                   <ShareOptions>
                       <ShareOption htmlFor="file">
                           <PermMedia htmlColor="tomato" style={{fontSize:"18px",marginRight:"3px"}}/>
                           <input style={{borderRadius:"20px",backgroundColor:"#16161d",color:"white",border:"none"}} onChange={handleImage} placeholder="Paste Image Link"/>
                       </ShareOption>
                       <ShareOption>
                           <select style={{backgroundColor:"#16161d",color:"white",border:"none"}} onChange={handleDropdownChange}>
                               {categories.map((c) => {
                                   return <option value={c._id}>{c.name}</option>
                               })}
                           </select>
                       </ShareOption>
                   </ShareOptions>
                   <ShareButton onClick={submitHandler} type="submit">Share</ShareButton>
               </Bottom>
           </Wrapper>
       </Container>
   )

}