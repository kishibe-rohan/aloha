import React from 'react'
import {Link} from 'react-router-dom';
import {MoreVert} from '@material-ui/icons'
import {format} from 'timeago.js'
import styled from 'styled-components'

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
  return (
    <Container>
        <Wrapper>
            <Top>
                <TopLeft>
                    <Link to={`/profile`}>
                        <ProfileImg src="https://i.pinimg.com/originals/38/b4/b1/38b4b15a7f7c388ceca48cae04231be1.png"/>
                    </Link>
                    <ProfileUsername>Shinya Kogami</ProfileUsername>
                    <ProfileDate>{format(post.createdAt)}</ProfileDate>
                </TopLeft>
                <TopRight>
                    <MoreVert/>
                </TopRight>
            </Top>
            <Center>
                <PostText>{post.review}</PostText>
                <PostImg src={post.img}/>
            </Center>
            <Bottom>
                <BottomLeft>
                    <LikeIcon src="https://www.pngitem.com/pimgs/m/71-715538_reddit-arrow-transparent-background-reddit-upvote-icon-hd.png"/>
                    <LikeCounter>
                        3 people like this
                    </LikeCounter>
                </BottomLeft>
                <BottomRight>
                    <PostCategory>
                        Anime
                    </PostCategory>
                </BottomRight>
            </Bottom>
        </Wrapper>
    </Container>
  )
}

export default Post
