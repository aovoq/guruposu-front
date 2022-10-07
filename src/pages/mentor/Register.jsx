import { Anchor, Box, Button, Center, Container, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { AtSign, Check, Lock, Send, User } from 'react-feather'
import { Link, useNavigate } from 'react-router-dom'
import { mentorRegister } from '../../service/user.service'

const Register = () => {
   const navigate = useNavigate()
   const [error, setError] = useState('')
   const form = useForm({
      initialValues: {
         name: '',
         email: '',
         password: '',
         password_confirmation: '',
      },
      validate: {
         name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
         email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
         password: (value) => (value.length < 6 ? 'Password must have at least 6 letters' : null),
         password_confirmation: (value, values) => (value !== values.password ? 'Passwords did not match' : null),
      },
   })

   useEffect(() => {
      document.title = 'ぐるぽす | Mentor Register'
      if (localStorage.getItem('token')) navigate('/mentor')
      return () => {
         document.title = 'ぐるぽす'
      }
   })

   const handleRegister = async (values) => {
      const res = await mentorRegister(values)
      console.log(res.message)
      if (res.status === 'success') {
         navigate('/mentor/login')
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
                  Mentor Register
               </Title>
               <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
                  <TextInput
                     icon={<User size='20' />}
                     label='nick name'
                     placeholder='Your nickname'
                     {...form.getInputProps('name')}
                  />
                  <TextInput
                     icon={<AtSign size='20' />}
                     label='email'
                     placeholder='Your email'
                     mt='xs'
                     {...form.getInputProps('email')}
                  />
                  <PasswordInput
                     icon={<Lock size='20' />}
                     label='password'
                     placeholder='password'
                     mt='xs'
                     {...form.getInputProps('password')}
                  />
                  <PasswordInput
                     icon={<Check size='20' />}
                     label='Confirm password'
                     placeholder='password_check'
                     mt='xs'
                     {...form.getInputProps('password_confirmation')}
                  />
                  {error && <Text color='red'>{error}</Text>}
                  <Button type='submit' fullWidth mt='lg' color='teal'>
                     Register
                  </Button>
                  <Text align='center'>
                     already have an account?{' '}
                     <Anchor component={Link} to='/mentor/login'>
                        Login
                     </Anchor>
                  </Text>
               </form>
            </Box>
         </Center>
      </Container>
   )
}

export default Register
