import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100vh;
   width: 100%;
   gap: 10px;
`

const Button = styled.button`
   font-weight: bold;
   letter-spacing: 2px;
   width: 100%;
`

const Form = styled.form`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`

const Home = () => {
   const [id, setId] = useState('')
   const navigate = useNavigate()

   const handleSubmit = () => {
      navigate('/t/' + id)
   }

   return (
      <Container>
         <h1>ぐるぽす</h1>
         <p>メンターさんから教えてもらったIDを入力しよう</p>
         <Form onSubmit={handleSubmit}>
            <input type='text' placeholder='XXXX' onChange={(e) => setId(e.target.value)} />
            <Button>OK!</Button>
         </Form>
      </Container>
   )
}

export default Home
