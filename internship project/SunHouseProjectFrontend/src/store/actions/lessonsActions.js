import lessonsSlice from '../slices/lessonsSlice'

export const {
  fetchLessonRequest,
  fetchLessonSuccess,
  fetchLessonFailure,
  createLessonRequest,
  createLessonSuccess,
  createLessonFailure,
  editLessonRequest,
  editLessonSuccess,
  editLessonFailure,
  deleteLessonRequest,
  deleteLessonSuccess,
  deleteLessonFailure,
  clearLesson,
} = lessonsSlice.actions
