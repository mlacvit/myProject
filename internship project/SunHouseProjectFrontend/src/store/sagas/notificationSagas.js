import { put, takeEvery } from 'redux-saga/effects'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import axiosApi from '../../axiosApi'
import {
  createNotificationFailure,
  createNotificationRequest,
  createNotificationSuccess,
  deleteNotificationFailure,
  deleteNotificationRequest,
  deleteNotificationSuccess,
  editNotificationFailure,
  editNotificationRequest,
  editNotificationSuccess,
  fetchNotificationFailure,
  fetchNotificationRequest,
  fetchNotificationsFailure,
  fetchNotificationsRequest,
  fetchNotificationsSuccess,
  fetchNotificationSuccess,
  viewNotificationsFailure,
  viewNotificationsRequest,
  viewNotificationsSuccess,
} from '../actions/notificationsActions'
import { ToastAlert } from '../../components/UI/Toast/ToastAlert'

export function* fetchNotifications({ payload: userId }) {
  try {
    yield put(showLoading())
    const response = yield axiosApi(`/notifications?user=${userId}`)
    yield put(fetchNotificationsSuccess(response.data))
    yield put(hideLoading())
  } catch (e) {
    yield put(fetchNotificationsFailure(e))
    yield put(hideLoading())
  }
}

export function* fetchNotification({ payload: id }) {
  try {
    yield put(showLoading())
    const response = yield axiosApi(`/notifications/${id}`)
    yield put(fetchNotificationSuccess(response.data))
    yield put(hideLoading())
  } catch (e) {
    yield put(fetchNotificationFailure(e))
    yield put(hideLoading())
  }
}

export function* createNotification({ payload: notificationData }) {
  if (notificationData.email) {
    try {
      yield put(showLoading())
      yield axiosApi.post(`/notifications`, notificationData)
      yield put(createNotificationSuccess())
      yield put(hideLoading())
      yield ToastAlert({
        icon: 'success',
        title: 'Создано',
      })
    } catch (e) {
      yield put(createNotificationFailure(e))
      yield put(hideLoading())
    }
  } else {
    try {
      yield put(showLoading())
      yield axiosApi.post(`/notifications?params=all`, notificationData)
      yield put(createNotificationSuccess())
      yield put(hideLoading())
    } catch (e) {
      yield put(createNotificationFailure(e))
      yield put(hideLoading())
    }
  }
}

export function* viewNotification({ payload }) {
  try {
    yield put(showLoading())
    yield axiosApi.put(`/notifications`, { data: payload })
    yield put(viewNotificationsSuccess())
    yield put(hideLoading())
  } catch (e) {
    yield put(viewNotificationsFailure(e))
    yield put(hideLoading())
  }
}

export function* editNotification({ payload }) {
  const { id, notificationData } = payload

  try {
    yield put(showLoading())
    yield axiosApi.put(`/notifications/${id}`, notificationData)
    yield put(editNotificationSuccess())
    yield put(hideLoading())
  } catch (e) {
    yield put(editNotificationFailure(e))
    yield put(hideLoading())
  }
}

export function* deleteNotification({ payload }) {
  const { notificationId } = payload

  try {
    yield put(showLoading())
    yield axiosApi.delete(`/notifications/${notificationId}`)
    yield put(deleteNotificationSuccess())
    yield put(hideLoading())
  } catch (e) {
    yield put(deleteNotificationFailure(e))
    yield put(hideLoading())
  }
}

const notificationSagas = [
  takeEvery(fetchNotificationsRequest, fetchNotifications),
  takeEvery(fetchNotificationRequest, fetchNotification),
  takeEvery(createNotificationRequest, createNotification),
  takeEvery(viewNotificationsRequest, viewNotification),
  takeEvery(editNotificationRequest, editNotification),
  takeEvery(deleteNotificationRequest, deleteNotification),
]

export default notificationSagas
