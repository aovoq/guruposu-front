import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../service/auth.service'
import styled from 'styled-components'

const Container = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100vh;
   width: 100%;
`
const Button = styled.button`
   font-weight: bold;
   letter-spacing: 2px;
   width: 100%;
`

const AdminSignin = () => {
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const navigate = useNavigate()

   const handleSubmit = (e: any) => {
      e.preventDefault()
      console.log(email, password)
      signin(email, password).then(
         () => {
            console.log('success login')
            navigate('/admin')
         },
         (error) => {
            const resMessage =
               (error.response && error.response.data && error.response.data.message) ||
               error.message ||
               error.toString()

            console.log(resMessage)
         },
      )
   }

   return (
      <Container>
         <h2>メンター用 ログイン</h2>
         <form onSubmit={handleSubmit}>
            <input type='email' value={email} placeholder='email' onChange={(event) => setEmail(event.target.value)} />
            <input type='password' value={password} placeholder='password' onChange={(event) => setPassword(event.target.value)} />
            <Button>ログイン</Button>
         </form>
         <Link to='/admin/signup'>signup</Link>
      </Container>
   )
}

export default AdminSignin
