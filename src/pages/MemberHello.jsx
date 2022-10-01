import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { memberSignin, memberSignup } from '../service/member.service'
import { getTeam } from '../service/team.service'

const MemberHello = () => {
   const params = useParams()
   const navigate = useNavigate()
   const [team, setTeam] = useState({})
   const [createMemberData, setCreateMemberData] = useState({
      name: '',
      pass: '',
      team_unique_id: params.unique_id,
   })
   const [pass, setPass] = useState('')

   const getTeamData = async () => {
      const teamData = await getTeam(params.unique_id)
      console.log(teamData)
      setTeam(teamData.data.team)
   }

   useEffect(() => {
      if (localStorage.getItem('access_token')) {
        navigate(`/t/${params.unique_id}`)
      }
      getTeamData()
   }, [])

   const submitSignup = async (event) => {
      event.preventDefault()
      const res = await memberSignup(createMemberData)
      console.log(res)
      navigate(`/t/${params.unique_id}`)
   }

   const handleChangeSignup = (event) => {
      setCreateMemberData({ ...createMemberData, [event.target.name]: event.target.value })
   }

   const submitSignin = async (event) => {
      event.preventDefault()
      await memberSignin({ pass, team_unique_id: params.unique_id })
      navigate(`/t/${params.unique_id}`)
   }

   return (
      <div>
         <h1>ようこそ, {team.name}へ</h1>
         <div>
            <form onSubmit={submitSignup}>
               <h2>アカウント作成</h2>
               <label htmlFor='name'>ニックネーム</label>
               <input type='text' name='name' id='name' onChange={handleChangeSignup} />
               <label htmlFor='pass'>パス</label>
               <input type='number' name='pass' id='pass' onChange={handleChangeSignup} />
               <input type='submit' value='作成' />
            </form>

            <form onSubmit={submitSignin}>
               <h2>ログイン</h2>
               <label htmlFor='pass'>パス</label>
               <input
                  type='number'
                  name='pass'
                  id='pass'
                  onChange={(e) => {
                     setPass(e.target.value)
                  }}
               />
               <input type='submit' value='ログイン' />
            </form>
         </div>
      </div>
   )
}

export default MemberHello
