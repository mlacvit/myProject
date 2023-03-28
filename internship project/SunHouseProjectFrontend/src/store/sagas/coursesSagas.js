import { put, takeEvery } from 'redux-saga/effects'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import axiosApi from '../../axiosApi'
import {
  addUsersCourseFailure,
  addUsersCourseRequest,
  addUsersCourseSuccess,
  createCourseFailure,
  createCourseRequest,
  createCourseSuccess,
  createRatingFailure,
  createRatingRequest,
  createRatingSuccess,
  deleteCourseFailure,
  deleteCourseRequest,
  deleteCourseSuccess,
  editCourseHeaderImageFailure,
  editCourseHeaderImageRequest,
  editCourseHeaderImageSuccess,
  fetchCourseFailure,
  fetchCourseRequest,
  fetchCoursesFailure,
  fetchCoursesRequest,
  fetchCoursesSuccess,
  fetchCourseSuccess,
  fetchTeacherCoursesFailure,
  fetchTeacherCoursesRequest,
  fetchTeacherCoursesSuccess,
  fetchUserCoursesFailure,
  fetchUserCoursesRequest,
  fetchUserCoursesSuccess,
  getUserFailure,
  getUserRequest,
  getUserSuccess,
  joinTheCourseFailure,
  joinTheCourseRequest,
  joinTheCourseSuccess,
  publishCourseFailure,
  publishCourseRequest,
  publishCourseSuccess,
  updateCourseFailure,
  updateCourseRequest,
  updateCourseSuccess,
  visibilityFailure,
  visibilityRequest,
  visibilitySuccess,
} from '../actions/coursesActions'
import { historyPush } from '../actions/historyActions'
import { loginUserRequest } from '../actions/usersActions'
import { ToastAlert } from '../../components/UI/Toast/ToastAlert'

export function* fetchCourses({ payload }) {
  try {
    yield put(showLoading())
    let response

    if (payload) {
      if (payload.sort && payload.category) {
        response = yield axiosApi(`/courses?category=${payload.category}&sort=${payload.sort}`)
      } else if (payload.sort) {
        response = yield axiosApi(`/courses?sort=${payload.sort}`)
      } else if (payload.category) {
        response = yield axiosApi(`/courses?category=${payload.category}`)
      }
    } else {
      response = yield axiosApi(`/courses`)
    }

    yield put(fetchCoursesSuccess(response.data))
    yield put(hideLoading())
  } catch (e) {
    yield put(fetchCoursesFailure(e))
    yield put(hideLoading())
  }
}

export function* fetchCourse({ payload: id }) {
  try {
    yield put(showLoading())

    const response = yield axiosApi(`/courses?id=${id}`)
    yield put(fetchCourseSuccess(response.data))
    yield put(hideLoading())
  } catch (e) {
    yield put(fetchCourseFailure(e))
    yield put(hideLoading())
  }
}

export function* fetchTeacherCourses({ payload: teacherId }) {
  try {
    yield put(showLoading())

    const response = yield axiosApi(`/courses?teacherId=${teacherId}`)
    yield put(fetchTeacherCoursesSuccess(response.data))
    yield put(hideLoading())
  } catch (e) {
    yield put(fetchTeacherCoursesFailure(e))
    yield put(hideLoading())
  }
}

export function* getUser({ payload: data }) {
  try {
    yield put(showLoading())
    const response = yield axiosApi(`/courses/${data.courseId}/course?user=${data.userId}`)
    yield put(getUserSuccess(response.data))
    yield put(hideLoading())
  } catch (e) {
    yield put(getUserFailure(e))
    yield put(hideLoading())
  }
}

export function* fetchUserCourses({ payload: userId }) {
  try {
    yield put(showLoading())

    const response = yield axiosApi(`/courses?userId=${userId}`)
    yield put(fetchUserCoursesSuccess(response.data))
    yield put(hideLoading())
  } catch (e) {
    yield put(fetchUserCoursesFailure(e))
    yield put(hideLoading())
  }
}

export function* createCourse({ payload: courseData }) {
  try {
    yield put(showLoading())

    const response = yield axiosApi.post('/courses', courseData)
    yield put(createCourseSuccess())

    yield put(hideLoading())
    if (response.data) {
      yield put(historyPush(`/course/${response.data._id}`))
    }

    yield ToastAlert({
      title: 'Вы успешно создали курс',
      icon: 'success',
    })
  } catch (e) {
    yield put(createCourseFailure(e))
    yield put(hideLoading())
  }
}

export function* publishCourse({ payload: id }) {
  try {
    yield put(showLoading())
    const response = yield axiosApi.post(`/courses/${id}/publish`)
    yield put(publishCourseSuccess())
    yield put(hideLoading())
    yield put(fetchCoursesRequest())
    if (response.data.publish === true) {
      yield ToastAlert({
        title: 'Курс успешно опубликован',
        icon: 'success',
      })
    } else {
      yield ToastAlert({
        title: 'Курс снят с публикации',
        icon: 'error',
      })
    }
  } catch (e) {
    yield put(publishCourseFailure(e))
    yield put(hideLoading())
  }
}

