import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Mentor from './pages/mentor'
import MentorRegister from './pages/mentor/Register'
import MentorLogin from './pages/mentor/Login'
import CampPage from './pages/mentor/CampPage'
import Home from './pages/Home'
import NoMatch from './pages/NoMatch'
import Team from './pages/Team'
import Welcome from './pages/Welcome'

export const RouterConfig = () => {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route index element={<Home />} />
               <Route path='t/:unique_id' element={<Team />} />
               <Route path='t/:unique_id/welcome' element={<Welcome />} />
               <Route path='mentor' element={<Mentor />} />
               <Route path='mentor/register' element={<MentorRegister />} />
               <Route path='mentor/login' element={<MentorLogin />} />
               <Route path='mentor/camp/:id' element={<CampPage />} />
               <Route path='*' element={<NoMatch />} />
            </Routes>
         </BrowserRouter>
      </>
   )
}
