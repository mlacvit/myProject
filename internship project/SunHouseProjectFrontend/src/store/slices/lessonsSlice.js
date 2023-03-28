import { createSlice } from '@reduxjs/toolkit'

const name = 'lessons'

export const initialState = {
  lesson: null,
  loading: false,
  error: null,
}

const lessonsSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchLessonRequest(state) {
      state.loading = true
      state.error = null
    },
    fetchLessonSuccess(state, { payload: lesson }) {
      state.loading = false
      state.lesson = lesson
    },
    fetchLessonFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    createLessonRequest(state) {
      state.loading = true
      state.error = null
    },
    createLessonSuccess(state) {
      state.loading = false
    },
    createLessonFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    editLessonRequest(state) {
      state.loading = true
      state.error = null
    },
    editLessonSuccess(state) {
      state.loading = false
    },
    editLessonFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    deleteLessonRequest(state) {
      state.loading = true
      state.error = null
    },
    deleteLessonSuccess(state) {
      state.loading = false
    },
    deleteLessonFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    clearLesson(state) {
      state.lesson = null
    },
  },
})

export default lessonsSlice
