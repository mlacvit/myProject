import lendingReviewsSlice from '../slices/lendingReviewsSlice'

export const {
  fetchReviewsRequest,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  createReviewRequest,
  createReviewSuccess,
  createReviewFailure,
  editReviewRequest,
  editReviewSuccess,
  editReviewFailure,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFailure,
} = lendingReviewsSlice.actions
