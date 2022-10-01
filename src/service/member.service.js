const API_URL = 'https://pure-river-54032.herokuapp.com//api/v1/'

export const memberSignup = async ({ name, pass, team_unique_id }) => {
   const response = await fetch(`${API_URL}team/${team_unique_id}/signup`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         name,
         pass,
      })
   })
   const data = await response.json()
   console.log(data)
}

export const memberSignin = async ({ pass,  team_unique_id }) => {
   const response = await fetch(`${API_URL}team/${team_unique_id}/signin`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         pass,
      })
   })
   const data = await response.json()
   localStorage.setItem('access_token', JSON.stringify(data.access_token))
   console.log(data)
}
