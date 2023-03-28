import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './ResetPasswordPage.scss'
import Logo from '../../components/UI/Logo/Logo'
import { resetPasswordRequest } from '../../store/actions/usersActions'
import { inputChangeHandler, submitFormHandler } from '../../components/UI/Form/Handlers/Handlers'
import FooterLink from '../../components/Footer/FooterLink/FooterLink'

const ResetPasswordPage = ({ match }) => {
  const dispatch = useDispatch()
  const { hash } = match.params

  const [state, setState] = useState({
    newPassword: '',
    confirmPassword: '',
  })

  return (
    <div className="main">
      <header className="header">
        <div className="container header__container">
          <Logo className="header_logo" />
        </div>
      </header>
      <div className="container loginRegisterForm">
        <form
          onSubmit={e => submitFormHandler(e, dispatch(resetPasswordRequest({ ...state, hash })))}
          className="form form-block"
        >
          <h4 className="form_title">Сброс пароля</h4>
          <input
            name="newPassword"
            type="password"
            onChange={e => inputChangeHandler(e, setState)}
            placeholder="Введите пароль"
            value={state.newPassword}
            className="InputStyle form_input"
          />
          <input
            name="confirmPassword"
            type="password"
            onChange={e => inputChangeHandler(e, setState)}
            placeholder="Подтвердите пароль"
            value={state.confirmPassword}
            className="InputStyle form_input"
          />
          <button type="submit" className="form_btn form-block_btn">
            Сбросить
          </button>
        </form>
      </div>
      <footer className="footer_login">
        <div className="container">
          <div className="footer_bottom_loginRegisterForm">
            <p>«Eduspace» © Все права защищены / 2022</p>
            <FooterLink className="footer_link" href="#">
              Политика конфиденциальности
            </FooterLink>
            <FooterLink className="footer_link" href="#">
              Публичная оферта
            </FooterLink>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ResetPasswordPage
