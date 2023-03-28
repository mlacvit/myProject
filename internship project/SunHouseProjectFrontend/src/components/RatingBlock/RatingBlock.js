import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import Modal from '../UI/Modal2/Modal'
import FormArea from '../UI/Form/FormArea/FormArea'
import { inputChangeHandler } from '../UI/Form/Handlers/Handlers'
import { createRatingRequest } from '../../store/actions/coursesActions'
import './RatingBlock.scss'

const RatingBlock = ({ isOpen, courseId }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [reviewData, setReviewData] = useState({
    rating: 0,
    instagram: '',
    review: '',
  })

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const handleRating = rate =>
    setReviewData(prev => ({
      ...prev,
      rating: rate,
    }))

  const submitFormHandler = () => {
    dispatch(
      createRatingRequest({
        courseId,
        data: {
          rating: reviewData.rating,
          instagram: reviewData.instagram,
          review: reviewData.review,
        },
      }),
    )
    setOpen(false)
    setReviewData({ rating: 0, instagram: '', review: '' })
  }

  return (
    <div className="rating-block">
      {open && (
        <Modal setOpen={setOpen}>
          <button
            className="rating-block__modal-close"
            type="button"
            onClick={() => {
              setOpen(false)
            }}
          >
            <i>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 0C5.364 0 0 5.364 0 12C0 18.636 5.364 24 12 24C18.636 24 24 18.636 24 12C24 5.364 18.636 0 12 0ZM17.16 17.16C16.692 17.628 15.936 17.628 15.468 17.16L12 13.692L8.532 17.16C8.064 17.628 7.308 17.628 6.84 17.16C6.372 16.692 6.372 15.936 6.84 15.468L10.308 12L6.84 8.532C6.372 8.064 6.372 7.308 6.84 6.84C7.308 6.372 8.064 6.372 8.532 6.84L12 10.308L15.468 6.84C15.936 6.372 16.692 6.372 17.16 6.84C17.628 7.308 17.628 8.064 17.16 8.532L13.692 12L17.16 15.468C17.616 15.924 17.616 16.692 17.16 17.16Z"
                  fill="#D1D1D6"
                />
              </svg>
            </i>
          </button>
          <form className="rating-block__modal" onSubmit={e => submitFormHandler(e)}>
            <h3 className="rating-block__modal-title">Как вам наш онлайн курс?</h3>
            <p className="rating-block__modal-subtitle">Оцените пожалуйста</p>
            <Rating
              fillColor="#ADFA00"
              size="36px"
              onClick={handleRating}
              initialValue={reviewData.rating}
              className="rating-block__modal-stars"
            />
            <label htmlFor="instagram" className="rating-block__modal-field">
              <span className="rating-block__modal-field-label">Ваш Инстаграм</span>
              <input
                className="rating-block__modal-field-input"
                name="instagram"
                id="instagram"
                value={reviewData.instagram}
                onChange={e => inputChangeHandler(e, setReviewData)}
              />
            </label>
            <div className="rating-block__textarea-wrapper">
              <label htmlFor="review" className="rating-block__modal-field">
                <span className="rating-block__modal-field-label">Ваш отзыв</span>
                <FormArea
                  className="rating-block__textarea"
                  name="review"
                  id="review"
                  value={reviewData.review}
                  onChange={e => inputChangeHandler(e, setReviewData)}
                  max="350"
                />
                <span
                  className={`rating-block__textarea-counter ${
                    reviewData.review.length !== 350 ? '' : 'rating-block__textarea-counter--red'
                  }`}
                >
                  Количество символов: {reviewData.review.length}/350
                </span>
              </label>
            </div>
            <button className="rating-block__modal-btn" type="submit">
              Отправить
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default RatingBlock
