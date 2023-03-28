import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReviewCard from './ReviewCard/ReviewCard'
import CustomSlider from '../UI/CustomSlider/CustomSlider'
import { fetchReviewsRequest } from '../../store/actions/lendingReviewsActions'
import { apiUrl } from '../../config'
import noPhoto from '../../assets/icons/cosmosChel.png'
import './ReviewsBlock.scss'

const sliderSettings = [
  {
    breakpoint: 1170,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '150px',
    },
  },
  {
    breakpoint: 870,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '50px',
    },
  },
  {
    breakpoint: 700,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
]
const ReviewsBlock = () => {
  const dispatch = useDispatch()
  const lendingReview = useSelector(state => state.reviews.reviews)

  useEffect(() => {
    dispatch(fetchReviewsRequest())
  }, [dispatch])

  return (
    <div className="review_block">
      <div className="container">
        <div className="review_block_headline">
          <h5 className="review_block_headline_title">отзывы</h5>
          <CustomSlider response={sliderSettings}>
            {lendingReview.map(review => (
              <ReviewCard
                key={review._id}
                img={review.image ? `${apiUrl}/uploads/${review.image}` : noPhoto}
                name={review.name}
                social={review.socialNetwork}
                content={review.description}
              />
            ))}
          </CustomSlider>
        </div>
      </div>
    </div>
  )
}

export default ReviewsBlock
