import { Anchor, Box, Button, Center, Container, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { AtSign, Check, Lock, Send } from 'react-feather'
import { Link, useNavigate } from 'react-router-dom'
import { mentorLogin } from '../../service/user.service'

const Login = () => {
   const navigate = useNavigate()
   const [error, setError] = useState('')
   const form = useForm({
      initialValues: {
         email: '',
         password: '',
      },
      validate: {
         email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
         password: (value) => (value.length < 4 ? 'Password must have at least 6 letters' : null),
      },
   })

   useEffect(() => {
      document.title = 'ぐるぽす | Mentor Login'
      if (localStorage.getItem('token')) navigate('/mentor')
      return () => {
         document.title = 'ぐるぽす'
      }
   })

   const handleLogin = async (values) => {
      const res = await mentorLogin(values)
      console.log(res.message)
      if (res.status === 'success') {
         navigate('/mentor')
      } else {
         setError(res.message)
      }
   }

   return (
      <Container>
         <Center sx={{ height: '100vh' }}>
            <Box sx={{ width: '300px' }} mx='auto'>
               <Title align='center' color='teal'>
                  <Send size='30' />
                  ぐるぽす
               </Title>
               <Title order={2} align='center'>
                  Mentor Login
               </Title>
               <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
                  <TextInput
                     icon={<AtSign size='20' />}
                     label='email'
                     placeholder='Your email'
                     {...form.getInputProps('email')}
                  />
                  <PasswordInput
                     icon={<Lock size='20' />}
                     label='password'
                     placeholder='Your password'
                     mt='xs'
                     {...form.getInputProps('password')}
                  />
                  <Button type='submit' fullWidth mt='md' color='teal'>
                     <Check size='20' />
                     Login
                  </Button>
                  {error && <Text color='red'>{error}</Text>}
                  <Text align='center'>
                     Don't have an account?{' '}
                     <Anchor component={Link} to='/mentor/register'>
                        Register
                     </Anchor>
                  </Text>
               </form>
            </Box>
         </Center>
      </Container>
   )
}

export default Login
