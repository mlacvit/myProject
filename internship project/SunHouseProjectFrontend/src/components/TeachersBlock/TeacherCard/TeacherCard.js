import React from 'react'
import './TeacherCard.scss'
import Avatar from '../../UI/Avatar/Avatar'

const TeacherCard = ({ user, description, deleteCard }) => (
  <div className="teacher_card">
    <div className="teacher_card_content">
      <div className="teacher_card_avatar">
        <Avatar user={user && user} className="teacher_card_avatar_image" />
      </div>
      <div className="teacher_card_text">
        <span className="teacher_card_text_name">{user && user.username}</span>
        {description && <p className="teacher_card_text_description">{description}</p>}
      </div>
    </div>
    {deleteCard ? (
      <button onClick={deleteCard} type="button" className="teacher_card__delete-btn">
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z"
            fill="#FF3B30"
          />
        </svg>
      </button>
    ) : null}
  </div>
)

export default TeacherCard
