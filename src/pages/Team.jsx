import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createPost } from '../service/post.service'
import { getTeamAlldata } from '../service/team.service'
import { Send } from 'react-feather'
import { Box, Button, Container, Grid, Group, Header, Text, Textarea, Title } from '@mantine/core'
import { getCurrentUser } from '../service/user.service'
import { useForm } from '@mantine/form'

const Team = () => {
   const params = useParams()
   const navigate = useNavigate()
   const [currentUser, setCurrentUser] = useState({})
   const [team, setTeam] = useState({})
   const [posts, setPosts] = useState([])
   const [members, setMembers] = useState([])
   const form = useForm({
      initialValues: {
         body: '',
         team_unique_id: params.unique_id,
      },
      validate: {
         body: (value) => (value.length < 1 ? 'Post body must have at least 1 letter' : null),
      },
   })

   useEffect(() => {
      if (!localStorage.getItem('token')) navigate(`/t/${params.unique_id}/welcome`)
      getCurrentUserData()
      getTeamData()
   }, [])

   const getCurrentUserData = async () => {
      const res = await getCurrentUser()
      setCurrentUser(res.user)
   }

   const getTeamData = async () => {
      const res = await getTeamAlldata(params.unique_id)
      if (res.status === 'success') {
         setTeam(res.team)
         setPosts(res.posts)
         setMembers(res.members)
      } else {
         navigate('/404')
      }
   }

   const submitTeamPost = async (values) => {
      const res = await createPost(values)
      if (res.status === 'success') {
         getTeamData()
      }
   }

   const convertDate = (date) => {
      const d = new Date(date)
      return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
   }

   return (
      <>
         <Header height={60} px='md' mb='md'>
            <Group position='apart' sx={{ height: '100%' }}>
               <Title order={1} color='teal' size='h2'>
                  <Send size='25' />
                  ぐるぽす
               </Title>
               <Title order={1} color='teal' size='h2'>
                  {team.name}
               </Title>
            </Group>
         </Header>
         <Container size='lg'>
            <Grid>
               <Grid.Col span='content'>
                  {' '}
                  <Box sx={{ background: '#f6f6f6', borderRadius: '15px', width: '250px' }} pb='20px'>
                     <Box
                        sx={{
                           background: '#12b886',
                           width: '100%',
                           height: '60px',
                           position: 'relative',
                           borderRadius: '15px 15px 0 0',
                        }}
                     >
                        <Box
                           sx={{
                              background: '#000',
                              width: '60px',
                              height: '60px',
                              borderRadius: '60px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              position: 'absolute',
                              left: '50%',
                              top: '30px',
                              transform: 'translate(-50%, 0)',
                           }}
                        >
                           <Text size='30px' weight='bold' color='#fff'>
                              {currentUser.name && currentUser.name.charAt(0)}
                           </Text>
                        </Box>
                     </Box>
                     <Title order={2} color='teal' size='h3' align='center' mt='40px'>
                        {currentUser.name}
                     </Title>
                  </Box>
               </Grid.Col>
               <Grid.Col span='auto'>
                  <Box sx={{ background: '#f6f6f6', borderRadius: '15px', width: '100%' }} p='20px'>
                     <Grid sx={{ gap: '10px' }}>
                        <Grid.Col
                           span='content'
                           sx={{
                              background: '#000',
                              width: '50px',
                              height: '50px',
                              borderRadius: '50px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                           }}
                        >
                           <Text size='20px' weight='bold' color='#fff'>
                              {currentUser.name && currentUser.name.charAt(0)}
                           </Text>
                        </Grid.Col>
                        <Grid.Col span='auto' p='0'>
                           <form onSubmit={form.onSubmit((values) => submitTeamPost(values))} onReset={form.onReset}>
                              <Textarea placeholder='今日の何やった？' {...form.getInputProps('body')} />
                              <Group position='right' mt='xs'>
                                 <Button type='submit' sx={{ width: '90px' }}>
                                    投稿
                                 </Button>
                              </Group>
                           </form>
                        </Grid.Col>
                     </Grid>
                  </Box>
                  <Box>
                     {posts.length > 0 ? (
                        posts.map((post) => (
                           <Box
                              key={post.id}
                              sx={{ background: '#f6f6f6', borderRadius: '15px', width: '100%' }}
                              p='20px'
                              mt='20px'
                           >
                              <Grid sx={{ gap: '10px' }}>
                                 <Grid.Col
                                    span='content'
                                    sx={{
                                       background: '#000',
                                       width: '50px',
                                       height: '50px',
                                       borderRadius: '50px',
                                       display: 'flex',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                    }}
                                 >
                                    <Text size='20px' weight='bold' color='#fff'>
                                       {post.user_name !== null ? post.user_name.charAt(0) : post.member_name.charAt(0)}
                                    </Text>
                                 </Grid.Col>
                                 <Grid.Col span='auto' p='0'>
                                    <Title order={2} color='teal' size='h4' mt='5px'>
                                       {post.user_name !== null ? post.user_name : post.member_name}
                                    </Title>
                                    <Text size='14px' color='gray'>
                                       {convertDate(post.created_at)}
                                    </Text>
                                    <Text size='18px'>{post.body}</Text>
                                 </Grid.Col>
                              </Grid>
                           </Box>
                        ))
                     ) : (
                        <Box sx={{ background: '#f6f6f6', borderRadius: '15px', width: '100%' }} p='20px' mt='20px'>
                           投稿が有りません
                        </Box>
                     )}
                  </Box>
               </Grid.Col>
               <Grid.Col span='content'>
                  <Box sx={{ background: '#f6f6f6', borderRadius: '15px', width: '250px' }} p='15px'>
                     <Title order={3}>Members</Title>
                     {members.length > 0 ? (
                        members.map((member) => (
                           <Box key={member.id} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }} mt='sm'>
                              <Box
                                 sx={{
                                    background: '#000',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '40px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                 }}
                              >
                                 <Text size='20px' weight='bold' color='#fff'>
                                    {member.name && member.name.charAt(0)}
                                 </Text>
                              </Box>
                              <p>{member.name}</p>
                           </Box>
                        ))
                     ) : (
                        <Box sx={{ background: '#f6f6f6', borderRadius: '15px', width: '100%' }} p='20px' mt='20px'>
                           メンバーがいません
                        </Box>
                     )}
                  </Box>
               </Grid.Col>
            </Grid>
         </Container>
      </>
   )
}

export default Team
