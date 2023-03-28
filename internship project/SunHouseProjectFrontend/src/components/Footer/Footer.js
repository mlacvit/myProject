import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Logo from '../UI/Logo/Logo'
import FooterIcon from './FooterIcon/FooterIcon'
import FooterLink from './FooterLink/FooterLink'
import { courses, information } from './footerData'
import { historyPush } from '../../store/actions/historyActions'
import './Footer.scss'

const Footer = () => {
  const dispatch = useDispatch()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_top">
          <div className="footer_top_col">
            <div className="footer_top_logo">
              <Logo className="footer_logo" />
            </div>
            <div className="footer_top_social_icons">
              <FooterIcon href="#" className="footer_icon footer_icon_vk" />
              <FooterIcon href="#" className="footer_icon footer_icon_yt" />
              <FooterIcon href="#" className="footer_icon footer_icon_tg" />
              <FooterIcon href="#" className="footer_icon footer_icon_inst" />
            </div>
          </div>
          <div className="footer_top_col">
            <h6 className="footer_top_title">Курсы</h6>
            {courses &&
              courses.map(course => (
                <NavLink to={`/course/${course._id}`} key={course._id} className="footer_link">
                  {course}
                </NavLink>
              ))}
          </div>
          <div className="footer_top_col">
            <h6 className="footer_top_title">Информация</h6>
            {information.map((info, index) => (
              <FooterLink key={index} href={info.id} className="footer_link" onClick={() => dispatch(historyPush('/'))}>
                {info.text}
              </FooterLink>
            ))}
          </div>
          <div className="footer_top_col" id="contact">
            <h6 className="footer_top_title">Контакты</h6>
            <p className="footer_top_text footer_top_text_email">space@eduspace.kg</p>
            <p className="footer_top_text footer_top_text_phone">+996 777 09 07 09</p>
            <p className="footer_top_text footer_top_text_pin">ул. Неизвестно 105</p>
          </div>
        </div>
      </div>
      <div className="footer_bottom">
        <div className="container">
          <div className="footer_bottom_inner">
            <p>«Eduspace» © Все права защищены / {new Date().getFullYear()}</p>
            <FooterLink className="footer_link" href="#">
              Политика конфиденциальности
            </FooterLink>
            <FooterLink className="footer_link" href="#">
              Публичная оферта
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
