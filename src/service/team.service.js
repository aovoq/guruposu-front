const API_URL = 'https://pure-river-54032.herokuapp.com//api/v1/'

// export const getTeams = () => {
//    return fetch(API_URL + 'admin/teams', {
//       method: 'GET',
//       headers: {
//          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token') || '{}'),
//       },
//    }).then((response) => response.json())
// }

export const createTeam = ({ name, alphabet, camp_id }) => {
   return fetch(API_URL + 'admin/team', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token') || '{}'),
      },
      body: JSON.stringify({
         name,
         alphabet,
         camp_id,
      }),
   })
      .then((response) => response.json())
      .then((data) => console.log(data))
}

export const deleteTeam = async (id) => {
   const response = await fetch(API_URL + 'admin/team/' + id, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token') || '{}'),
      },
   })
   const data = await response.json()
   console.log(data)
   return data
}


export const getTeam = async (unique_id) => {
   const response = await fetch(`${API_URL}admin/team/${unique_id}`, {
      method: 'GET',
      headers: {
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token') || '{}'),
      }
   })
   const data = await response.json()
   return data
}

export const getTeamPost = async (unique_id) => {
   const response = await fetch(`${API_URL}admin/team/${unique_id}`, {
      method: 'GET',
      headers: {
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token') || '{}'),
      }
   })
   const data = await response.json()
   return data
}

