import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotificationsRequest, viewNotificationsRequest } from '../../store/actions/notificationsActions'
import ButtonsContent from '../../components/UI/ButtonsContent/ButtonsContent'
import Title from '../../components/UI/Title/Title'
import './Notifications.scss'

const Notifications = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)
  const notifications = useSelector(state => state.notifications.notifications)
  const [active, setActive] = useState(true)
  const unViewNotifications = []
  const [unview, setUnview] = useState([])
  let icon = <div />

  useEffect(() => {
    if (user) dispatch(fetchNotificationsRequest(user._id))
  }, [dispatch, user])

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    notifications.map(not => {
      if (not.view === false) {
        unViewNotifications.push(not)
      }
    })
  }, [active, notifications])

  useEffect(() => {
    setUnview(notifications.filter(notification => notification.view === false))
  }, [notifications])

  const onActiveBtn = () => {
    if (unViewNotifications.length !== 0) {
      dispatch(viewNotificationsRequest(unViewNotifications))
      if (user) dispatch(fetchNotificationsRequest(user._id))
    }
    setActive(!active)
  }

  if (unview.length !== 0) {
    icon = (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.98311 0.0861969C3.74251 0.306121 2.65417 0.875668 1.7632 1.76664C0.550798 2.97904 -0.0864176 4.63129 0.00944668 6.3061C0.0940328 7.77226 0.629745 9.04105 1.58839 10.0674C2.34402 10.8737 3.12786 11.3813 4.14289 11.7196C4.8365 11.9508 5.44552 12.0298 6.29702 11.9903C8.96994 11.8775 11.1353 10.1068 11.8459 7.45083C12.0094 6.83053 12.0489 5.60685 11.9248 4.94144C11.5639 3.02979 10.2556 1.33807 8.54701 0.559879C7.41919 0.0523624 6.13912 -0.122449 4.98311 0.0861969Z"
          fill="#ADFA00"
        />
      </svg>
    )
  }

  return (
    <div className="notifications-card__content">
      <Title>Уведомления</Title>
      <div>
        <ButtonsContent
          onClickOne={onActiveBtn}
          onClickTwo={onActiveBtn}
          titleOne="Просмотренные"
          titleTwo={
            <>
              <i className="notifications-card__view-status__icon "> {icon}</i>
              Непросмотренные
            </>
          }
          childrenOne={
            notifications
              ? notifications.map(notific =>
                  notific.view ? (
                    <div className="notifications-card__textBlock" key={notific._id}>
                      <p className="notifications-card__textBlock__text">{notific.description}</p>
                    </div>
                  ) : null,
                )
              : notifications
          }
          childrenTwo={
            notifications
              ? notifications.map(notific =>
                  notific.view === false ? (
                    <div className="notifications-card__textBlock" key={notific._id}>
                      <p className="notifications-card__textBlock__text">{notific.description}</p>
                    </div>
                  ) : null,
                )
              : null
          }
        />
      </div>
    </div>
  )
}

export default Notifications
