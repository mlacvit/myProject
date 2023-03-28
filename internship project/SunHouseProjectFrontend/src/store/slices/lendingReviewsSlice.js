import { createSlice } from '@reduxjs/toolkit'

const name = 'reviews'

export const initialState = {
  reviews: [],
  loading: false,
  error: null,
}

const lendingReviewsSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchReviewsRequest(state) {
      state.loading = true
      state.error = null
    },
    fetchReviewsSuccess(state, action) {
      state.loading = false
      state.reviews = action.payload
    },
    fetchReviewsFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    createReviewRequest(state) {
      state.loading = true
      state.error = null
    },
    createReviewSuccess(state) {
      state.loading = false
    },
    createReviewFailure(state, action) {
      state.loading = true
      state.error = action.payload
    },
    editReviewRequest(state) {
      state.loading = true
      state.error = false
    },
    editReviewSuccess(state) {
      state.loading = true
    },
    editReviewFailure(state, action) {
      state.loading = true
      state.error = action.payload
    },
    deleteReviewRequest(state) {
      state.loading = true
      state.error = false
    },
    deleteReviewSuccess(state) {
      state.loading = true
    },
    deleteReviewFailure(state, action) {
      state.loading = true
      state.error = action.payload
    },
  },
})

export default lendingReviewsSlice