export function* updateCourse({ payload }) {
  const { courseData, id } = payload

  try {
    yield put(showLoading())

    yield axiosApi.put(`/courses/${id}`, courseData)
    yield put(updateCourseSuccess())
    yield put(fetchCourseRequest(id))
    yield put(hideLoading())

    yield ToastAlert({
      title: 'Курс успешно изменён',
      icon: 'success',
    })
  } catch (e) {
    yield put(updateCourseFailure(e))
    yield put(hideLoading())
  }
}

export function* editCourseHeaderImageSaga({ payload }) {
  const { courseId, image } = payload

  try {
    yield put(showLoading())
    yield axiosApi.patch(`/courses/edit_image?course=${courseId}`, image)
    yield put(editCourseHeaderImageSuccess())
    yield put(hideLoading())
    yield put(fetchCourseRequest(courseId))

    yield ToastAlert({
      title: 'Шапка курса успешно изменена',
      icon: 'success',
    })
  } catch (e) {
    yield put(editCourseHeaderImageFailure())
    yield put(hideLoading())
  }
}

export function* addUsersCourse({ payload }) {
  const { idCourse, idUser, role } = payload
  yield put(showLoading())

  try {
    if (role === 'teachers') {
      yield axiosApi.put(`/courses/${idCourse}/add?courseId=${idCourse}&teacherId=${idUser}`)
    }
    if (role === 'users') {
      yield axiosApi.put(`/courses/${idCourse}/add?courseId=${idCourse}&userId=${idUser}`)
    }

    yield put(hideLoading())
    yield put(addUsersCourseSuccess())
    yield put(fetchCourseRequest(idCourse))
  } catch (e) {
    yield put(addUsersCourseFailure(e))
    yield put(hideLoading())
  }
}

export function* visibilityLending({ payload }) {
  const { formData, id } = payload
  try {
    yield put(showLoading())

    yield axiosApi.patch(`/courses/${id}/visible`, formData)
    yield put(visibilitySuccess())
    yield put(hideLoading())
    yield put(fetchCourseRequest(id))
  } catch (e) {
    yield put(visibilityFailure(e))
    yield put(hideLoading())
  }
}

export function* deleteCourse({ payload: id }) {
  try {
    yield put(showLoading())

    yield axiosApi.delete(`/courses/${id}`)
    yield put(deleteCourseSuccess())
    yield put(hideLoading())

    yield ToastAlert({
      title: 'Курс успешно удалён',
      icon: 'success',
    })
    yield put(historyPush(`/user/courses/teacher_mode`))
  } catch (e) {
    yield put(deleteCourseFailure(e))
    yield put(hideLoading())
  }
}

export function* joinTheCourseSaga({ payload: { courseId, firstId, userId } }) {
  try {
    yield put(showLoading())
    yield axiosApi.put(`/users/add_course?course=${courseId}`)
    yield put(joinTheCourseSuccess())
    yield put(hideLoading())

    if (firstId) {
      yield axiosApi.patch(`/users/${userId}/update_status?content=${firstId._id}&params=${firstId.type}`)
    }

    yield put(loginUserRequest())
    yield put(fetchCourseRequest(courseId))

    yield ToastAlert({
      title: 'Вы успешно записались на курс',
      icon: 'success',
    })
  } catch (e) {
    yield put(joinTheCourseFailure())
    yield put(hideLoading())
  }
}

export function* createRating({ payload: { courseId, data } }) {
  try {
    yield put(showLoading())
    const response = yield axiosApi.post(`/courses/${courseId}/rating_course`, data)
    yield put(createRatingSuccess(response.data))
    yield put(hideLoading())
  } catch (e) {
    yield put(createRatingFailure(e))
  }
}

const coursesSagas = [
  takeEvery(fetchCoursesRequest, fetchCourses),
  takeEvery(publishCourseRequest, publishCourse),
  takeEvery(fetchCourseRequest, fetchCourse),
  takeEvery(getUserRequest, getUser),
  takeEvery(fetchTeacherCoursesRequest, fetchTeacherCourses),
  takeEvery(fetchUserCoursesRequest, fetchUserCourses),
  takeEvery(createCourseRequest, createCourse),
  takeEvery(updateCourseRequest, updateCourse),
  takeEvery(editCourseHeaderImageRequest, editCourseHeaderImageSaga),
  takeEvery(addUsersCourseRequest, addUsersCourse),
  takeEvery(visibilityRequest, visibilityLending),
  takeEvery(deleteCourseRequest, deleteCourse),
  takeEvery(joinTheCourseRequest, joinTheCourseSaga),
  takeEvery(createRatingRequest, createRating),
]

export default coursesSagas
