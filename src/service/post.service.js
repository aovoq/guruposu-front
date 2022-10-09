const API_URL = process.env.REACT_APP_BASE_URL

export const createPost = async ({ body, team_unique_id, image }) => {
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
            image: image || ''
         }),
      })
      const data = await res.json()
      console.log(data)
      return data
   } catch (err) {
      console.error(err)
   }
}
