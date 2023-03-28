import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormComponent from '../../components/UI/Form/FormComponent/FormComponent'
import { inputChangeHandler, submitFormHandler } from '../../components/UI/Form/Handlers/Handlers'
import { registrationRequest } from '../../store/actions/usersActions'
import './Registration.scss'
import Logo from '../../components/UI/Logo/Logo'
import VectorImage from '../../assets/images/Vector-2.png'
import FooterLink from '../../components/Footer/FooterLink/FooterLink'

const Registration = () => {
  const dispatch = useDispatch()
  const error = useSelector(state => state.users.registerError)
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  })

  return (
    <>
      <div className="main">
        <header className="header">
          <div className="container header__container">
            <Logo className="header_logo" />
          </div>
        </header>
        <div className="container">
          <div className="loginRegisterForm">
            <FormComponent
              title="Создайте свой профиль"
              typeForm="Зарегистрироваться"
              submit={e => submitFormHandler(e, dispatch(registrationRequest({ ...user })))}
              onChange={e => inputChangeHandler(e, setUser)}
              inputName={['username', 'email', 'password']}
              placeholderName={['Имя', 'Электронная почта', 'Создайте пароль']}
              inputType={['text', 'text', 'password']}
              value={user}
              error={error}
              endPoint="/login"
              linkToPage="Войти"
              disabled={!user.email || !user.password || !user.username}
            />
            <div className="formBlock">
              <p className="formBlock_content">Добро пожаловать в Eduspace</p>
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

export default Registration
