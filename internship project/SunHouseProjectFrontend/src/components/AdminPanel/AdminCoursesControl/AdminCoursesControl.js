import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchCoursesRequest, publishCourseRequest } from '../../../store/actions/coursesActions'
import Title from '../../UI/Title/Title'
import './AdminCourseControl.scss'
import MainButton from '../../UI/MainButton/MainButton'

const AdminCoursesControl = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const courses = useSelector(state => state.courses.courses)
  useEffect(() => {
    dispatch(fetchCoursesRequest())
  }, [dispatch])
  const handleCourse = id => {
    history.push(`/course/${id}`)
  }
  const publishCourse = id => {
    dispatch(publishCourseRequest(id))
  }
  return (
    <>
      <Title>Курсы</Title>
      <div className="course-control">
        {courses.map(course => (
          <div className="course-control__wrapper" key={course._id}>
            <div className="course-control__wrapper-info-block">
              <p className="course-control__wrapper-title">
                <span>{course.title}</span>
              </p>
              <hr />
              {course.description ? (
                <p className="course-control__wrapper-title">
                  Описание курса: <span className="course-control__wrapper-description">{course.description}</span>
                </p>
              ) : null}
            </div>
            <div>
              <MainButton
                text="Просмотр курса"
                onClick={() => handleCourse(course._id)}
                className="GreenButton course-control__wrapper-open-course"
              />
              <MainButton
                text={!course.publish ? 'Опубликовать' : 'Снять с публикации'}
                onClick={() => publishCourse(course._id)}
                className={!course.publish ? 'GreenButton' : 'course-control__wrapper-button'}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdminCoursesControl
