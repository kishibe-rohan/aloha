import React,{useContext} from 'react'
import {useParams} from 'react-router-dom'

import styled from 'styled-components'
import {Navbar,Feed,Sidebar,Rightbar} from '../components'

const Container = styled.div` 
display:flex;
width:100%;
`

const Category = () => {
  const id = useParams().id; 

  return (
    <>
    <Navbar/>
    <Container>
    <Sidebar/>
    <Feed category={id}/>
    <Rightbar/>
    </Container>
    </>
  )
}

export default Category
