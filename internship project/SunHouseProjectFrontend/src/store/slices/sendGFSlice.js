import { createSlice } from '@reduxjs/toolkit'

const name = 'googleFormSend'

export const initialState = {
  data: [],
  loading: false,
  error: null,
}

const googleFormSlice = createSlice({
  name,
  initialState,
  reducers: {
    sendGFRequest(state) {
      state.loading = true
      state.error = null
    },
    sendGFSuccess(state) {
      state.loading = false
    },
    sendGFFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export default googleFormSlice
