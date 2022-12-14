import { Container, Table, Modal, Button, Header, Group, Title, Grid, Anchor } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCamp, updateCamp } from '../../service/camp.service'
import NewTeamModal from '../../components/NewTeamModal'
import { createTeam, updateTeam } from '../../service/team.service'
import { Repeat, Send } from 'react-feather'
import UpdateTeamModal from '../../components/UpdateTeamModal'
import UpdateCampModal from '../../components/UpdateCampModal'

const CampPage = () => {
   const params = useParams()
   const navigate = useNavigate()
   const [camp, setCamp] = useState({})
   const [campTeams, setCampTeams] = useState([])
   const [opened, setOpened] = useState(false)
   const [selectTeam, setSelectTeam] = useState(false)
   const [campOpened, setCampOpened] = useState(false)

   const getCampData = async () => {
      const campData = await getCamp(params.id)
      if (campData.status === 'success') {
         setCamp(campData.camp)
         setCampTeams(campData.teams)
      }
   }

   const submitCreateTeam = async (data) => {
      const res = await createTeam({
         alphabet: data.alphabet,
         name: data.name,
         description: data.description,
         color: data.color,
         camp_id: params.id,
      })
      if (res.status === 'success') {
         console.log('close')
         setOpened(false)
         getCampData()
      }
   }

   useEffect(() => {
      if (!localStorage.getItem('token')) {
         navigate('/mentor/login')
      }
      getCampData()
   }, [])

   const submitUpdateTeam = async (values) => {
      const res = await updateTeam(values)
      if (res.status === 'success') {
         setSelectTeam(false)
         getCampData()
      }
   }

   const submitUpdateCamp = async (values) => {
      const res = await updateCamp(values)
      if (res.status === 'success') {
         setCampOpened(false)
         getCampData()
      }
   }

   return (
      <>
         <Header height={60} px='md' mb='md'>
            <Group position='apart' sx={{ height: '100%' }}>
               <Title component={Link} to='/mentor' order={1} color='teal' size='h2'>
                  <Send size='25' />
                  ????????????
               </Title>
            </Group>
         </Header>
         <Container>
            <h1>???????????????????????????</h1>
            <Grid justify='space-between' sx={{padding: '8px'}}>
               <h2>{camp.name}</h2>
               <Button onClick={() => setCampOpened(true)}>????????????????????????</Button>
               <Modal opened={campOpened} onClose={() => setCampOpened(false)} title='????????????????????????'>
                  <UpdateCampModal submit={submitUpdateCamp} camp={camp} />
               </Modal>
            </Grid>
            <p>{camp.description}</p>
            <p>
               {camp.start_date} - {camp.end_date}
            </p>
            <Button color='teal' onClick={() => setOpened(true)} sx={{ width: '100%' }}>
               ???????????????
            </Button>

            <Modal opened={opened} onClose={() => setOpened(false)} title='???????????????'>
               <NewTeamModal submit={submitCreateTeam} />
            </Modal>
            <Table verticalSpacing='lg'>
               <thead>
                  <tr>
                     <th>ABC</th>
                     <th>????????????</th>
                     <th>??????</th>
                     <th>?????????????????????</th>
                     <th>????????????ID</th>
                     <th>Update</th>
                  </tr>
               </thead>
               <tbody>
                  {campTeams.length > 0 ? (
                     campTeams.map((team) => (
                        <tr key={team.id}>
                           <td>{team.alphabet.toUpperCase()}</td>
                           <td>{team.name}</td>
                           <td>{team.description}</td>
                           <td>{team.color}</td>
                           <td><Anchor component={Link} to={`/t/${team.unique_id}`}>{team.unique_id}</Anchor></td>
                           <td>
                              <Button color='teal' variant='light' onClick={() => setSelectTeam(team)}>
                                 <Repeat size='15px' />
                              </Button>
                           </td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td>???????????????????????????</td>
                     </tr>
                  )}
               </tbody>
            </Table>

            <Modal opened={selectTeam} onClose={() => setSelectTeam(false)} title='???????????????????????????'>
               <UpdateTeamModal submit={submitUpdateTeam} selectTeam={selectTeam} />
            </Modal>
         </Container>
      </>
   )
}

export default CampPage
