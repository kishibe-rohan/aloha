import {useState,useRef} from 'react'
import {useSelector} from 'react-redux'
import {PermMedia,Label,Room,Cancel} from '@material-ui/icons'
import styled from 'styled-components'
import axios from 'axios'

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
border: none;
width: 80%;

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

const ShareOptionText = styled.span` 
font-size: 14px;
font-weight: 500;
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
const ShareImgContainer = styled.div` 
padding: 0 20px 10px 20px;
position: relative;
`

const ShareImg = styled.img` 
width: 100%;
object-fit: cover;
`

export default function Share() {
   const {user} = useSelector((state) => state.user)
   const {categories} = useSelector((state) => state.categories);
   const desc = useRef();
   const [file,setFile] = useState(null);
   const [category,setCategory] = useState("61ce60b6452534caa7fc00e7");

   const handleDropdownChange = (e) => {
       setCategory(e.target.value);
   }

   const submitHandler = async(e) => {
       e.preventDefault();
       const newPost = {
        userId: user._id,
        review: desc.current.value,
        categoryId: category
      };

      if(file)
      {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name",fileName);
          data.append("file",file);
          newPost.img = fileName;
          try{
              await axios.post('/upload',data)
          }catch(err){}
      }
      try{
          await axios.post('/posts',newPost);
          window.location.reload();
      }catch(err){}
   }

   return(
       <Container>
           <Wrapper>
               <Top>
                   <ProfileImg src={user.profilePicture}/>
                   <ShareInput placeholder="Review a movie.." ref={desc}/>
               </Top>
               <ShareHr/>
               {
                   file && (
                       <ShareImgContainer>
                           <ShareImg src={URL.createObjectURL(file)}/>
                           <Cancel style={{position:"absolute",top:"0",right:"20px",cursor:"pointer",opacity:"0.7"}} onClick={() => setFile(null)}/>
                       </ShareImgContainer>
                   )
               }
               <Bottom onSubmit={submitHandler}>
                   <ShareOptions>
                       <ShareOption htmlFor="file">
                           <PermMedia htmlColor="tomato" style={{fontSize:"18px",marginRight:"3px"}}/>
                           <ShareOptionText>Photo</ShareOptionText>
                           <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
                       </ShareOption>
                       <ShareOption>
                           <select onChange={handleDropdownChange}>
                               {categories.map((category) => {
                                   return <option value={category._id}>{category.name}</option>
                               })}
                           </select>
                       </ShareOption>
                   </ShareOptions>
                   <ShareButton type="submit">Share</ShareButton>
               </Bottom>
           </Wrapper>
       </Container>
   )

}