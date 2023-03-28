import tasksSlice from '../slices/tasksSlice'

export const {
  fetchTaskRequest,
  fetchTaskSuccess,
  fetchTaskFailure,
  createTaskRequest,
  createTaskSuccess,
  createTaskFailure,
  editTaskRequest,
  editTaskSuccess,
  editTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
  sendTaskRequest,
  sendTaskSuccess,
  sendTaskFailure,
  clearTask,
} = tasksSlice.actions
