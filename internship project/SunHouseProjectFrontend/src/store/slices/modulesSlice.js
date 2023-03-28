import { createSlice } from '@reduxjs/toolkit'

const name = 'modules'

export const initialState = {
  loading: false,
  error: null,
}

const modulesSlice = createSlice({
  name,
  initialState,
  reducers: {
    createModuleRequest(state) {
      state.loading = true
      state.error = null
    },
    createModuleSuccess(state) {
      state.loading = false
    },
    createModuleFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export default modulesSlice
