import React from 'react'
import Title from '../../components/UI/Title/Title'
import ProfileForm from '../../components/SettingsComponents/ProfileForm/ProfileForm'
import PasswordForm from '../../components/SettingsComponents/PasswordForm/PasswordForm'
import ButtonsContent from '../../components/UI/ButtonsContent/ButtonsContent'
import './Settings.scss'

const Settings = () => (
  <div className="settings">
    <Title>Настройки профиля</Title>
    <div className="settings__block">
      <ButtonsContent
        titleOne="Личные данные"
        titleTwo="Сменить пароль"
        childrenOne={<ProfileForm />}
        childrenTwo={<PasswordForm />}
      />
    </div>
  </div>
)

export default Settings
