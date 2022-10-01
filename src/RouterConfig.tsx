import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './pages/admin'
import AdminSignin from './pages/admin-signin'
import AdminSignup from './pages/admin-signup'
import AdminCamp from './pages/AdminCamp'
import Home from './pages/Home'
import MemberHello from './pages/MemberHello'
import NoMatch from './pages/NoMatch'
import Team from './pages/Team'

export const RouterConfig = () => {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route index element={<Home />} />
               <Route path='t/:unique_id' element={<Team />} />
               <Route path='t/:unique_id/hello' element={<MemberHello />} />
               <Route path='admin' element={<Admin />} />
               <Route path='admin/signup' element={<AdminSignup />} />
               <Route path='admin/signin' element={<AdminSignin />} />
               <Route path='admin/camp/:id' element={<AdminCamp />} />
               <Route path='*' element={<NoMatch />} />
            </Routes>
         </BrowserRouter>
      </>
   )
}
