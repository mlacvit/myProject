import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../store/actions/usersActions'
import Avatar from '../../UI/Avatar/Avatar'
import { fetchNotificationsRequest } from '../../../store/actions/notificationsActions'
import './UserMenu.scss'

const UserMenu = ({ user }) => {
  const [menu, setMenu] = useState(false)
  const dispatch = useDispatch()
  const notifications = useSelector(state => state.notifications.notifications)
  const [unview, setUnview] = useState([])

  useEffect(() => {
    setUnview(notifications.filter(notification => notification.view === false))
  }, [notifications])

  let icon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.94062 4.16253C8.00469 3.04691 9.38281 2.32503 10.8828 2.08597C10.9946 2.06819 11.1731 2.05316 11.374 2.04182C11.419 2.02117 11.6799 2.01501 11.9922 2.01989C12.3045 2.01501 12.5654 2.02117 12.6103 2.04182C12.8113 2.05316 12.9898 2.06819 13.1016 2.08597C14.6016 2.32503 15.9797 3.04691 17.0437 4.16253C17.9812 5.13753 18.5766 6.25784 18.8719 7.61722C18.9656 8.04847 18.975 8.27347 19.0078 10.3828C19.0406 12.4735 19.05 12.7219 19.1437 13.1344C19.4578 14.5641 20.0906 15.6703 21.2109 16.7532C21.8438 17.3625 21.9844 17.6391 21.9844 18.2578C21.9844 18.6141 21.9609 18.7219 21.8578 18.9469C21.6141 19.4672 21.0984 19.8516 20.4891 19.9641C20.4816 19.9655 20.468 19.9669 20.4483 19.9682L20.4453 19.9688C20.2651 20.0039 16.1321 20.0203 11.9922 20.0192C7.85223 20.0203 3.71929 20.0039 3.53906 19.9688L3.53604 19.9682C3.5164 19.9669 3.50275 19.9655 3.49531 19.9641C2.88594 19.8516 2.37031 19.4672 2.12656 18.9469C2.02344 18.7219 2 18.6141 2 18.2578C2 17.6391 2.14063 17.3625 2.77344 16.7532C3.89375 15.6703 4.52656 14.5641 4.84062 13.1344C4.93437 12.7219 4.94375 12.4735 4.97656 10.3828C5.00937 8.27347 5.01875 8.04847 5.1125 7.61722C5.40781 6.25784 6.00312 5.13753 6.94062 4.16253ZM8.61875 21.9141C8.525 21.7266 8.30469 21.0985 8.30469 21.0188C8.30469 21.0181 8.31323 21.0174 8.32983 21.0168L8.325 21H11.9797H12.0047H15.6594L15.6545 21.0168C15.6711 21.0174 15.6797 21.0181 15.6797 21.0188C15.6797 21.0985 15.4594 21.7266 15.3656 21.9141C14.8875 22.861 14.0203 23.5688 12.975 23.8688C12.9406 23.8786 12.9037 23.8877 12.8648 23.8962C12.6391 23.9515 12.3178 23.9781 11.9922 23.9768C11.6666 23.9781 11.3453 23.9515 11.1196 23.8962C11.0807 23.8877 11.0438 23.8786 11.0094 23.8688C9.96406 23.5688 9.09687 22.861 8.61875 21.9141Z"
        fill="white"
      />
    </svg>
  )

  useEffect(() => {
    dispatch(fetchNotificationsRequest(user._id))
  }, [dispatch, user])

  const clickHandler = () => {
    setMenu(!menu)
  }
  const logoutHandler = async () => {
    await dispatch(logoutUser())
  }

  if (unview.length !== 0) {
    icon = (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.1327 0.0750046C16.1015 0.257817 15.1968 0.731255 14.4561 1.47188C13.4483 2.47969 12.9186 3.85313 12.9983 5.24532C13.0686 6.46407 13.514 7.51875 14.3108 8.37188C14.939 9.04219 15.5905 9.46407 16.4343 9.74532C17.0108 9.9375 17.5171 10.0031 18.2249 9.97032C20.4468 9.87657 22.2468 8.40469 22.8374 6.19688C22.9733 5.68125 23.0061 4.66407 22.903 4.11094C22.603 2.52188 21.5155 1.11563 20.0952 0.468755C19.1577 0.0468798 18.0936 -0.0984335 17.1327 0.0750046Z"
          fill="#ADFA00"
        />
        <path
          d="M9.89062 2.08596C8.39062 2.32503 7.0125 3.0469 5.94844 4.16253C5.01094 5.13753 4.41562 6.25784 4.12031 7.61721C4.02656 8.04846 4.01719 8.27346 3.98437 10.3828C3.95156 12.4735 3.94219 12.7219 3.84844 13.1344C3.53437 14.5641 2.90156 15.6703 1.78125 16.7532C1.14844 17.3625 1.00781 17.6391 1.00781 18.2578C1.00781 18.6141 1.03125 18.7219 1.13437 18.9469C1.37812 19.4672 1.89375 19.8516 2.50312 19.9641C2.87812 20.0344 19.0922 20.0391 19.4531 19.9688C20.0625 19.8516 20.6062 19.4438 20.8406 18.9235C20.9484 18.6797 20.9719 18.5719 20.9672 18.2578C20.9672 17.625 20.8594 17.4282 20.1703 16.7438C19.8516 16.425 19.4625 15.9985 19.3125 15.7922C18.6094 14.8453 18.1734 13.7203 18.0375 12.5203L17.9812 12.0141L17.5406 11.9813C14.6812 11.7797 12.2437 9.90003 11.3484 7.19534C11.0953 6.42659 11.0016 5.84534 11.0016 5.01565C11.0016 4.0594 11.1562 3.25315 11.5031 2.38596C11.5687 2.21721 11.625 2.06253 11.625 2.04846C11.625 1.99221 10.3031 2.02034 9.89062 2.08596Z"
          fill="#FFFFFF"
        />
        <path
          d="M7.3125 21.0188C7.3125 21.0985 7.53281 21.7266 7.62656 21.9141C8.10469 22.861 8.97187 23.5688 10.0172 23.8688C10.4953 24.0047 11.4375 24.0141 11.9062 23.8875C12.6469 23.6906 13.4062 23.2031 13.875 22.6266C14.1375 22.3078 14.4891 21.6375 14.5969 21.2438L14.6672 21H10.9875C8.96719 21 7.3125 21.0094 7.3125 21.0188Z"
          fill="#FFFFFF"
        />
      </svg>
    )
  }

  return (
    <div className="user-menu">
      {user?.role !== 'admin' ? (
        <Link className="user-menu__notification" to="/user/notifications">
          <i className="user-menu__icon"> {icon} </i>
        </Link>
      ) : null}

      <button type="button" className="TransparentButton user-menu__button" onClick={clickHandler}>
        <Avatar user={user} className="user-menu__img" />
      </button>
      {menu ? (
        <>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div className="user-menu__backdrop" onClick={clickHandler} />
          <div className="user-menu__list">
            <div className="user-menu__list-item">
              {user?.role === 'admin' ? (
                <Link className="user-menu__list-item-child" to="/admin_panel/all_users">
                  Панель админа
                </Link>
              ) : (
                <Link className="user-menu__list-item-child" to="/user/courses">
                  Мой профиль
                </Link>
              )}
            </div>
            <div className="user-menu__list-item">
              <button type="button" className="user-menu__list-item GreenButton" onClick={logoutHandler}>
                <p className="user-menu__list-item-child"> Выйти </p>
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default UserMenu
