import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCamp } from '../service/camp.service'
import { createTeam, deleteTeam } from '../service/team.service'

const AdminCamp = () => {
   const params = useParams()
   const [camp, setCamp] = useState([])
   const [campTeams, setCampTeams] = useState([])
   const [createTeamData, setCreateTeamData] = useState({
      name: '',
      alphabet: 'a',
      camp_id: params.id,
   })

   const start = 'a'.charCodeAt(0)
   const alphabets = Array.apply(null, new Array(26)).map((v, i) => {
      return String.fromCharCode(start + i)
   }, {})

   const getCampData = async () => {
      const campData = await getCamp(params.id)
      setCamp(campData.camp)
      setCampTeams(campData.camp_teams)
   }

   useEffect(() => {
      getCampData()
   }, [])

   const submitCreateTeam = async (event) => {
      event.preventDefault()
      await createTeam(createTeamData)
      getCampData()
   }

   const handleChange = (event) => {
      setCreateTeamData({ ...createTeamData, [event.target.name]: event.target.value })
   }

   const handleDeleteTeam = async (id) => {
      await deleteTeam(id)
      getCampData()
   }

   return (
      <div>
         キャンプ詳細画面
         <div>{camp.name}</div>
         <div>
            <form onSubmit={submitCreateTeam} value={createTeamData.alphabet}>
               <input type='text' name='name' placeholder='チーム名' onChange={handleChange} />
               <select name='alphabet' onChange={handleChange}>
                  {alphabets.map((alphabet) => (
                     <option key={alphabet} value={alphabet}>
                        {alphabet}
                     </option>
                  ))}
               </select>
               <button>CreateTeam</button>
            </form>
         </div>
         <div>
            {campTeams.map((team) => (
               <div key={team.id}>
                  <p>{team.name}</p>
                  <Link to={`/t/${team.unique_id}`}>{team.unique_id}</Link>
                  <button onClick={() => handleDeleteTeam(team.id)}>DELETE</button>
               </div>
            ))}
         </div>
      </div>
   )
}

export default AdminCamp
