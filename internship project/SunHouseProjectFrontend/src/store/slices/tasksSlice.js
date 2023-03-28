import { createSlice } from '@reduxjs/toolkit'

const name = 'tasks'

export const initialState = {
  task: null,
  loading: false,
  error: null,
}

const tasksSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchTaskRequest(state) {
      state.loading = true
      state.error = null
    },
    fetchTaskSuccess(state, { payload: task }) {
      state.loading = false
      state.task = task
    },
    fetchTaskFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    createTaskRequest(state) {
      state.loading = true
      state.error = null
    },
    createTaskSuccess(state) {
      state.loading = false
    },
    createTaskFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    editTaskRequest(state) {
      state.loading = true
      state.error = null
    },
    editTaskSuccess(state) {
      state.loading = false
    },
    editTaskFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    deleteTaskRequest(state) {
      state.loading = true
      state.error = null
    },
    deleteTaskSuccess(state) {
      state.loading = false
    },
    deleteTaskFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    sendTaskRequest(state) {
      state.loading = true
      state.error = null
    },
    sendTaskSuccess(state) {
      state.loading = false
    },
    sendTaskFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    clearTask(state) {
      state.task = null
    },
  },
})

export default tasksSlice
