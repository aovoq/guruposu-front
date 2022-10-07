const API_URL = process.env.REACT_APP_BASE_URL

export const memberRegister = async ({ name, pass, team_unique_id }) => {
   try {
      const res = await fetch(`${API_URL}/team/${team_unique_id}/member/register`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            name,
            pass,
         }),
      })
      const data = await res.json()
      console.log(data)
      if (data.status === 'success') localStorage.setItem('token', data.token)
      return data
   } catch (err) {
      console.error(err)
   }
}

export const memberLogin = async ({ pass, team_unique_id }) => {
   try {
      const res = await fetch(`${API_URL}/team/${team_unique_id}/member/login`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            pass,
         }),
      })
      const data = await res.json()
      if (data.status === 'success') localStorage.setItem('token', data.token)
      return data
   } catch (err) {
      console.error(err)
   }
}
