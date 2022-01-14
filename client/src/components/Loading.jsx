import React from 'react'
import styled,{keyframes} from 'styled-components'

const Loader = styled.div` 
width:100vw;
height:100vh;
background-color:#16161d;
display:grid;
place-items:center;
max-width:100%;
`

const loading = keyframes`
to{
    transform: rotateZ(-360deg);
}`

const Spinner = styled.div` 
width:10vmax;
height:10vmax; 
border-bottom:5px solid rgba(255,255,255,0.719);
border-radius:50%;
animation:${loading} 800ms linear infinite;
`

const Loading = () => {
  return (
   <Loader>
       <Spinner/>
   </Loader>
  )
}

export default Loading
