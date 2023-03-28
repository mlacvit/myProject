import React from 'react'
import './ProfileDescription.scss'

const ProfileDescription = ({ title, text }) => (
  <div className="description">
    <h3 className="description__title">{title}</h3>
    <p className="description__text">{text}</p>
  </div>
)

export default ProfileDescription
