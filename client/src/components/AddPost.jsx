import {useState,useRef} from 'react'
import {useSelector} from 'react-redux'
import {PermMedia,Label,Room,Cancel} from '@material-ui/icons'

export default function Share() {
   const {user} = useSelector((state) => state.user)
   const {categories} = useSelector((category) => state.categories);
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
                           <Cancel onClick={() => setFile(null)}/>
                       </ShareImgContainer>
                   )
               }
               <Bottom onSubmit={submitHandler}>
                   <ShareOptions>
                       <ShareOption htmlFor="file">
                           <PermMedia htmlColor="tomato"/>
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
                           <select onChange={hanldeDropdownChange}>
                               {categories.map((category) => {
                                   return <option value={category._id}>{category.name}</option>
                               })}
                           </select>
                       </ShareOption>
                   </ShareOptions>
                   <ShareButton typr="Submit">Share</ShareButton>
               </Bottom>
           </Wrapper>
       </Container>
   )

}