import React,{useState,useContext} from 'react'
import { loginCall,registerCall } from "../../apiCalls";
import { CircularProgress } from "@material-ui/core";
import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(75deg, #16161D 50%, #1775ee 50%);
  color:white;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 80%;
  height: 70%;
  display: flex;
  background-color:#16161d;
  border-radius:10px;
color:white;
-webkit-box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
box-shadow: 0px 0px 16px -8px rgba(255, 255, 255, 0.68);
`

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left:10px;
`

const Logo = styled.h3`
font-size: 50px;
font-weight: 800;
color: #1775ee;
margin-bottom: 10px;
`

const Desc = styled.span`
font-size: 24px;
`

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right:10px;
`

const LoginBox = styled.form`
    height: 300px;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const LoginInput = styled.input`
height: 50px;
border-radius: 10px;
border: 1px solid gray;
font-size: 18px;
padding-left: 20px;
:focus{
    outline:none
}`

const LoginButton = styled.button`
height:50px;
border-radius:10px;
border:none;
background-color: #1775ee;
color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
`

const LoginInfo = styled.button`
height:50px;
border-radius:10px;
border:none;
background-color: tomato;
color: white;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
`

const Login = () => {
    const {isFetching,dispatch} = useContext(AuthContext)
    const [isLogin,setIsLogin] = useState(true);
    const [loginEmail,setLoginEmail] = useState('')
    const [loginPassword,setLoginPassword] = useState('')

    const [registerUsername,setRegisterUsername] = useState('')
    const [registerEmail,setRegisterEmail] = useState('')
    const [registerPassword,setRegisterPassword] = useState('')
    const [userFrom,setUserFrom] = useState('')
    const [userGenre,setUserGenre] = useState('')




    const handleLogin = (e) => {
        e.preventDefault();
        //console.log(userDetails);
        loginCall(
            {email:loginEmail,password:loginPassword},
            dispatch
        )
    }

    const handleRegister = (e) => {
        e.preventDefault();
        registerCall(
            {username:registerUsername,email:registerEmail,password:registerPassword,from:userFrom,genre:userGenre},
            dispatch
        )
    }

    const toggleStatus = (e) => {
        e.preventDefault();
        if(isLogin)
        setIsLogin(false);
        else
        setIsLogin(true);
    }

  return (
    <Container>
        <Wrapper>
            <Left>
                <Logo>Aloha</Logo>
                <Desc>Connect with movie junkies from across the globe,and explore according to your favorite genres</Desc>
            </Left>
            <Right>
                {
                    isLogin? (
                        <LoginBox onSubmit={handleLogin}>
                    <LoginInput placeholder="Email" type="email" required onChange={(e) => setLoginEmail(e.target.value)}/>
                    <LoginInput placeholder="Password" type="password" required onChange={(e) => setLoginPassword(e.target.value)}/>
                    <LoginButton type="submit" disabled={loading}>
                      {
                          loading?(
                              <CircularProgress color="inherit" size="20px"/>
                          ):("Log In")
                      }
                    </LoginButton>
                    <LoginInfo onClick={toggleStatus}>
                      Don't have an account? Register!
                    </LoginInfo>
                </LoginBox>
                    ): (
                        <LoginBox onSubmit={handleRegister}>
                    <LoginInput placeholder="Username" type="text" required onChange={(e) => setRegisterUsername(e.target.value)}/>
                    <LoginInput placeholder="Email" type="email" required onChange={(e) => setRegisterEmail(e.target.value)}/>
                    <LoginInput placeholder="Password" type="password" required onChange={(e) => setRegisterPassword(e.target.value)}/>
                    <LoginInput placeholder="From" type="text" required onChange={(e) => setUserFrom(e.target.value)}/>
                    <LoginInput placeholder="Fav Genre" type="text" required onChange={(e) => setUserGenre(e.target.value)}/>
                    <LoginButton type="submit" disabled={loading}>
                      {
                          loading?(
                              <CircularProgress color="white" size="20px"/>
                          ):("Sign Up")
                      }
                    </LoginButton>
                    <LoginInfo onClick={toggleStatus}>
                      Already have an account? Login!
                    </LoginInfo>
                </LoginBox>
                    )
                }
                
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Login
