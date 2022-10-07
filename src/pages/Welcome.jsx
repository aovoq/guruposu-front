import { Box, Button, Center, Container, Grid, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { Send } from 'react-feather'
import { useNavigate, useParams } from 'react-router-dom'
import { memberLogin, memberRegister } from '../service/member.service'
import { getTeam } from '../service/team.service'

const Welcome = () => {
   const params = useParams()
   const navigate = useNavigate()
   const [team, setTeam] = useState({})
   const [error, setError] = useState('')
   const registerForm = useForm({
      initialValues: {
         name: '',
         pass: '',
         team_unique_id: params.unique_id,
      },
      validate: {
         name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
         pass: (value) => (value.length !== 4 ? 'Password must have 4 letters' : null),
      },
   })
   const loginForm = useForm({
      initialValues: {
         pass: '',
         team_unique_id: params.unique_id,
      },
      validate: {
         pass: (value) => (value.length !== 4 ? 'Password must have 4 letters' : null),
      },
   })

   useEffect(() => {
      document.title = 'ぐるぽす | Welcome'
      if (localStorage.getItem('token')) navigate(`/t/${params.unique_id}`)
      getTeamData()
      return () => {
         document.title = 'ぐるぽす'
      }
   })

   const getTeamData = async () => {
      const res = await getTeam(params.unique_id)
      if (res.status !== 'success') navigate('/404')
      setTeam(res.team)
   }

   const handleRegister = async (values) => {
      const res = await memberRegister(values)
      if (res.status === 'success') {
         navigate(`/t/${params.unique_id}`)
      } else {
         setError(res.message)
      }
   }

   const handleLogin = async (values) => {
      const res = await memberLogin(values)
      if (res.status === 'success') {
         navigate(`/t/${params.unique_id}`)
      } else {
         setError(res.message)
      }
   }

   return (
      <Container>
         <Center sx={{ height: '100vh' }}>
            <Box sx={{ maxWidth: '600px', width: '80%' }}>
               <Box>
                  <Title color='teal' align='center'>
                     <Send size='30' />
                     ぐるぽす
                  </Title>
                  <Text align='center' size='lg'>
                     ようこそ！{team.name}のぐるぽすへ。
                  </Text>
                  {error && (
                     <Text color='red' align='center'>
                        {error}
                     </Text>
                  )}
               </Box>
               <Grid mt='md' align='center'>
                  <Grid.Col span='auto'>
                     <form onSubmit={registerForm.onSubmit((values) => handleRegister(values))}>
                        <Text size='lg' weight='bold' align='center'>
                           初めての方！
                        </Text>
                        <TextInput
                           label='ニックネーム'
                           placeholder='ニックネーム'
                           mt='xs'
                           {...registerForm.getInputProps('name')}
                        />
                        <TextInput
                           label='パスコード'
                           placeholder='4桁の数字'
                           mt='xs'
                           {...registerForm.getInputProps('pass')}
                        />
                        <Button type='submit' fullWidth color='teal' mt='md'>
                           登録
                        </Button>
                     </form>
                  </Grid.Col>
                  <Grid.Col span={1} />
                  <Grid.Col span='auto'>
                     <form onSubmit={loginForm.onSubmit((values) => handleLogin(values))}>
                        <Text size='lg' weight='bold' align='center'>
                           二回目以降の方！
                        </Text>
                        <TextInput
                           label='パスコード'
                           placeholder='4桁の数字'
                           mt='xs'
                           {...loginForm.getInputProps('pass')}
                        />
                        <Button type='submit' fullWidth color='teal' mt='md'>
                           ログイン
                        </Button>
                     </form>
                  </Grid.Col>
               </Grid>
            </Box>
         </Center>
      </Container>
   )
}

export default Welcome
