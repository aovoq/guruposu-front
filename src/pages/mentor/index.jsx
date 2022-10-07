import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createCamp, getCamps } from '../../service/camp.service'
import { Container, Modal, Button, Grid, Table, Title, Group, Header } from '@mantine/core'
import NewCamp from '../../components/NewCamp'
import { Send } from 'react-feather'

const Mentor = () => {
   const navigate = useNavigate()
   const [camps, setCamps] = useState([])
   const [opened, setOpened] = useState(false)

   const getCampsData = async () => {
      const res = await getCamps()
      setCamps(res)
   }

   useEffect(() => {
      if (!localStorage.getItem('token')) {
         navigate('/mentor/login')
      }
      getCampsData()
   }, [])

   const submitCreateCamp = async (data) => {
      const start_date = new Date(data.start_date)
      const end_date = new Date(data.end_date)
      const res = await createCamp({
         name: data.name,
         location: data.location,
         description: data.description,
         start_date: `${start_date.getFullYear()}-${start_date.getMonth() + 1}-${start_date.getDate()}`,
         end_date: `${end_date.getFullYear()}-${end_date.getMonth() + 1}-${end_date.getDate()}`,
      })
      if (res.status === 'success') {
         setOpened(false)
         getCampsData()
      }
   }

   const raws = camps.map((camp) => (
      <tr key={camp.id}>
         <td>{camp.name}</td>
         <td>{camp.description}</td>
         <td>{camp.start_date}</td>
         <td>{camp.end_date}</td>
         <td>
            <Button color='teal' variant='light' component={Link} to={`/mentor/camp/${camp.id}`}>
               詳細
            </Button>
         </td>
      </tr>
   ))

   return (
      <>
         <Header height={60} px='md' mb='md'>
            <Group position='apart' sx={{ height: '100%' }}>
               <Title component={Link} to='/mentor' order={1} color='teal' size='h2'>
                  <Send size='25' />
                  ぐるぽす
               </Title>
            </Group>
         </Header>
         <Container>
            <Grid justify='space-between' align='center' my='sm'>
               <Grid.Col span='auto'>
                  <h1>メンターダッシュボード</h1>
               </Grid.Col>
               <Grid.Col span='content'>
                  <Button color='teal' onClick={() => setOpened(true)}>キャンプ作成</Button>
               </Grid.Col>
            </Grid>

            <Modal opened={opened} onClose={() => setOpened(false)} title='キャンプ作成'>
               <NewCamp submit={submitCreateCamp} />
            </Modal>

            <Table verticalSpacing='lg'>
               <thead>
                  <tr>
                     <th>キャンプ名</th>
                     <th>備考</th>
                     <th>開始日時</th>
                     <th>終了日時</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {camps.length ? (
                     raws
                  ) : (
                     <tr>
                        <td>キャンプが有りません</td>
                     </tr>
                  )}
               </tbody>
            </Table>
         </Container>
      </>
   )
}

export default Mentor
