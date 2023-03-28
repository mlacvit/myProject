import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../UI/Logo/Logo'
import MainButton from '../UI/MainButton/MainButton'
import UserMenu from '../Header/UserMenu/UserMenu'
import { historyPush } from '../../store/actions/historyActions'
import './Header2.scss'

const Header2 = () => {
  const user = useSelector(state => state.users.user)
  const dispatch = useDispatch()

  return (
    <header className="header-2">
      <div className="container">
        <div className="header-2__inner">
          <Logo className="header_logo" />
          {!user ? (
            <MainButton className="header_MainButton" onClick={() => dispatch(historyPush('/login'))} text="Войти" />
          ) : (
            <UserMenu user={user} />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header2
