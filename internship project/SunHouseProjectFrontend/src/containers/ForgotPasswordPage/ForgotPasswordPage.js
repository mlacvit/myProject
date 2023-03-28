import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { inputChangeHandler, submitFormHandler } from '../../components/UI/Form/Handlers/Handlers'
import { forgotPasswordRequest } from '../../store/actions/usersActions'
import Logo from '../../components/UI/Logo/Logo'
import FooterLink from '../../components/Footer/FooterLink/FooterLink'
import './ForgotPasswordPage.scss'

const ForgotPasswordPage = () => {
  const dispatch = useDispatch()

  const [state, setState] = useState({
    email: '',
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
          onSubmit={e => submitFormHandler(e, dispatch(forgotPasswordRequest({ ...state })))}
          className="form form-forget-block"
        >
          <h4 className="form_title">Введите почту для сброса пароля</h4>
          <input
            name="email"
            type="email"
            onChange={e => inputChangeHandler(e, setState)}
            placeholder="Email"
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

export default ForgotPasswordPage
