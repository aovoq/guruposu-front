import React, { useState } from 'react'
import { signup } from '../service/auth.service'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

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


const AdminSignup = () => {
   const [name, setName] = useState<string>('')
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const navigate = useNavigate()

   const handleSubmit = (e: any) => {
      e.preventDefault()
      console.log(email, password)
      signup(name, email, password).then(
         (res) => {
            return res.json()
         },
         (error) => {
            const resMessage =
               (error.response && error.response.data && error.response.data.message) ||
               error.message ||
               error.toString()

               console.log(resMessage)
         },
      )
      .then((data) => console.log(data))
   }

   return (
      <Container>
         <h2>メンター用 サインアップ</h2>
         <form onSubmit={handleSubmit}>
            <input type='email' value={email} placeholder='email' onChange={(event) => setEmail(event.target.value)} />
            <input type='password' value={password} placeholder='password' onChange={(event) => setPassword(event.target.value)} />
            <input type="text" value={name} placeholder='ニックネーム' onChange={(event) => setName(event.target.value)}/>
            <Button>サインアップ</Button>
         </form>
         <Link to='/admin/signin'>ログイン</Link>
      </Container>
   )
}

export default AdminSignup
