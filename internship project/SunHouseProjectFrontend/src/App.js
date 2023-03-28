import React from 'react'
import Cookies from 'js-cookie'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LoadingBar } from 'react-redux-loading-bar'
import Main from './containers/Main/Main'
import Registration from './containers/Registration/Registration'
import Login from './containers/Login/Login'
import { ProtectedRoute } from './utils/utils'
import CookieProvider from './components/UI/CookieProvider/CookieProvider'
import Course from './containers/Course/Course'
import MyProfile from './containers/MyProfile/MyProfile'
import VerifyPage from './containers/VerifyPage/VerifyPage'
import ForgotPasswordPage from './containers/ForgotPasswordPage/ForgotPasswordPage'
import ResetPasswordPage from './containers/ResetPasswordPage/ResetPasswordPage'
import AdminPanel from './containers/AdminPanel/AdminPanel'
import CatalogOfCourse from './containers/CatalogOfCourse/CatalogOfCourse'
import TeachersPage from './components/TeachersPage/TeachersPage'
import './scss/style.scss'
import CertificateObtain from './components/CertificateObtain/CertificateObtain'

const App = () => {
  const user = useSelector(state => state.users.user)
  const loading = useSelector(state => state.loadingBar.default)
  let access = false
  if (user?.role === 'admin') {
    access = true
  }
  return (
    <CookieProvider>
      <LoadingBar loading={loading} style={{ zIndex: 10000000, background: '#ADFA00' }} />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={Login} />
        <ProtectedRoute
          isAllowed={Cookies.get('jwt') || user?.token}
          redirectTo="/login"
          path="/user"
          component={MyProfile}
        />
        <Route path="/course/:id/end" exact component={CertificateObtain} />
        <Route path="/course/:id" component={Course} />
        <ProtectedRoute
          isAllowed={Cookies.get('jwt') || user?.token || access}
          redirectTo="/login"
          path="/admin_panel"
          component={AdminPanel}
        />

        <Route path="/course-catalog" component={CatalogOfCourse} />
        <Route path="/page-teachers" component={TeachersPage} />
        <Route path="/about" component={Main} />
        <Route path="/reviews" component={Main} />
        <Route path="/confirm/:confirmationCode" component={VerifyPage} />
        <Route path="/forgot" component={ForgotPasswordPage} />
        <Route path="/reset/:hash" component={ResetPasswordPage} />
      </Switch>
    </CookieProvider>
  )
}

export default App
