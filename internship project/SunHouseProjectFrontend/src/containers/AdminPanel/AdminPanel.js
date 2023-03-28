import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Switch } from 'react-router-dom'
import Cookies from 'js-cookie'
import MyProfileTop from '../../components/UI/MyProfileTop/MyProfileTop'
import AdminPanelBottom from './AdminPanelBottom/AdminPanelBottom'
import { ProtectedRoute } from '../../utils/utils'
import AllUsers from '../../components/AdminPanel/AllUsers/AllUsers'
import GetNotification from '../../components/AdminPanel/GetNotification/GetNotification'
import LendingReviews from '../../components/AdminPanel/LendingReviews/LendingReviews'
import AdminCoursesControl from '../../components/AdminPanel/AdminCoursesControl/AdminCoursesControl'
import Footer from '../../components/Footer/Footer'
import AddCategory from '../../components/AdminPanel/AddCategory/AddCategory'
import LendingTeachers from '../../components/AdminPanel/LendingTeachers/LendingTeachers'
import BurgerMenu from '../../components/UI/BurgerMenu/BurgerMenu'

const AdminPanel = () => {
  const user = useSelector(state => state.users.user)
  const [toggle, setToggle] = useState(false)

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
              <AdminPanelBottom />
            </div>
            <div className="profile__sidebar-bottom-burger">{toggle === true && <AdminPanelBottom />}</div>
          </div>
          <div className="profile__right">
            <Switch>
              <ProtectedRoute
                isAllowed={Cookies.get('jwt')}
                redirectTo="/login"
                path="/admin_panel/all_users"
                component={AllUsers}
              />
              <ProtectedRoute
                isAllowed={Cookies.get('jwt')}
                redirectTo="/login"
                path="/admin_panel/notifications"
                component={GetNotification}
              />
              <ProtectedRoute
                isAllowed={Cookies.get('jwt')}
                redirectTo="/login"
                path="/admin_panel/courses"
                component={AdminCoursesControl}
              />
              <ProtectedRoute
                isAllowed={Cookies.get('jwt')}
                redirectTo="/login"
                path="/admin_panel/reviews"
                component={LendingReviews}
              />
              <ProtectedRoute
                isAllowed={Cookies.get('jwt')}
                redirectTo="/login"
                path="/admin_panel/course_category_control"
                component={AddCategory}
              />
              <ProtectedRoute
                isAllowed={Cookies.get('jwt')}
                redirectTo="/login"
                path="/admin_panel/teachers"
                component={LendingTeachers}
              />
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminPanel
