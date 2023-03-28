import { put, takeEvery } from 'redux-saga/effects'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import axiosApi from '../../axiosApi'
import { createModuleFailure, createModuleRequest, createModuleSuccess } from '../actions/modulesActions'
import { fetchCourseRequest } from '../actions/coursesActions'
import { ToastAlert } from '../../components/UI/Toast/ToastAlert'

export function* createModule({ payload }) {
  const { id, moduleData } = payload

  try {
    yield put(showLoading())
    yield axiosApi.post(`/modules?course=${id}`, moduleData)
    yield put(createModuleSuccess())
    yield put(fetchCourseRequest(id))
    yield put(hideLoading())

    yield ToastAlert({
      icon: 'success',
      title: 'Модуль успешно создан',
    })
  } catch (e) {
    yield put(createModuleFailure(e))
    yield put(hideLoading())
  }
}

const modulesSagas = [takeEvery(createModuleRequest, createModule)]

export default modulesSagas
