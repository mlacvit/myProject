import React from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from '../../config'
import courseDefaultAvatar from '../../assets/images/courseDefaultAvatar.png'
import './CourseCard.scss'

const CourseCard = ({ id, title, image, price }) => {
  let courseImage = courseDefaultAvatar

  if (image) {
    if (image.includes('fixtures')) {
      courseImage = `${apiUrl}/${image}`
    } else {
      courseImage = `${apiUrl}/uploads/${image}`
    }
  }

  return (
    <Link className="course-card" to={id}>
      <img src={courseImage} alt={title} className="course-card__image" />
      <h5 className="course-card__title">{title}</h5>
      {price !== undefined && <span className="course-card__price">{price ? `${price} сом` : 'Бесплатно'}</span>}
    </Link>
  )
}
export default CourseCard
