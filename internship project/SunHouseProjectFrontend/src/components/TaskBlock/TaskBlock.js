import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ContentForm from '../ContentForm/ContentForm'
import { clearTask, editTaskRequest, fetchTaskRequest } from '../../store/actions/tasksActions'

const TaskBlock = () => {
  const { taskId } = useParams()
  const dispatch = useDispatch()
  const task = useSelector(state => state.tasks.task)
  const error = useSelector(state => state.tasks.error)

  useEffect(() => {
    dispatch(fetchTaskRequest(taskId))

    return () => {
      dispatch(clearTask())
    }
  }, [dispatch, taskId])

  const handleSaveTask = data => {
    dispatch(editTaskRequest(data))
  }

  return <> {task && <ContentForm contentData={task} contentId={taskId} handleSave={handleSaveTask} error={error} />}</>
}

export default TaskBlock
