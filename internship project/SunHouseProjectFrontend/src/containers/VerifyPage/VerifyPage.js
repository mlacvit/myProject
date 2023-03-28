import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './VerifyPage.scss'
import { verifyUserRequest } from '../../store/actions/usersActions'

const VerifyPage = ({ match }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(verifyUserRequest(match.params.confirmationCode))
  }, [match.params, dispatch])

  return (
    <div className="container">
      <div className="verify-block">
        <h3>Аккаунт подтвержден, можете зактрыть данную вкладку</h3>
        <Link to="/login" className="verify-block__link">
          Нажмите сюда
        </Link>
      </div>
    </div>
  )
}

export default VerifyPage
