import React from 'react'
import { apiUrl } from '../../../config'

const LearnCardText = ({ title, description, image, deleteBlock }) => (
  <div className="learn-plan-block__card">
    {deleteBlock ? (
      <button className="learn-plan-block__delete-btn" type="button" onClick={deleteBlock}>
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z"
            fill="#FF3B30"
          />
        </svg>
      </button>
    ) : null}
    {image && (
      <img src={typeof image === 'string' ? `${apiUrl}/uploads/${image}` : URL.createObjectURL(image)} alt={title} />
    )}
    <div className="learn-plan-block__card-description">
      <p className="learn-plan-block__card-title">{title}</p>
      <p className="learn-plan-block__add-link">{description}</p>
    </div>
  </div>
)

export default LearnCardText
