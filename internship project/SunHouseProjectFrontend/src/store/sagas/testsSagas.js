import { put, takeEvery } from 'redux-saga/effects'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import axiosApi from '../../axiosApi'
import {
  createTestFailure,
  createTestRequest,
  createTestSuccess,
  deleteTestFailure,
  deleteTestRequest,
  deleteTestSuccess,
  editTestFailure,
  editTestQuestionsFailure,
  editTestQuestionsRequest,
  editTestQuestionsSuccess,
  editTestRequest,
  editTestSuccess,
  fetchTestFailure,
  fetchTestRequest,
  fetchTestSuccess,
  sendTestAnswersFailure,
  sendTestAnswersRequest,
  sendTestAnswersSuccess,
} from '../actions/testsActions'
import { fetchCourseRequest } from '../actions/coursesActions'
import { loginUserSuccess } from '../actions/usersActions'
import { historyPush } from '../actions/historyActions'
import { ToastAlert } from '../../components/UI/Toast/ToastAlert'

export function* fetchTest({ payload: id }) {
  try {
    yield put(showLoading())
    const response = yield axiosApi(`/tests/${id}`)
    yield put(fetchTestSuccess(response.data))
    yield put(hideLoading())
  } catch (e) {
    yield put(fetchTestFailure(e))
    yield put(hideLoading())
  }
}

export function* createTest({ payload }) {
  const { courseId, moduleId, testData } = payload

  try {
    yield put(showLoading())
    const response = yield axiosApi.post(`/tests?module=${moduleId}`, testData)
    yield put(createTestSuccess())
    yield put(fetchCourseRequest(courseId))
    yield put(hideLoading())
    yield put(historyPush(`/course/${courseId}/edit/test/${response.data._id}`))

    yield ToastAlert({
      title: 'Тест успешно создан',
      icon: 'success',
    })
  } catch (e) {
    yield put(createTestFailure(e))
    yield put(hideLoading())
  }
}

export function* editTest({ payload }) {
  const { courseId, contentId, data } = payload
  try {
    yield put(showLoading())
    yield axiosApi.put(`/tests/${contentId}?course=${courseId}`, data)
    yield put(editTestSuccess())
    yield put(fetchTestRequest(contentId))
    yield put(hideLoading())

    yield ToastAlert({
      title: 'Тест успешно изменен',
      icon: 'success',
    })
  } catch (e) {
    yield put(editTestFailure(e))
    yield put(hideLoading())
  }
}

export function* editTestQuestions({ payload }) {
  const { courseId, contentId, questions } = payload
  try {
    yield put(showLoading())
    yield axiosApi.put(`/tests/${contentId}/questions?course=${courseId}`, questions)
    yield put(editTestQuestionsSuccess())
    yield put(fetchTestRequest(contentId))
    yield put(hideLoading())
  } catch (e) {
    yield put(editTestQuestionsFailure(e))
    yield put(hideLoading())
  }
}

export function* deleteTest({ payload }) {
  const { testId, courseId } = payload

  try {
    yield put(showLoading())
    yield axiosApi.delete(`/tests/${testId}?course=${courseId}`)
    yield put(deleteTestSuccess())
    yield put(fetchCourseRequest(courseId))
    yield put(hideLoading())
    yield put(historyPush(`/course/${courseId}/edit`))

    yield ToastAlert({
      title: 'Тест успешно удален',
      icon: 'success',
    })
  } catch (e) {
    yield put(deleteTestFailure(e))
    yield put(hideLoading())
  }
}

export function* sendTestAnswersSaga({ payload: { testId, state } }) {
  try {
    yield put(showLoading())
    const response = yield axiosApi.patch(`/tests/${testId}`, { test: state })
    yield put(sendTestAnswersSuccess())
    yield put(loginUserSuccess(response.data))
    yield put(hideLoading())

    yield ToastAlert({
      title: 'Ответы успешно сохранены',
      icon: 'success',
    })
  } catch (e) {
    yield put(sendTestAnswersFailure(e))
    yield put(hideLoading())
  }
}

const testsSagas = [
  takeEvery(createTestRequest, createTest),
  takeEvery(fetchTestRequest, fetchTest),
  takeEvery(editTestRequest, editTest),
  takeEvery(editTestQuestionsRequest, editTestQuestions),
  takeEvery(deleteTestRequest, deleteTest),
  takeEvery(sendTestAnswersRequest, sendTestAnswersSaga),
]

export default testsSagas
