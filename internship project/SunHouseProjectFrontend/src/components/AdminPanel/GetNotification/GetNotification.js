import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersRequest } from '../../../store/actions/usersActions'
import Title from '../../UI/Title/Title'
import MainButton from '../../UI/MainButton/MainButton'
import './GetNotification.scss'
import Modal from '../../UI/Modal2/Modal'
import { inputChangeHandler } from '../../UI/Form/Handlers/Handlers'
import FormArea from '../../UI/Form/FormArea/FormArea'
import { createNotificationRequest } from '../../../store/actions/notificationsActions'

const GetNotification = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users)
  const [notification, setNotification] = useState({ description: '', user: '', email: '' })
  const [open, setOpen] = useState(false)
  useEffect(() => {
    dispatch(getAllUsersRequest())
  }, [dispatch])

  const submitMessage = e => {
    e.preventDefault()
    dispatch(createNotificationRequest(notification))
    setOpen(false)
    setNotification({ description: '', user: '', email: '' })
  }
  return (
    <div className="admin-notification">
      <Title>Отправить объявление</Title>
      <div className="admin-notification__inner-block">
        <h5 className="admin-notification__subtitle">Имя пользователя</h5>
        {users?.map(user => (
          <div key={user._id}>
            <div className="admin-notification__inner-block-wrapper">
              <p className="admin-notification__names">{user.username}</p>
              <button
                onClick={() => {
                  setOpen(true)
                  setNotification({ description: '', user: user._id, email: user.email })
                }}
                className="admin-notification__inner-block-button"
              >
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM17.6 4.25L10.53 8.67C10.21 8.87 9.79 8.87 9.47 8.67L2.4 4.25C2.15 4.09 2 3.82 2 3.53C2 2.86 2.73 2.46 3.3 2.81L10 7L16.7 2.81C17.27 2.46 18 2.86 18 3.53C18 3.82 17.85 4.09 17.6 4.25Z"
                    fill="#D1D1D6"
                  />
                </svg>
              </button>
            </div>
            <hr className="admin-notification__underline" />
          </div>
        ))}
      </div>
      {open ? (
        <Modal setOpen={setOpen}>
          <form>
            <h2>Отправить сообщение</h2>
            <p className="admin-notification__message-from">
              Сообщение для {!notification.email ? 'всех' : notification.email}
            </p>
            <FormArea
              required
              type="text"
              name="description"
              value={notification.description}
              placeholder="Напишите ваше сообщение"
              className="admin-notification__form-area"
              onChange={e => inputChangeHandler(e, setNotification)}
            />
            <MainButton
              text="Отправить сообщение"
              className={notification.description ? 'GreenButton' : 'GreenButton admin-notification__form-disabled'}
              onClick={e => submitMessage(e)}
              disabled={!notification.description}
            />
          </form>
        </Modal>
      ) : null}
      <MainButton
        text="Отправить всем"
        className="GreenButton"
        onClick={() => {
          setOpen(true)
          setNotification({ description: '', user: '', email: '' })
        }}
      />
    </div>
  )
}

export default GetNotification
