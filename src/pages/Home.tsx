import { Box, Button, Center, Container, Input, Title } from '@mantine/core'
import { useState } from 'react'
import { Send } from 'react-feather'
import { useNavigate } from 'react-router-dom'

const Home = () => {
   const [id, setId] = useState('')
   const navigate = useNavigate()

   const handleSubmit = () => {
      navigate('/t/' + id)
   }

   return (
      <Container>
         <Center sx={{ height: '100vh' }}>
            <Box>
               <Title color='teal' align='center'>
                  <Send size='30' />
                  ぐるぽす
               </Title>
               <p>メンターさんから教えてもらったIDを入力しよう</p>
               <Box sx={{ width: '220px' }} mx='auto'>
                  <form onSubmit={handleSubmit}>
                     <Input type='text' placeholder='XXXX' onChange={(e: any) => setId(e.target.value)} mt='md' />
                     <Button type='submit' fullWidth color='teal' mt='xs'>
                        OK!
                     </Button>
                  </form>
               </Box>
            </Box>
         </Center>
      </Container>
   )
}

export default Home
