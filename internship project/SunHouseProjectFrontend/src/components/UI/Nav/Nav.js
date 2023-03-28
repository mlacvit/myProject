import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { historyPush } from '../../../store/actions/historyActions'
import './Nav.scss'

const Nav = ({ user }) => {
  const dispatch = useDispatch()
  return (
    <nav className="main-nav">
      <input id="menu-toggle" type="checkbox" />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button" />
      </label>
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <NavLink to="/course-catalog" className="main-nav__link" activeClassName="main-nav__link_active">
            Каталог курсов
          </NavLink>
        </li>
        <li className="main-nav__item">
          <a href="#about" className="main-nav__link" onClick={() => dispatch(historyPush('/'))}>
            О школе
          </a>
        </li>
        <li className="main-nav__item">
          <NavLink to="/page-teachers" className="main-nav__link" activeClassName="main-nav__link_active">
            Преподавателям
          </NavLink>
        </li>
        <li className="main-nav__item">
          <a href="#review" className="main-nav__link" onClick={() => dispatch(historyPush('/'))}>
            Отзывы
          </a>
        </li>
        {!user && (
          <li className="main-nav__item">
            <NavLink to="/registration" className="main-nav__link">
              Регистрация
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}
export default Nav
