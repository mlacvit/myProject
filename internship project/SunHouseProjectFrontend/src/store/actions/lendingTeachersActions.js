import lendingTeachersSlice from '../slices/lendingTeachersSlice'

export const {
  fetchTeachersRequest,
  fetchTeachersSuccess,
  fetchTeachersFailure,
  createTeachersRequest,
  createTeachersSuccess,
  createTeachersFailure,
  deleteTeachersRequest,
  deleteTeachersSuccess,
  deleteTeachersFailure,
} = lendingTeachersSlice.actions
