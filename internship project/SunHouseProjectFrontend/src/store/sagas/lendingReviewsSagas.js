import { put, takeEvery } from 'redux-saga/effects'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import axiosApi from '../../axiosApi'
import {
  createReviewFailure,
  createReviewRequest,
  createReviewSuccess,
  deleteReviewFailure,
  deleteReviewRequest,
  deleteReviewSuccess,
  fetchReviewsFailure,
  fetchReviewsRequest,
  fetchReviewsSuccess,
} from '../actions/lendingReviewsActions'
import { ToastAlert } from '../../components/UI/Toast/ToastAlert'

export function* fetchReviewsSaga() {
  try {
    yield put(showLoading())
    const response = yield axiosApi(`/lending_reviews`)
    yield put(fetchReviewsSuccess(response.data))
    yield put(hideLoading())
  } catch (e) {
    yield put(hideLoading())
    yield put(fetchReviewsFailure(e))
  }
}

export function* createReviewSaga({ payload: reviewData }) {
  try {
    yield put(showLoading())
    yield axiosApi.post(`/lending_reviews`, reviewData)
    yield put(createReviewSuccess())
    yield put(hideLoading())
    yield put(fetchReviewsRequest())
    yield ToastAlert({
      icon: 'success',
      title: 'Создано',
    })
  } catch (e) {
    yield put(hideLoading())
    yield put(createReviewFailure(e))
  }
}

export function* deleteReviewSaga({ payload: id }) {
  try {
    yield put(showLoading())
    yield axiosApi.delete(`/lending_reviews/${id}`)
    yield put(deleteReviewSuccess())
    yield put(hideLoading())
    yield put(fetchReviewsRequest())
  } catch (e) {
    yield put(hideLoading())
    yield put(deleteReviewFailure(e))
  }
}

const lendingReviewsSagas = [
  takeEvery(fetchReviewsRequest, fetchReviewsSaga),
  takeEvery(createReviewRequest, createReviewSaga),
  takeEvery(deleteReviewRequest, deleteReviewSaga),
]

export default lendingReviewsSagas
