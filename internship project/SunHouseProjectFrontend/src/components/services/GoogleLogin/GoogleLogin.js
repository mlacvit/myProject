import React from 'react'
import { useDispatch } from 'react-redux'
import { LoginSocialGoogle } from 'reactjs-social-login'
import { loginUserRequest } from '../../../store/actions/usersActions'
import googleicon from '../../../assets/icons/google.svg'
import { GoogleAppId } from '../../../config'
import './GoogleLogin.scss'

const GoogleLogin = () => {
  const dispatch = useDispatch()

  const googleResponse = response => dispatch(loginUserRequest({ path: 'googleLogin', userData: response }))

  return (
    <LoginSocialGoogle
      client_id={GoogleAppId}
      scope="openid profile email"
      redirect_uri="http://localhost:3000"
      discoveryDocs="claims_supported"
      access_type="offline"
      typeResponse="idToken"
      onResolve={({ provider, data }) => {
        googleResponse(data)
      }}
      onReject={err => {
        console.log(err)
      }}
    >
      <img alt="google" src={googleicon} className="google" />
    </LoginSocialGoogle>
  )
}

export default GoogleLogin
