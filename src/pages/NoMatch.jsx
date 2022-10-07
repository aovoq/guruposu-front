import { Center, Text, Title } from '@mantine/core'

const NoMatch = () => {
  return (
    <Center sx={{height: '100vh'}}>
      <Title>404: <Text span color='gray.6'>PageNotFound</Text></Title>
    </Center>
  )
}

export default NoMatch
