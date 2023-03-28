import React from 'react'
import Logo from '../Logo/Logo'
import Avatar from '../Avatar/Avatar'

const MyProfileTop = ({ user }) => (
  <div className="profile__sidebar-top">
    <div className="profile__sidebar-top-logo">
      <Logo className="profile__logo" />
    </div>
    <div className="profile__sidebar-top-user">
      <Avatar className="profile__sidebar-top-user-avatar" user={user} />
      <p className="profile__sidebar-top-user-username">
        {user?.username}{' '}
        {user?.role === 'ban' ? (
          <span className="profile__sidebar-top-user-username-ban">Вы забанены, обратитесь к администратору</span>
        ) : null}
      </p>
    </div>
  </div>
)

export default MyProfileTop
