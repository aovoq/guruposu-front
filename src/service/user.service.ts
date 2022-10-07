const API_URL = process.env.REACT_APP_BASE_URL

export const mentorRegister = async ({ name, email, password, password_confirm }: any) => {
   try {
      const res = await fetch(API_URL + '/admin/register', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            name,
            email,
            password,
            password_confirm,
         }),
      })
      const data = await res.json()
      return data
   } catch (err) {
      console.error(err)
   }
}

export const mentorLogin = async ({ email, password }: any) => {
   try {
      const res = await fetch(API_URL + '/admin/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            email,
            password,
         }),
      })
      const data = await res.json()
      localStorage.setItem('token', data.token)
      return data
   } catch (err) {
      console.error(err)
   }
}

export const logout = () => {
   localStorage.removeItem('token')
}

export const getCurrentUser = async () => {
   if (!localStorage.getItem('token')) {
      console.log('login false')
      const data = false
      return data
   }
   console.log('login true')
   try {
      const res = await fetch(`${API_URL}/current_user`, {
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
