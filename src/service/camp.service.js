const API_URL = 'https://pure-river-54032.herokuapp.com//api/v1/'

export const createCamp = ({ name, location, description, start_date, end_date }) => {
   return fetch(API_URL + 'admin/camp', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token') || '{}'),
      },
      body: JSON.stringify({
         name,
         location,
         description,
         start_date,
         end_date,
      }),
   })
      .then((response) => response.json())
      .then((data) => {
         console.log(data)
      })
}

export const archiveCamp = () => {}

export const deleteCamp = (id) => {
   fetch(API_URL + 'admin/camp/' + id, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token') || '{}'),
      },
   })
      .then((response) => response.json())
      .then((data) => console.log(data))
}

export const updateCamp = () => {}

export const getCamps = () => {
   return fetch(API_URL + 'admin/camps', {
      method: 'GET',
      headers: {
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token') || '{}'),
      },
   }).then((response) => response.json())
}

export const getCamp = (unique_id) => {
   return fetch(API_URL + 'admin/camp/' + unique_id, {
      method: 'GET',
      headers: {
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token') || '{}'),
      },
   })
      .then((res) => res.json())
      .then((data) => data)
}
