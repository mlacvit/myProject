import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { Switch } from 'react-router-dom'
import MyProfileTop from '../../components/UI/MyProfileTop/MyProfileTop'
import UserCourses from '../UserCourses/UserCourses'
import TeacherMode from '../TeacherMode/TeacherMode'
import Notifications from '../Notifications/Notifications'
import Certificates from '../Certificates/Certificates'
import Settings from '../Settings/Settings'
import Footer from '../../components/Footer/Footer'
import { ProtectedRoute } from '../../utils/utils'
import BurgerMenu from '../../components/UI/BurgerMenu/BurgerMenu'
import './MyProfile.scss'
import MyProfileBottom from './MyProfileBottom/MyProfileBottom'

const MyProfile = () => {
  const user = useSelector(state => state.users.user)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="profile">
      <div className="container">
        <div className="profile__inner">
          <div className="profile__sidebar">
            <MyProfileTop user={user} />
            <div className="profile__sidebar_list" onClick={() => setToggle(toggleItems => !toggleItems)}>
              <BurgerMenu />
            </div>
            <div className="profile__sidebar-bottom-block">
              <MyProfileBottom />
            </div>
            <div className="profile__sidebar-bottom-burger">{toggle === true && <MyProfileBottom />}</div>
          </div>
          <div className="profile__right">
            <Switch>
              <ProtectedRoute
                isAllowed={Cookies.get('jwt') && user?.role !== 'ban'}
                redirectTo={user?.role === 'ban' ? '/user/notifications' : '/login'}
                path="/user/teacher_mode"
                component={TeacherMode}
              />
              <ProtectedRoute
                isAllowed={Cookies.get('jwt') && user?.role !== 'ban'}
                redirectTo={user?.role === 'ban' ? '/user/notifications' : '/login'}
                path="/user/courses"
                component={UserCourses}
              />
              <ProtectedRoute
                isAllowed={Cookies.get('jwt')}
                redirectTo="/login"
                path="/user/notifications"
                component={Notifications}
              />
              <ProtectedRoute
                isAllowed={Cookies.get('jwt') && user?.role !== 'ban'}
                redirectTo={user?.role === 'ban' ? '/user/notifications' : '/login'}
                path="/user/certificates"
                component={Certificates}
              />
              <ProtectedRoute
                isAllowed={Cookies.get('jwt') && user?.role !== 'ban'}
                redirectTo={user?.role === 'ban' ? '/user/notifications' : '/login'}
                path="/user/settings"
                component={Settings}
              />
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MyProfile
