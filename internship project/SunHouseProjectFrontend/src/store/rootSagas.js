import { all } from 'redux-saga/effects'
import userSagas from './sagas/usersSagas'
import historySagas from './sagas/historySagas'
import history from '../history'
import coursesSagas from './sagas/coursesSagas'
import categoriesSaga from './sagas/categoriesSaga'
import modulesSagas from './sagas/modulesSagas'
import tasksSagas from './sagas/tasksSagas'
import lessonsSagas from './sagas/lessonsSagas'
import testsSagas from './sagas/testsSagas'
import notificationsSagas from './sagas/notificationSagas'
import lendingReviewsSagas from './sagas/lendingReviewsSagas'
import lendingTeachersSagas from './sagas/lendingTeachersSagas'

export default function* rootSagas() {
  yield all([
    ...userSagas,
    ...coursesSagas,
    ...categoriesSaga,
    ...modulesSagas,
    ...tasksSagas,
    ...lessonsSagas,
    ...testsSagas,
    ...notificationsSagas,
    ...lendingReviewsSagas,
    ...lendingTeachersSagas,
    ...historySagas(history),
  ])
}
