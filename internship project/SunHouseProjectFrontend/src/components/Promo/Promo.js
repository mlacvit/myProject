import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logo from '../UI/Logo/Logo'
import MainButton from '../UI/MainButton/MainButton'
import PromoImage from '../../assets/promo/Promo_image.png'
import './Promo.scss'

const title = 'Образовательная платформа'
const text =
  'С нами вы получите навыки, которые пригодятся в современном мире. \n' +
  'После наших курсов вы получаете сертификат подтверждающий \n' +
  'полученные вами навыки, Сертификат даст вам многочисленные \n' +
  'возможности для работы. Eduspace- развивайся вместе с нами!'

const Promo = () => {
  const user = useSelector(state => state.users.user)

  return (
    <div className="promo">
      <div className="container">
        <div className="promo_inner">
          <div className="promo_column_left">
            <h1 className="promo_title">{title}</h1>
            <Logo className="promo_logo" />
            <p className="promo_text">{text}</p>
            {!user && (
              <Link to="/registration" className="form_loginLink_span">
                <MainButton className="GreenButton promo_button" text="Зарегистрироваться" />
              </Link>
            )}
          </div>
          <div className="promo_column_right">
            <div className="promo_image">
              <img src={PromoImage} alt="Promo" className="promo_image_img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Promo
