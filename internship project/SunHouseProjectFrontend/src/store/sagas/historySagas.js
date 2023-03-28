import { takeEvery } from 'redux-saga/effects'
import { historyPush, historyReplace } from '../actions/historyActions'

const historySagas = history => [
  takeEvery(historyPush, function* ({ payload }) {
    yield history.push(payload)
  }),
  takeEvery(historyReplace, function* ({ payload }) {
    yield history.replace(payload)
  }),
]

export default historySagas
