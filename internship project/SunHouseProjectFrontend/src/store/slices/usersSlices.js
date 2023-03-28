import { createSlice } from '@reduxjs/toolkit'

const name = 'users'

export const initialState = {
  user: null,
  users: null,
  getUsersLoading: false,
  getUsersError: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  deleteLoading: false,
  deleteError: null,
  banLoading: false,
  banError: null,
  editLoading: false,
  editError: null,
  passwordLoading: false,
  passwordError: null,
}

const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    getAllUsersRequest(state) {
      state.getUsersLoading = true
      state.getUsersError = null
    },
    getAllUsersSuccess(state, { payload: users }) {
      state.getUsersLoading = false
      state.getUsersError = null
      state.users = users
    },
    getAllUsersFailure(state, action) {
      state.getUsersLoading = false
      state.getUsersError = action.payload
    },
    registrationRequest(state) {
      state.registerLoading = true
      state.registerError = null
    },
    registrationSuccess(state, action) {
      state.registerLoading = false
      state.user = action.payload
    },
    registrationFailure(state, action) {
      state.registerLoading = false
      state.registerError = action.payload
    },
    loginUserRequest(state) {
      state.loginLoading = true
      state.loginError = null
    },
    loginUserSuccess(state, action) {
      state.loginLoading = false
      state.user = action.payload
    },
    loginUserFailure(state, action) {
      state.loginLoading = false
      state.loginError = action.payload
    },
    logoutUser(state) {
      state.user = null
    },
    deleteUserRequest(state) {
      state.deleteLoading = true
    },
    deleteUserSuccess(state) {
      state.deleteLoading = false
    },
    banUnbanRequest(state) {
      state.banLoading = true
    },
    banUnbanSuccess(state) {
      state.banLoading = false
    },
    banUnbanFailure(state, action) {
      state.banLoading = false
      state.banError = action.payload
    },
    deleteUserFailure(state, action) {
      state.deleteLoading = false
      state.deleteError = action.payload
    },
    verifyUserRequest(state) {
      state.verifyUserLoading = true
      state.verifyUserError = null
    },
    verifyUserSuccess(state, action) {
      state.verifyUserLoading = false
      state.verifyUserError = action.payload
    },
    verifyUserFailure(state, action) {
      state.verifyUserLoading = false
      state.verifyUserError = action.payload
    },
    forgotPasswordRequest(state) {
      state.forgotPasswordLoading = true
      state.forgotPasswordError = null
    },
    forgotPasswordSuccess(state, action) {
      state.forgotPasswordLoading = false
      state.forgotPasswordError = action.payload
    },
    forgotPasswordFailure(state, action) {
      state.forgotPasswordLoading = false
      state.forgotPasswordError = action.payload
    },
    resetPasswordRequest(state) {
      state.resetPasswordLoading = true
      state.resetPasswordError = null
    },
    resetPasswordSuccess(state, action) {
      state.resetPasswordLoading = false
      state.resetPasswordError = action.payload
    },
    resetPasswordFailure(state, action) {
      state.resetPasswordLoading = false
      state.resetPasswordError = action.payload
    },
    editRequest(state) {
      state.editLoading = true
      state.editError = null
    },
    editSuccess(state, action) {
      state.editLoading = false
      state.user = action.payload
    },
    editFailure(state, action) {
      state.editLoading = false
      state.editError = action.payload
    },
    passwordRequest(state) {
      state.passwordLoading = true
      state.passwordError = null
    },
    passwordSuccess(state) {
      state.passwordLoading = false
    },
    passwordFailure(state, action) {
      state.passwordLoading = false
      state.passwordError = action.payload
    },
    checkUserTaskRequest(state) {
      state.editLoading = true
      state.editError = null
    },
    checkUserTaskSuccess(state) {
      state.editLoading = false
    },
    checkUserTaskFailure(state, action) {
      state.editLoading = false
      state.editError = action.payload
    },
    updateUserContentStatusRequest(state) {
      state.editLoading = true
      state.editError = null
    },
    updateUserContentStatusSuccess(state, action) {
      state.editLoading = false
      state.user[`${action.payload.type}s`] = action.payload.data
    },
    updateUserContentStatusFailure(state, action) {
      state.editLoading = false
      state.editError = action.payload
    },
    checkUserPassedCourseRequest(state) {
      state.editLoading = true
      state.editError = null
    },
    checkUserPassedCourseSuccess(state, action) {
      if (action.payload) {
        state.user = action.payload
      }
      state.editLoading = false
    },
    checkUserPassedCourseFailure(state, action) {
      state.editLoading = false
      state.editError = action
    },
  },
})

export default usersSlice
