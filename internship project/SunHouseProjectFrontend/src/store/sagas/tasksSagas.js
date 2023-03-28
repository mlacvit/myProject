import { put, takeEvery } from 'redux-saga/effects'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import axiosApi from '../../axiosApi'
import {
  createTaskFailure,
  createTaskRequest,
  createTaskSuccess,
  deleteTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  editTaskFailure,
  editTaskRequest,
  editTaskSuccess,
  fetchTaskFailure,
  fetchTaskRequest,
  fetchTaskSuccess,
  sendTaskFailure,
  sendTaskRequest,
  sendTaskSuccess,
} from '../actions/tasksActions'
import { fetchCourseRequest } from '../actions/coursesActions'
import { historyPush } from '../actions/historyActions'
import { loginUserSuccess } from '../actions/usersActions'
import { ToastAlert } from '../../components/UI/Toast/ToastAlert'

export function* fetchTask({ payload: id }) {
  try {
    yield put(showLoading())
    const response = yield axiosApi(`/tasks/${id}`)
    yield put(fetchTaskSuccess(response.data))
    yield put(hideLoading())
  } catch (e) {
    yield put(fetchTaskFailure(e))
    yield put(hideLoading())
  }
}

export function* createTask({ payload }) {
  const { courseId, moduleId, taskData } = payload

  try {
    yield put(showLoading())
    const response = yield axiosApi.post(`/tasks?module=${moduleId}`, taskData)
    yield put(createTaskSuccess())
    yield put(fetchCourseRequest(courseId))
    yield put(hideLoading())
    yield put(historyPush(`/course/${courseId}/edit/task/${response.data._id}`))

    yield ToastAlert({
      title: 'Задание успешно создано',
      icon: 'success',
    })
  } catch (e) {
    yield put(createTaskFailure(e))
    yield put(hideLoading())
  }
}

export function* editTask({ payload }) {
  const { courseId, contentId, data } = payload

  try {
    yield put(showLoading())
    yield axiosApi.put(`/tasks/${contentId}?course=${courseId}`, data)
    yield put(editTaskSuccess())
    yield put(hideLoading())
    yield put(fetchTaskRequest(contentId))

    yield ToastAlert({
      title: 'Задание успешно изменено',
      icon: 'success',
    })
  } catch (e) {
    yield put(editTaskFailure(e))
    yield put(hideLoading())
  }
}

export function* deleteTask({ payload }) {
  const { taskId, courseId } = payload

  try {
    yield put(showLoading())
    yield axiosApi.delete(`/tasks/${taskId}?course=${courseId}`)
    yield put(deleteTaskSuccess())
    yield put(fetchCourseRequest(courseId))
    yield put(hideLoading())
    yield put(historyPush(`/course/${courseId}/edit`))

    yield ToastAlert({
      title: 'Задание успешно удалено',
      icon: 'success',
    })
  } catch (e) {
    yield put(deleteTaskFailure(e))
    yield put(hideLoading())
  }
}

export function* sendTaskSaga({ payload: { courseId, taskId, file } }) {
  try {
    yield put(showLoading())
    const response = yield axiosApi.put(`/users/add_task?course=${courseId}&task=${taskId}`, file)
    yield put(sendTaskSuccess())
    yield put(loginUserSuccess(response.data))
    yield put(hideLoading())

    yield ToastAlert({
      title: 'Задание успешно отправлено',
      icon: 'success',
    })
  } catch (e) {
    yield put(sendTaskFailure(e))
    yield put(hideLoading())
  }
}

const tasksSagas = [
  takeEvery(createTaskRequest, createTask),
  takeEvery(fetchTaskRequest, fetchTask),
  takeEvery(editTaskRequest, editTask),
  takeEvery(deleteTaskRequest, deleteTask),
  takeEvery(sendTaskRequest, sendTaskSaga),
]

export default tasksSagas
