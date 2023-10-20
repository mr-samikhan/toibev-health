import { Routes, Route } from 'react-router-dom'
//imports
import Layout from '../Layout'
import Login from '../views/Login'
import { Learn } from '../views/Learn'
import { Admins } from '../views/Admins'
import { Health } from '../views/Health'
import { Events } from '../views/Events'
import Settings from '../views/Setttings'
import { ROUTES } from '../constants/routes'
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
        <Route path={ROUTES.LOGIN} exact element={<Login />}></Route>
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={<ResetPassword />}
        ></Route>
      </Routes>
      <ProtectedRoutes>
        <Routes>
          <Route path={ROUTES.LAYOUT} exact element={<Layout />}>
            <Route path={ROUTES.HOME} exact element={<Events />} />
            <Route path={ROUTES.LEARN} exact element={<Learn />} />
            <Route path={ROUTES.HEALTH} exact element={<Health />} />
            <Route path={ROUTES.EVENTS} exact element={<Events />} />
            <Route path={ROUTES.ADMINS} exact element={<Admins />} />
            <Route path={ROUTES.SETTING} exact element={<Settings />} />
            <Route path={ROUTES.DASHBOARD} exact element={<Dashboard />} />
            <Route path={ROUTES.INFORMATION} exact element={<Information />} />
            <Route path={ROUTES.ASSESMENT}>
              <Route path={ROUTES.ASSESMENT} exact element={<Assessment />} />
              <Route
                path={ROUTES.SINGLE_ASSESMENT}
                element={<SingleAssessment />}
              />
            </Route>
          </Route>
        </Routes>
      </ProtectedRoutes>
    </>
  )
}
