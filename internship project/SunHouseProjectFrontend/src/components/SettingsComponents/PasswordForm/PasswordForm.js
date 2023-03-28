import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ToastAlert } from '../../UI/Toast/ToastAlert'
import FormInput from '../../UI/Form/FormInput/FormInput'
import SettingsButton from '../SettingsButton/SettingsButton'
import { inputChangeHandler, submitFormHandler } from '../../UI/Form/Handlers/Handlers'
import { passwordRequest } from '../../../store/actions/usersActions'
import './PasswordForm.scss'

const PasswordForm = () => {
  const dispatch = useDispatch()
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    reNewPassword: '',
  })

  const onSubmit = e => {
    e.preventDefault()

    if (!passwords.newPassword || !passwords.oldPassword) {
      ToastAlert({
        icon: 'error',
        title: 'Введите верные данные!',
        timer: 3000,
      })
      return
    }

    if (passwords.newPassword !== passwords.reNewPassword) {
      ToastAlert({
        icon: 'error',
        title: 'Повторный пароль не совподает!',
        timer: 3000,
      })
      return
    }

    dispatch(
      submitFormHandler(e, passwordRequest({ password: passwords.oldPassword, newPassword: passwords.newPassword })),
    )
  }

  return (
    <form onSubmit={e => onSubmit(e)}>
      <div className="password-block">
        <h3 className="password-block__title">Заполните данные, чтобы изменить пароль</h3>
        <div className="password-block__form">
          <div>
            <FormInput
              className="password-block__form-input"
              type="password"
              onChange={e => inputChangeHandler(e, setPasswords)}
              name="oldPassword"
              placeholder="Старый пароль"
              value={passwords.oldPassword}
              required
            />
          </div>
          <div>
            <FormInput
              className="password-block__form-input"
              type="password"
              onChange={e => inputChangeHandler(e, setPasswords)}
              name="newPassword"
              placeholder="Новый пароль"
              value={passwords.newPassword}
              required
            />
          </div>
          <div>
            <FormInput
              className="password-block__form-input password-block__form-input--last"
              type="password"
              onChange={e => inputChangeHandler(e, setPasswords)}
              name="reNewPassword"
              placeholder="Повторите новый пароль"
              value={passwords.reNewPassword}
              required
            />
          </div>
        </div>
      </div>
      <SettingsButton disabled={!passwords.oldPassword || !passwords.newPassword || !passwords.reNewPassword} />
    </form>
  )
}

export default PasswordForm
