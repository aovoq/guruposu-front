const API_URL = process.env.REACT_APP_BASE_URL

export const createCamp = async ({ name, location, description, start_date, end_date }) => {
   try {
      const res = await fetch(API_URL + '/admin/camp', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
         },
         body: JSON.stringify({
            name,
            location,
            description,
            start_date,
            end_date,
         }),
      })
      const data = await res.json()
      return data
   } catch (err) {
      console.error(err)
   }
}

export const archiveCamp = () => {}

export const deleteCamp = (id) => {
   fetch(API_URL + 'admin/camp/' + id, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token') || '{}'),
      },
   })
      .then((response) => response.json())
      .then((data) => console.log(data))
}

export const updateCamp = async ({ name, location, description, start_date, end_date, camp_id }) => {
   try {
      const res = await fetch(`${API_URL}/admin/camp/${camp_id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
         },
         body: JSON.stringify({
            name,
            location,
            description,
            start_date,
            end_date,
         }),
      })
      const data = await res.json()
      return data
   } catch (err) {
      console.error(err)
   }
}

export const getCamps = async () => {
   try {
      const response = await fetch(API_URL + '/admin/camps', {
         method: 'GET',
         headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
         },
      })
      const data = await response.json()
      if (!response.ok) console.error(data)
      return data
   } catch (err) {
      console.error(err)
   }
}

export const getCamp = async (id) => {
   try {
      const res = await fetch(`${API_URL}/admin/camp/${id}`, {
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
