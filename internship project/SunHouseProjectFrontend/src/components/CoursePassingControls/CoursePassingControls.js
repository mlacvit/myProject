import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { checkUserPassedCourseRequest, updateUserContentStatusRequest } from '../../store/actions/usersActions'

const CoursePassingControls = ({ setModuleId, test }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const course = useSelector(state => state.courses.course)
  const user = useSelector(state => state.users.user)

  const [disabledWord, setDisabledWord] = useState('')
  const [endCourse, setEndCourse] = useState(false)

  const path = history.location.pathname
  const thisId = path.split('/').reverse()[0]

  useEffect(() => {
    const lastModule = course.modules[course.modules.length - 1]
    const lastEvent = lastModule.data[lastModule.data.length - 1]
    let firstModule
    let firstEvent
    if (course.modules.length) {
      firstModule = course.modules[0]
      if (firstModule.data.length) {
        firstEvent = firstModule.data[0]
      }
    }

    setDisabledWord('')

    if (lastEvent?._id === thisId) {
      setEndCourse(true)
    }
    if (firstEvent?._id === thisId) {
      setDisabledWord('previous')
    }
  }, [path, course, thisId])

  useEffect(() => {
    if (user && test) {
      const questionsLength = test.questions.length
      const userAnswers = user.tests.find(obj => obj.test === test._id)

      if (questionsLength !== userAnswers.answers.length) {
        setDisabledWord('next')
      }
    }
  }, [user, test])

  useEffect(() => {
    if (path.includes('task')) {
      course.modules.forEach(elem => {
        elem.data.forEach(item => {
          if (item._id === thisId && item.type === 'task') {
            if (user?.tasks.find(task => task.task === item._id).passed !== 'success') {
              return setDisabledWord('next')
            }
          }
          return null
        })
      })
    }
  }, [course, path, thisId, user])

  const nextEvent = () => {
    if (endCourse) {
      dispatch(checkUserPassedCourseRequest(course._id))
    } else {
      course.modules.map((elem, i) => {
        elem.data.map((item, index) => {
          if (item._id === thisId) {
            const newPath = path.split('/').slice(0, -2).join('/')
            let nextObj = elem.data[index + 1]
            if (!nextObj) {
              // eslint-disable-next-line prefer-destructuring
              setModuleId(course.modules[i + 1]._id)
              nextObj = course.modules[i + 1].data[0]
            }

            if (user[`${nextObj.type}s`].find(obj => obj[nextObj.type] === nextObj._id).status) {
              return history.replace(`${newPath}/${nextObj.type}/${nextObj._id}`)
            }

            return dispatch(
              updateUserContentStatusRequest({
                userId: user._id,
                content: nextObj,
                path: `${newPath}/${nextObj.type}/${nextObj._id}`,
              }),
            )
          }
          return item
        })
        return elem
      })
    }
  }

  const previousEvent = () => {
    course.modules.map((elem, i) => {
      elem.data.map((item, index) => {
        if (item._id === thisId) {
          const newPath = path.split('/').slice(0, -2).join('/')
          let nextObj = elem.data[index - 1]
          if (!nextObj) {
            // eslint-disable-next-line prefer-destructuring
            setModuleId(course.modules[i - 1]._id)
            nextObj = course.modules[i - 1].data[course.modules[i - 1].data.length - 1]
          }

          return history.replace(`${newPath}/${nextObj.type}/${nextObj._id}`)
        }
        return item
      })
      return elem
    })
  }

  return (
    <div className="course-passing__controls">
      <button
        className="course-passing__controls-button"
        disabled={disabledWord === 'previous'}
        onClick={previousEvent}
        type="button"
      >
        <i>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="24" transform="matrix(-1 0 0 1 48 0)" fill="#ADFA00" />
            <path
              d="M29.4199 31.76L21.6599 24L29.4199 16.24C30.1999 15.46 30.1999 14.2 29.4199 13.42C28.6399 12.64 27.3799 12.64 26.5999 13.42L17.4199 22.6C16.6399 23.38 16.6399 24.64 17.4199 25.42L26.5999 34.6C27.3799 35.38 28.6399 35.38 29.4199 34.6C30.1799 33.82 30.1999 32.54 29.4199 31.76Z"
              fill="#F2F2F7"
            />
          </svg>
        </i>
      </button>
      <button
        className="course-passing__controls-button"
        disabled={disabledWord === 'next'}
        onClick={nextEvent}
        type="button"
      >
        <i>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="24" fill="#ADFA00" />
            <path
              d="M18.5801 31.76L26.3401 24L18.5801 16.24C17.8001 15.46 17.8001 14.2 18.5801 13.42C19.3601 12.64 20.6201 12.64 21.4001 13.42L30.5801 22.6C31.3601 23.38 31.3601 24.64 30.5801 25.42L21.4001 34.6C20.6201 35.38 19.3601 35.38 18.5801 34.6C17.8201 33.82 17.8001 32.54 18.5801 31.76Z"
              fill="white"
            />
          </svg>
        </i>
      </button>
    </div>
  )
}

export default CoursePassingControls
