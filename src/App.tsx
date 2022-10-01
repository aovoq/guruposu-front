import React, { useEffect, useState } from 'react'
import { RouterConfig } from './RouterConfig'
import { getCurrentUser, logout } from './service/auth.service'

const App = () => {
   const [currentUser, setCurrentUser] = useState<any>(null)
   const [loading, setLoading] = useState<boolean>(true)

   useEffect(() => {
      getCurrentUser().then((user) => {
         // console.log('currentUser', user)
         setCurrentUser(user.user)
         setLoading(false)
      })
   }, [])

   return (
      <>
         {(!loading&&currentUser) && (
            <>
               {/* <button onClick={logout}>logout</button> */}
            </>
         )}
         <RouterConfig />
      </>
   )
}

export default App
