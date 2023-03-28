import React from 'react'
import { NavLink } from 'react-router-dom'
import './SettingsNav.scss'

const SettingsNav = () => (
  <div className="block-buttons">
    <NavLink to="/user/settings/personal_data" className="block-buttons__button">
      Личные данные
    </NavLink>
    <NavLink to="/user/settings/change_password" className="block-buttons__button">
      Сменить пароль
    </NavLink>
  </div>
)

export default SettingsNav
