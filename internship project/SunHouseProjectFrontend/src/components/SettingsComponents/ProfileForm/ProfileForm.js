import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PersonalForm from './PersonalForm/PersonalForm'
import LocationForm from './LocationForm/LocationForm'
import ImageForm from './ImageForm/ImageForm'
import SettingsButton from '../SettingsButton/SettingsButton'
import { inputChangeHandler } from '../../UI/Form/Handlers/Handlers'
import { editRequest } from '../../../store/actions/usersActions'
import { ToastAlert } from '../../UI/Toast/ToastAlert'
import './ProfileForm.scss'

const ProfileForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)
  const [state, setState] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    avatar: '',
  })
  const [preview, setPreview] = useState('')

  useEffect(() => {
    const newState = {}
    if (user) {
      newState.name = user.name ? user.name : ''
      newState.username = user.username ? user.username : ''
      newState.email = user.email ? user.email : ''
      newState.avatar = user.avatar ? user.avatar : ''
      newState.phone = user.phone ? user.phone : ''
      newState.country = user.country ? user.country : ''
      newState.city = user.city ? user.city : ''

      setState(newState)
      setPreview(newState.avatar)
    }
  }, [user])

  const onChangeCountry = country => {
    setState(prev => ({
      ...prev,
      country: country.label,
    }))
  }

  const onChangeData = e => {
    inputChangeHandler(e, setState)
  }

  const onChangeAvatar = avatar => {
    const previewAvatar = URL.createObjectURL(avatar)

    setPreview(previewAvatar)
    setState(prev => ({
      ...prev,
      avatar,
    }))
  }

  const onClickSave = e => {
    e.preventDefault()

    if (state.username === '' || state.email === '') {
      ToastAlert({
        icon: 'error',
        title: 'username или email не может быть пустыми!',
        timer: 3000,
      })

      return
    }

    const formData = new FormData()

    Object.keys(state).forEach(key => {
      formData.append(key, state[key])
    })

    dispatch(editRequest(formData))
  }

  return (
    <form onSubmit={e => onClickSave(e)}>
      <div className="profile-form">
        <PersonalForm
          onChangeData={onChangeData}
          phone={state.phone}
          email={state.email}
          username={state.username}
          name={state.name}
        />
        <LocationForm
          onChangeData={onChangeData}
          onChangeCountry={onChangeCountry}
          city={state.city}
          country={state.country}
        />
        <ImageForm onChangeAvatar={onChangeAvatar} avatar={preview} />
      </div>
      <SettingsButton disabled={!state.username || !state.email} />
    </form>
  )
}

export default ProfileForm
