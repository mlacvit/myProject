import { createSlice } from '@reduxjs/toolkit'

const name = 'categories'

export const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
}

const categoriesSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchCategoriesRequest(state) {
      state.loading = true
      state.error = null
    },
    fetchCategoriesSuccess(state, action) {
      state.loading = false
      state.categories = action.payload
    },
    fetchCategoriesFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },

    fetchCategoryRequest(state) {
      state.loading = true
      state.error = null
    },
    fetchCategorySuccess(state, action) {
      state.loading = false
      state.category = action.payload
    },
    fetchCategoryFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },

    createCategoryRequest(state) {
      state.loading = true
      state.error = null
    },
    createCategorySuccess(state) {
      state.loading = false
    },
    createCategoryFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },

    updateCategoryRequest(state) {
      state.loading = true
      state.error = null
    },
    updateCategorySuccess(state) {
      state.loading = false
    },
    updateCategoryFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },

    deleteCategoryRequest(state) {
      state.loading = true
      state.error = null
    },
    deleteCategorySuccess(state) {
      state.loading = false
    },
    deleteCategoryFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export default categoriesSlice
