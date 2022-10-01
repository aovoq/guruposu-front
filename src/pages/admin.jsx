import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCurrentUser, logout } from '../service/auth.service'
import styled from 'styled-components'
import { createCamp, deleteCamp, getCamps } from '../service/camp.service'

const Container = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 100%;
`

const Form = styled.form`
   display: flex;
`

const Wrapper = styled.div`
   display: flex;
   width: 80%;
   margin: auto;
   flex-wrap: wrap;
`

const Item = styled.div`
   width: 250px;
   height: 100px;
   margin: 10px;
   background: #444;
   border-radius: 10px;
   text-align: center;

   a {
      color:#fff;
      display: block;
      width: 100%;
      height: 100%;
      line-height: 100px;
   }
`

const Admin = () => {
   const [currentUser, setCurrentUser] = useState(undefined)
   const [camps, setCamps] = useState([])
   const [createCampData, setCreateCampData] = useState({
      name: '',
      location: '',
      description: '',
      start_date: '',
      end_date: '',
   })

   useEffect(() => {
      getCampsData()
   }, [])

   const handleLogout = () => {
      logout()
      setCurrentUser(undefined)
   }

   const handleChange = (event) => {
      setCreateCampData({ ...createCampData, [event.target.name]: event.target.value })
   }

   const submitCreateCamp = async (event) => {
      event.preventDefault()
      await createCamp(createCampData)
      getCampsData()
   }

   const getCampsData = async () => {
      console.log('load')
      const campsData = await getCamps()
      setCamps(campsData.camps)
   }

   return (
      <Container>
         <h2>メンターダッシュボード: キャンプ</h2>
         {currentUser && <button onClick={handleLogout}>Logout</button>}
         <Form onSubmit={submitCreateCamp}>
            <input type='text' name='name' placeholder='キャンプ名' onChange={handleChange} />
            <input type='text' name='location' placeholder='会場' onChange={handleChange} />
            <input type='text' name='description' placeholder='備考' onChange={handleChange} />
            <input type='date' name='start_date' onChange={handleChange} />
            <input type='date' name='end_date' onChange={handleChange} />
            <input type='submit' value='作成' />
         </Form>
         <Wrapper>
            {camps.map((camp) => {
               return (
                  <Item key={camp.id}>
                     <Link to={`/admin/camp/${camp.id}`}>{camp.name}</Link>
                     {/* <button
                        onClick={() => {
                           deleteCamp(camp.id)
                           setCamps(camps.filter((c) => c.id !== camp.id))
                        }}
                     >
                        Delete
                     </button> */}
                  </Item>
               )
            })}
         </Wrapper>
      </Container>
   )
}

export default Admin
