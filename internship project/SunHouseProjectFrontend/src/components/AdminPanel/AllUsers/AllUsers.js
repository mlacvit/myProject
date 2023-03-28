import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../../UI/Title/Title'
import { banUnbanRequest, deleteUserRequest, getAllUsersRequest } from '../../../store/actions/usersActions'
import Modal from '../../UI/Modal2/Modal'
import MainButton from '../../UI/MainButton/MainButton'
import FormInput from '../../UI/Form/FormInput/FormInput'
import { inputChangeHandler } from '../../UI/Form/Handlers/Handlers'
import './AllUsers.scss'

const AllUsers = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users)
  const [open, setOpen] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [checkDelete, setCheckDelete] = useState(false)
  const [checkPassword, setCheckPassword] = useState({ password: '' })
  let a = true
  if (userInfo?.email === checkPassword.password) {
    a = false
  }
  useEffect(() => {
    dispatch(getAllUsersRequest())
  }, [dispatch])
  const deleteHandler = id => {
    dispatch(deleteUserRequest(id))
    setCheckDelete(false)
    setCheckPassword({ password: '' })
  }
  const blockUnblock = ({ id, newRole }) => {
    if (newRole === 'user') {
      dispatch(banUnbanRequest({ id, newRole: 'ban' }))
    }
    if (newRole === 'ban') {
      dispatch(banUnbanRequest({ id, newRole: 'user' }))
    }
    setOpen(false)
  }
  return (
    <div className="users">
      <Title className="title-users">Список пользователей</Title>
      <div className="users__inner-block">
        <h5 className="users__subtitle">Имя пользователя</h5>
        {users?.map(user => (
          <div
            key={user._id}
            onClick={() => {
              setOpen(true)
              setUserInfo(user)
            }}
          >
            <p className={user.role === 'ban' ? 'users__names-ban' : 'users__names'}>{user.username}</p>
            <hr className="users__underline" />
          </div>
        ))}
      </div>
      {open ? (
        <Modal setOpen={setOpen}>
          <div className="users__modal">
            <div className="users__modal-info">
              <p>Email: {userInfo.email}</p>
              <p>Username: {userInfo.username}</p>
              {userInfo.role === 'ban' ? <p style={{ color: 'red' }}>Заблокирован</p> : null}
            </div>
            <div className="users__modal-control">
              <MainButton
                text={userInfo.role === 'ban' ? ' Разблокировать' : 'Заблокировать'}
                className={
                  userInfo.role === 'ban'
                    ? 'GreenButton users__modal-control-green'
                    : 'GreenButton  users__modal-control-yellow'
                }
                onClick={() => blockUnblock({ id: userInfo?._id, newRole: userInfo?.role })}
              />
              <MainButton
                text="Удалить пользователя"
                className="GreenButton users__modal-control-red"
                onClick={() => {
                  setCheckDelete(true)
                  setOpen(false)
                }}
              />
            </div>
          </div>
        </Modal>
      ) : null}
      {checkDelete ? (
        <Modal setOpen={setCheckDelete}>
          <h3 className="users__modal-inner-title">Необходимо подтвердить удаление</h3>
          <h4 className="users__modal-inner-title">
            Введите <span className="users__modal-email">{userInfo.email}</span> пользователя которого хотите удалить
          </h4>
          <FormInput type="text" name="password" onChange={e => inputChangeHandler(e, setCheckPassword)} />
          <div className="users__modal-crutch">
            <MainButton
              text="Удалить"
              className={!a ? 'GreenButton users__modal-control-red' : 'GreenButton users__modal-control-gray'}
              disabled={a}
              onClick={() => deleteHandler(userInfo._id)}
            />
          </div>
        </Modal>
      ) : null}
    </div>
  )
}

export default AllUsers
