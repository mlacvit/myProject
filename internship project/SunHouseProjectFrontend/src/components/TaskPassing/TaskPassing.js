import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastAlert } from '../UI/Toast/ToastAlert'
import { clearTask, fetchTaskRequest, sendTaskRequest } from '../../store/actions/tasksActions'
import PassingBlock from '../PassingBlock/PassingBlock'
import FilesUploader from '../FilesUploader/FilesUploader'
import MainButton from '../UI/MainButton/MainButton'
import CoursePassingControls from '../CoursePassingControls/CoursePassingControls'
import './TaskPassing.scss'
import { apiUrl } from '../../config'

const TaskPassing = ({ setModuleId }) => {
  const dispatch = useDispatch()
  const { courseId, taskId } = useParams()
  const task = useSelector(state => state.tasks.task)
  const user = useSelector(state => state.users.user)

  const [lastFile, setLastFile] = useState('')
  const [userTask, setUserTask] = useState(null)

  useEffect(() => {
    setLastFile('')
    setUserTask(null)

    dispatch(fetchTaskRequest(taskId))

    return () => {
      dispatch(clearTask())
    }
  }, [dispatch, taskId])

  useEffect(() => {
    if (user && task) {
      const taskUser = user.tasks.find(obj => obj.task === task._id)

      setUserTask(taskUser)
    }
  }, [user, task])

  const lastFileChangeHandler = e => {
    const selectedFile = e.target.files[0]
    setLastFile(selectedFile)
  }
  const sendHomework = () => {
    if (!lastFile) {
      return ToastAlert({
        timer: 3000,
        icon: 'error',
        title: `Выберите файл!`,
      })
    }

    const formData = new FormData()

    formData.append('file', lastFile)

    return dispatch(sendTaskRequest({ courseId, taskId, file: formData }))
  }

  return (
    task && (
      <>
        <PassingBlock event={task} />
        <div className="homework">
          <p className="homework__title">{userTask?.file ? 'Загруженное задание' : 'Загрузите задание'}</p>
          {userTask?.file && (
            <p className="passing_block__files-file">
              Файл:{' '}
              <a href={`${apiUrl}/uploads/${userTask.file}`} target="_blank" download rel="noreferrer">
                {userTask.file.slice(10)}
              </a>
            </p>
          )}
          <FilesUploader type="file" onChange={lastFileChangeHandler} />
          <MainButton
            disabled={userTask?.passed === 'success'}
            type="button"
            text="Отправить задание"
            className="GreenButton homework__button"
            onClick={sendHomework}
          />
        </div>
        <CoursePassingControls setModuleId={setModuleId} />
      </>
    )
  )
}

export default TaskPassing
