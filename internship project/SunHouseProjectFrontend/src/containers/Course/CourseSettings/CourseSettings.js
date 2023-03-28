import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCourseRequest, updateCourseRequest } from '../../../store/actions/coursesActions'
import CourseSettingsLeft from './CourseSettingsLeft/CourseSettingsLeft'
import CourseSettingsRight from './CourseSettingsRight/CourseSettingsRight'
import CourseSettingsCard from './CourseSettingsCard/CourseSettingsCard'
import MainButton from '../../../components/UI/MainButton/MainButton'
import ButtonsContent from '../../../components/UI/ButtonsContent/ButtonsContent'
import './CourseSettings.scss'

const CourseSettings = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const course = useSelector(state => state.courses.course)

  useEffect(() => {
    if (!course) {
      dispatch(fetchCourseRequest(id))
    }
  }, [dispatch, id, course])

  const [state, setState] = useState({
    title: course?.title || '',
    description: course?.description || '',
    category: course.category,
    private: course?.private,
    image: course?.image || '',
  })

  const submitFormHandler = e => {
    e.preventDefault()
    const formData = new FormData()
    Object.keys(state).forEach(key => {
      formData.append(key, state[key])
    })
    dispatch(updateCourseRequest({ courseData: formData, id }))
  }

  return (
    <div className="container">
      {course && (
        <>
          <div className="course-settings">
            <div className="course-settings__left">
              <CourseSettingsCard course={course} setCourse={setState} />
            </div>
            <div className="course-settings__right">
              <ButtonsContent
                titleOne="Основные настройки"
                titleTwo="Настройки курса"
                childrenOne={<CourseSettingsLeft course={state} setCourse={setState} submit={submitFormHandler} />}
                childrenTwo={<CourseSettingsRight course={course} setCourse={setState} submit={submitFormHandler} />}
              />
              <MainButton
                disabled={!state.title || !state.description}
                className="GreenButton course-settings__right-save-button"
                type="submit"
                text="Сохранить изменения"
                onClick={submitFormHandler}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CourseSettings
