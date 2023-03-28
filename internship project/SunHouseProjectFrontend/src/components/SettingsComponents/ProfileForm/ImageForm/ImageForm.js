import React, { useRef } from 'react'
import ProfileDescription from '../ProfileDescription/ProfileDescription'
import MainButton from '../../../UI/MainButton/MainButton'
import './ImageForm.scss'
import notImage from '../../../../assets/images/notImage.png'
import { apiUrl } from '../../../../config'

const ImageForm = ({ onChangeAvatar, avatar }) => {
  const inputRef = useRef()
  let avatarImg = notImage

  if (avatar) {
    if (avatar.match(/http/) || avatar.match(/https/)) {
      avatarImg = avatar
    } else if (avatar.includes('fixtures')) {
      avatarImg = `${apiUrl}/${avatar}`
    } else {
      avatarImg = `${apiUrl}/uploads/${avatar}`
    }
  }

  const onFileChange = e => {
    if (e.target.files[0]) {
      onChangeAvatar(e.target.files[0])
    } else {
      onChangeAvatar('')
    }
  }

  const activateInput = () => {
    inputRef.current.click()
  }

  return (
    <div className="image-block">
      <ProfileDescription title="Фото аккаунта" text="Разнообразный и богатый опыт сложившаяся структура" />
      <div className="image-block__form">
        <div className="image-block__form-image-block">
          <img src={avatarImg} alt="Avatar" />
        </div>
        <input onChange={onFileChange} name="avatar" type="file" className="image-block__form-file" ref={inputRef} />
        <MainButton onClick={activateInput} type="button" text="Изменить фото" className="image-block__form-button" />
      </div>
    </div>
  )
}
export default ImageForm
