import { createContext, useEffect, useState } from 'react'
import { getCurrentUser } from '../service/user.service'

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      if (localStorage.getItem('access_token')) {
         getCurrentUser().then((user) => {
            setUser(user)
            setLoading(false)
         })
      }
   }, [])

   const value = {
      user,
   }

   return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export default AuthProvider
