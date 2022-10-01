const API_URL = 'https://pure-river-54032.herokuapp.com//dev/'

export const signup = (name: string, email: string, password: string) => {
   return fetch(API_URL + 'signup', {
      method: 'POST',
      mode: 'cors',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         name,
         email,
         password,
      }),
   })
}

export const signin = (email: string, password: string) => {
   return fetch(API_URL + 'signin', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         email,
         password,
      }),
   })
      .then((response) => response.json())
      .then((data) => {
         if (data.access_token) {
            localStorage.setItem('access_token', JSON.stringify(data.access_token))
         }
         return data
      })
}

export const logout = () => {
   localStorage.removeItem('access_token')
}

export const getCurrentUser = async () => {
   if (!localStorage.getItem('access_token')) {
      console.log('no login')
      const data = false
      return data
   }
   console.log('logined')
   console.log('Bearer ' + JSON.parse(localStorage.getItem('access_token') || '{}'))
   const response = await fetch('https://pure-river-54032.herokuapp.com//api/v1/' + 'current_user', {
      method: 'GET',
      headers: {
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token') || '{}'),
      },
   })
   const data = await response.json()
   console.log(data)
   return data
}
