import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCurrentUser } from '../service/auth.service'
import { createPost } from '../service/post.service'
import { getTeam } from '../service/team.service'
import styled from 'styled-components'
import { Archive, Heart, MessageSquare, MoreHorizontal } from 'react-feather'

const Team = () => {
   const params = useParams()
   const navigate = useNavigate()
   const [team, setTeam] = useState([])
   const [posts, setPosts] = useState([])
   const [createPostData, setCreatePostData] = useState({
      body: '',
      team_unique_id: params.unique_id,
   })
   const [currentUsername, setCurrentUsername] = useState('')

   useEffect(() => {
      getCurrentUser().then((user) => {
         if (!user) {
            navigate(`/t/${params.unique_id}/hello`)
         } else {
            setCurrentUsername(user.user.name)
         }
      })
   }, [])

   const getTeamData = async () => {
      const teamData = await getTeam(params.unique_id)
      setTeam(teamData.data.team)
      setPosts(teamData.data.posts)
      console.log(teamData.data.posts)
   }

   useEffect(() => {
      console.log(params.unique_id)
      getTeamData()
   }, [])

   const submitTeamPost = async (event) => {
      event.preventDefault()
      await createPost(createPostData)
      getTeamData()
      setCreatePostData({ ...createPostData, body: '' })
   }

   const handleChange = (event) => {
      setCreatePostData({ ...createPostData, [event.target.name]: event.target.value })
   }

   const convertDate = (date) => {
      const d = new Date(date)
      return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
   }

   return (
      <Container>
         <Logo>
            <Archive />
            <p>ぐるぽす</p>
         </Logo>
         <User>
            <UserIcon src='/user.png' />
            <p>{currentUsername}</p>
         </User>
         <Title>{team.name}のぐるぽす</Title>
         <Form onSubmit={submitTeamPost}>
            <Textarea
               name='body'
               cols='30'
               rows='5'
               onChange={handleChange}
               value={createPostData.body}
               placeholder='今日の進捗?'
            />
            <Button>投稿</Button>
         </Form>
         <div>
            {posts.map((post) => (
               <Post key={post.id}>
                  <PostDetail>
                     <UserIcon src='/user.png' />
                     <p>
                        <strong>{post.user_name !== null ? post.user_name : post.member_name}</strong>
                     </p>
                     <p>{convertDate(post.created_at)}</p>
                  </PostDetail>
                  <Body>{post.body}</Body>
                  <PostActions>
                     <MessageSquare />
                     <Heart />
                     <MoreHorizontal />
                  </PostActions>
               </Post>
            ))}
         </div>
      </Container>
   )
}

const PostActions = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-around;
   padding-top: 15px;
   svg {
      width: 20px;
   }
`

const User = styled.div`
   position: fixed;
   bottom: 15px;
   left: 120px;
   display: flex;
   align-items: center;
   gap: 15px;
`

const Logo = styled.div`
   position: fixed;
   top: 10px;
   left: 120px;
   display: flex;
   align-items: center;
   gap: 5px;
   color: #fff;
   font-size: 20px;
`

const Container = styled.div`
   position: relative;
   width: 500px;
   margin: 0 auto;
   border-right: 1px solid #ccc;
   border-left: 1px solid #ccc;
`

const Title = styled.h2`
   margin: 0;
   padding: 5px 0;
   border-bottom: 1px solid #ccc;
`

const Form = styled.form`
   border-bottom: 1px solid #ccc;
`

const Textarea = styled.textarea`
   resize: none;
   width: 100%;
   margin: 0;
`

const Button = styled.button`
   width: 100%;
`

const Post = styled.div`
   border-bottom: 1px solid #777;
   padding: 15px;
`

const PostDetail = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
`
const UserIcon = styled.img`
   width: 40px;
   height: 40px;
   filter: invert(100%);
`

const Body = styled.p`
   padding-left: 50px;
`

export default Team
