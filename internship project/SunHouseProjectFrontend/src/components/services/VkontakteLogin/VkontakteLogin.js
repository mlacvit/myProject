import React from 'react'
import VkLogin from 'react-vkontakte-login'
import { useDispatch } from 'react-redux'
import { loginUserRequest } from '../../../store/actions/usersActions'
import vkicon from '../../../assets/icons/vkicon.svg'
import { VKAppId } from '../../../config'
import './VkontakteLogin.scss'

const VkontakteLogin = () => {
  const dispatch = useDispatch()

  const responseVk = response => {
    if (response.session) {
      dispatch(loginUserRequest({ path: 'vkLogin', userData: response }))
    }
  }

  return (
    <VkLogin
      apiId={VKAppId}
      callback={responseVk}
      render={renderProps => <img alt="vkicon" src={vkicon} onClick={renderProps.onClick} className="vkontakte" />}
    />
  )
}

export default VkontakteLogin
