const API_URL = process.env.REACT_APP_BASE_URL

export const createTeam = async ({ alphabet, name, description, color, camp_id }) => {
   try {
      const res = await fetch(`${API_URL}/admin/camp/${camp_id}/team`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
         },
         body: JSON.stringify({
            alphabet,
            name,
            description,
            color,
         }),
      })
      const data = await res.json()
      return data
   } catch (err) {
      console.error(err)
   }
}

export const updateTeam = async({ alphabet, name, description, color, team_id}) => {
   try {
      const res = await fetch(`${API_URL}/admin/team/${team_id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
         },
         body: JSON.stringify({
            alphabet,
            name,
            description,
            color,
         }),
      })
      const data = await res.json()
      return data
   } catch(err) {
      console.error(err)
   }
}

export const deleteTeam = async (id) => {
   const response = await fetch(API_URL + 'admin/team/' + id, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
   })
   const data = await response.json()
   console.log(data)
   return data
}

export const getTeamAlldata = async (unique_id) => {
   try {
      const res = await fetch(`${API_URL}/team/${unique_id}/alldata`, {
         method: 'GET',
         headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
         },
      })
      const data = await res.json()
      return data
   } catch (err) {
      console.error(err)
   }
}

export const getTeam = async (unique_id) => {
   try {
      const res = await fetch(`${API_URL}/team/${unique_id}`, {
         method: 'GET',
      })
      const data = await res.json()
      return data
   } catch (err) {
      console.error(err)
   }
}

export const getTeamPost = async (unique_id) => {
   try {
      const response = await fetch(`${API_URL}/team/${unique_id}/post`, {
         method: 'GET',
         headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
         },
      })
      const data = await response.json()
      return data
   } catch (err) {
      console.error(err)
   }
}

export const getTeamMembers = async (unique_id) => {
   try {
      const res = await fetch(`${API_URL}/team/${unique_id}/members`, {
         method: 'GET',
         headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
         },
      })
      const data = await res.json()
      return data
   } catch (err) {
      console.error(err)
   }
}
