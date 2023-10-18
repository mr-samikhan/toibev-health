import { Routes, Route } from 'react-router-dom'
//imports
import Layout from '../Layout'
import Login from '../views/Login'
import { Learn } from '../views/Learn'
import { Admins } from '../views/Admins'
import { Health } from '../views/Health'
import { Events } from '../views/Events'
import Settings from '../views/Setttings'
import { Assessment } from '../views/Assessment'
import { Information } from '../views/Information'
import ResetPassword from '../views/ResetPassword'
import ProtectedRoutes from '../HOC/ProtectedRoutes'
import { Dashboard } from '../views/Dasboard/Dashboard'
import SingleAssessment from '../views/Assessment/SingleAssessment'

export function Router() {
  return (
    <>
      <Routes>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path={`/reset-password`} element={<ResetPassword />}></Route>
      </Routes>
      <ProtectedRoutes>
        <Routes>
          <Route path="/" exact element={<Layout />}>
            <Route path="/home" exact element={<Events />} />
            <Route path="/learn" exact element={<Learn />} />
            <Route path="/health" exact element={<Health />} />
            <Route path="/events" exact element={<Events />} />
            <Route path="/admins" exact element={<Admins />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/information" exact element={<Information />} />
            <Route path="/account-settings" exact element={<Settings />} />
            <Route path="/assesment">
              <Route path="/assesment" exact element={<Assessment />} />
              <Route path="/assesment/:id" element={<SingleAssessment />} />
            </Route>
          </Route>
        </Routes>
      </ProtectedRoutes>
    </>
  )
}
