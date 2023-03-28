import { createSlice } from '@reduxjs/toolkit'

const name = 'notifications'

export const initialState = {
  notifications: [],
  notification: null,
  loading: false,
  error: null,
}

const notificationsSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchNotificationsRequest(state) {
      state.loading = true
      state.error = null
    },
    fetchNotificationsSuccess(state, action) {
      state.loading = false
      state.notifications = action.payload
    },
    fetchNotificationsFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    fetchNotificationRequest(state) {
      state.loading = true
      state.error = null
    },
    fetchNotificationSuccess(state, action) {
      state.loading = true
      state.notification = action.payload
    },
    fetchNotificationFailure(state, action) {
      state.loading = true
      state.error = action.payload
    },
    createNotificationRequest(state) {
      state.loading = true
      state.error = null
    },
    createNotificationSuccess(state) {
      state.loading = false
    },
    createNotificationFailure(state, action) {
      state.loading = true
      state.error = action.payload
    },
    viewNotificationsRequest(state) {
      state.loading = true
      state.error = false
    },
    viewNotificationsSuccess(state) {
      state.loading = true
    },
    viewNotificationsFailure(state, action) {
      state.loading = true
      state.error = action.payload
    },
    editNotificationRequest(state) {
      state.loading = true
      state.error = false
    },
    editNotificationSuccess(state) {
      state.loading = true
    },
    editNotificationFailure(state, action) {
      state.loading = true
      state.error = action.payload
    },
    deleteNotificationRequest(state) {
      state.loading = true
      state.error = false
    },
    deleteNotificationSuccess(state) {
      state.loading = true
    },
    deleteNotificationFailure(state, action) {
      state.loading = true
      state.error = action.payload
    },
  },
})

export default notificationsSlice
