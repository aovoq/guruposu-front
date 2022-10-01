const API_URL = 'https://pure-river-54032.herokuapp.com//api/v1/'

export const createPost = async ({ body, team_unique_id }) => {
   const response = await fetch(`${API_URL}team/${team_unique_id}/post`, {
      method: 'Post',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token') || '{}'),
      },
      body: JSON.stringify({
         body,
         team_unique_id,
      }),
   })
   const data = await response.json()
   return data
}
