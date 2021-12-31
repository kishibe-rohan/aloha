import React from 'react'
import {Navbar,Feed,Sidebar,Rightbar} from '../components'

import styled from 'styled-components'

const Container = styled.div` 
display:flex;
width:100%;
`
const Home = () => {
  return (
    <>
    <Navbar/>
    <Container>
        <Sidebar/>
        <Feed/>
        <Rightbar/>
    </Container>
    </>
  )
}

export default Home
