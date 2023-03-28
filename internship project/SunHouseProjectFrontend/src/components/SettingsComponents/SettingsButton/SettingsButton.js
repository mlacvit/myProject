import React from 'react'
import MainButton from '../../UI/MainButton/MainButton'
import './SettingsButton.scss'

const SettingsButton = ({ disabled }) => (
  <MainButton className="settings-button" text="Сохранить изменения" disabled={disabled} />
)

export default SettingsButton
