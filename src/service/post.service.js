const API_URL = process.env.REACT_APP_BASE_URL

export const createPost = async ({ body, team_unique_id }) => {
   try {
      const res = await fetch(`${API_URL}/team/${team_unique_id}/post`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
         },
         body: JSON.stringify({
            body,
            team_unique_id,
         }),
      })
      const data = await res.json()
      return data
   } catch (err) {
      console.error(err)
   }
}
