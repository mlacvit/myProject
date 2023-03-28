import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiUrl } from '../../../config'
import { inputChangeHandler } from '../../UI/Form/Handlers/Handlers'
import {
  createReviewRequest,
  deleteReviewRequest,
  fetchReviewsRequest,
} from '../../../store/actions/lendingReviewsActions'
import Title from '../../UI/Title/Title'
import MainButton from '../../UI/MainButton/MainButton'
import FormInput from '../../UI/Form/FormInput/FormInput'
import FormArea from '../../UI/Form/FormArea/FormArea'
import ReviewCard from '../../ReviewsBlock/ReviewCard/ReviewCard'
import noPhoto from '../../../assets/icons/cosmosChel.png'
import './LendingReviews.scss'

const LendingReviews = () => {
  const dispatch = useDispatch()
  const [reviewState, setReviewState] = useState({ image: '', name: '', socialNetwork: '', description: '' })
  const reviews = useSelector(state => state.reviews.reviews)
  const [image, setImage] = useState(null)
  const fileChangeHandler = e => {
    setImage(URL.createObjectURL(e.target.files[0]))
    const { name } = e.target
    const file = e.target.files[0]
    setReviewState(prev => ({ ...prev, [name]: file }))
  }

  useEffect(() => {
    dispatch(fetchReviewsRequest())
  }, [dispatch])

  const submitFormHandler = e => {
    e.preventDefault()
    const formData = new FormData()
    Object.keys(reviewState).forEach(key => {
      formData.append(key, reviewState[key])
    })
    dispatch(createReviewRequest(formData))
    setReviewState({ image: '', name: '', socialNetwork: '', description: '' })
    setImage(null)
  }
  const deleteReviewCard = id => {
    dispatch(deleteReviewRequest(id))
  }
  return (
    <>
      <div className="reviews">
        <Title>Отзывы</Title>
        <div className="reviews__wrapper">
          <h4 className="reviews__subtitle">Добавить отзыв</h4>
          <div className="reviews__wrapper-inner">
            <div className="reviews__wrapper-inner2">
              <div className="reviews__input-label">
                <img
                  src={image || (reviewState.image ? `${apiUrl}/uploads/${reviewState.image}` : null)}
                  alt={reviewState.title}
                  className="reviews__input-label-image"
                />
                <input type="file" name="image" className="reviews__input-file" onChange={fileChangeHandler} />
                {!reviewState.image ? (
                  <i className="reviews__input-img">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M24 21.3333V2.66667C24 1.2 22.8 0 21.3333 0H2.66667C1.2 0 0 1.2 0 2.66667V21.3333C0 22.8 1.2 24 2.66667 24H21.3333C22.8 24 24 22.8 24 21.3333ZM7.86667 14.64L10.6667 18.0133L14.8 12.6933C15.0667 12.3467 15.6 12.3467 15.8667 12.7067L20.5467 18.9467C20.88 19.3867 20.56 20.0133 20.0133 20.0133H4.02667C3.46667 20.0133 3.16 19.3733 3.50667 18.9333L6.82667 14.6667C7.08 14.32 7.58667 14.3067 7.86667 14.64Z"
                        fill="white"
                      />
                    </svg>
                  </i>
                ) : null}
              </div>
              <div className="reviews__wrapper-inner3">
                <FormInput
                  required
                  type="text"
                  name="name"
                  value={reviewState.name}
                  placeholder="Имя"
                  className="reviews__input"
                  onChange={e => inputChangeHandler(e, setReviewState)}
                />
                <FormInput
                  type="text"
                  name="socialNetwork"
                  value={reviewState.socialNetwork}
                  className="reviews__input"
                  placeholder="instagram"
                  onChange={e => inputChangeHandler(e, setReviewState)}
                />
              </div>
            </div>
            <div className="reviews__textarea-wrapper">
              <FormArea
                required
                name="description"
                value={reviewState.description}
                cols="50"
                rows="10"
                placeholder="Тут будет текст отзыва"
                className="reviews__textarea"
                onChange={e => inputChangeHandler(e, setReviewState)}
                max="350"
              />
              <span
                className={
                  reviewState.description.length !== 350 ? 'reviews__textarea-counter' : 'reviews__textarea-counter-red'
                }
              >
                Количество символов: {reviewState.description.length}/350
              </span>
            </div>
          </div>
        </div>
        <MainButton
          disabled={!reviewState.name || !reviewState.image || !reviewState.description}
          text="Добавить"
          onClick={e => submitFormHandler(e)}
          type="submit"
          className={
            reviewState.name && reviewState.description && reviewState.image && reviewState.socialNetwork
              ? 'GreenButton reviews__button'
              : 'GreenButton reviews__button reviews__button-disabled'
          }
        />
      </div>

      <div className="teacher-inner-block">
        <h2 className="teacher-inner-block__title">Отзывы</h2>
        <div className="teacher-inner-block__content">
          {reviews.map(review => (
            <span key={review._id} className="teacher-inner-block__content-card">
              <ReviewCard
                img={review.image ? `${apiUrl}/uploads/${review.image}` : noPhoto}
                name={review.name}
                social={review.socialNetwork}
                content={review.description}
                deleteCard={() => deleteReviewCard(review._id)}
              />
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

export default LendingReviews
