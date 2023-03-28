import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { loginUserRequest } from '../../../store/actions/usersActions'

const CookieProvider = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (Cookies.get('jwt')) {
      dispatch(loginUserRequest())
    }
  }, [dispatch])

  return <>{children}</>
}

export default CookieProvider
