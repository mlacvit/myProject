import { createSlice } from '@reduxjs/toolkit'

const name = 'teachers'

export const initialState = {
  teachers: [],
  loading: false,
  error: null,
}

const lendingTeachersSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchTeachersRequest(state) {
      state.loading = true
      state.error = null
    },
    fetchTeachersSuccess(state, { payload: teachers }) {
      state.loading = false
      state.teachers = teachers
    },
    fetchTeachersFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    createTeachersRequest(state) {
      state.loading = true
      state.error = null
    },
    createTeachersSuccess(state) {
      state.loading = false
      state.error = null
    },
    createTeachersFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    deleteTeachersRequest(state) {
      state.loading = true
      state.error = false
    },
    deleteTeachersSuccess(state) {
      state.loading = true
    },
    deleteTeachersFailure(state, action) {
      state.loading = true
      state.error = action.payload
    },
  },
})

export default lendingTeachersSlice
