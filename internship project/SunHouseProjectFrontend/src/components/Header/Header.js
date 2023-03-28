import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import Nav from '../UI/Nav/Nav'
import MainButton from '../UI/MainButton/MainButton'
import Logo from '../UI/Logo/Logo'
import { historyPush } from '../../store/actions/historyActions'
import UserMenu from './UserMenu/UserMenu'
import { fetchCategoriesRequest } from '../../store/actions/categoriesActions'
import './Header.scss'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)

  useEffect(() => {
    dispatch(fetchCategoriesRequest())
  }, [dispatch])

  const onHeaderButton = () => {
    dispatch(historyPush('/login'))
  }

  return (
    <header className="header">
      <div className="container header__container">
        <Logo className="header_logo" />
        <Nav user={user} />

        {!user ? (
          <MainButton className="header_MainButton GreenButton" onClick={onHeaderButton} text="Войти" />
        ) : (
          <UserMenu user={user} />
        )}
      </div>
    </header>
  )
}

export default Header
