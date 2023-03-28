import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserRequest } from '../../store/actions/usersActions'
import { inputChangeHandler, submitFormHandler } from '../../components/UI/Form/Handlers/Handlers'
import FormComponent from '../../components/UI/Form/FormComponent/FormComponent'
import Logo from '../../components/UI/Logo/Logo'
import FooterLink from '../../components/Footer/FooterLink/FooterLink'
import VectorImage from '../../assets/images/Vector-2.png'
import './Login.scss'

const Login = () => {
  const dispatch = useDispatch()
  const error = useSelector(state => state.users.loginError)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  return (
    <>
      <div id="custom-toast" />
      <div className="main">
        <header className="header">
          <div className="container header__container">
            <Logo className="header_logo" />
          </div>
        </header>
        <div className="container">
          <div className="loginRegisterForm">
            <FormComponent
              title="Войдите в свой профиль"
              typeForm="Войти"
              submit={e => submitFormHandler(e, dispatch(loginUserRequest({ path: 'login', userData: user })))}
              onChange={e => inputChangeHandler(e, setUser)}
              inputName={['email', 'password']}
              placeholderName={['Электронная почта', 'Пароль']}
              inputType={['text', 'password']}
              value={user}
              error={error}
              endPoint="/registration"
              linkToPage="Зарегистрируйтесь"
              forgotLink="Забыли пароль?"
              disabled={!user.email || !user.password}
            />
            <div className="formBlock">
              <p className="formBlock_content">
                Авторизуйтесь, чтобы начать <span className="formBlock_word">учиться</span>
              </p>
              <img src={VectorImage} alt="Vector" />
            </div>
          </div>
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
    </>
  )
}

export default Login
