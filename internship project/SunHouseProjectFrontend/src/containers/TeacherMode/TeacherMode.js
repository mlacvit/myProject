import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCourses, fetchTeacherCoursesRequest } from '../../store/actions/coursesActions'
import { fetchCategoriesRequest } from '../../store/actions/categoriesActions'
import Title from '../../components/UI/Title/Title'
import CreateCourseModal from '../../components/Modals/CreateCourseModal/CreateCourseModal'
import './TeacherMode.scss'
import CourseCard from '../../components/CourseCard/CourseCard'

const TeacherMode = () => {
  const dispatch = useDispatch()
  const courses = useSelector(state => state.courses.courses)
  const user = useSelector(state => state.users.user)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (user) {
      dispatch(fetchTeacherCoursesRequest(user._id))
      dispatch(fetchCategoriesRequest())
    }

    return () => {
      dispatch(clearCourses())
    }
  }, [dispatch, user])

  const openModal = () => setShow(true)

  return (
    <div className="teacher-mode">
      <Title>Режим преподавателя</Title>
      <div className="teacher-mode__cards">
        <button type="button" className="teacher-mode__button" onClick={openModal}>
          <div className="teacher-mode__button-top">
            <i className="teacher-mode__button-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M37.0312 0.10936C31.1094 0.67186 26.7031 1.92186 21.7188 4.45311C15.8125 7.46873 10.5156 12.2187 6.64062 17.9687C5.01562 20.4062 3.01562 24.5156 2.04688 27.4219C1.28125 29.7656 0.65625 32.4375 0.28125 35.0781C0.015625 36.9219 0.015625 43.0781 0.28125 44.9219C0.9375 49.5312 2.15625 53.5625 4.0625 57.4219C6.20312 61.7969 8.3125 64.7344 11.7812 68.2187C15.2344 71.6562 18.2188 73.7969 22.4219 75.8594C25.3594 77.2969 27.25 78 30.2344 78.75C38.0469 80.7187 45.8906 80.3437 53.5156 77.6406C55.8438 76.8125 59.875 74.7969 61.9531 73.4062C66.625 70.2969 70.9062 65.9062 73.9688 61.0937C75.0938 59.3281 76.9062 55.5781 77.6406 53.5C81.3125 43.1562 80.6719 32.0625 75.8438 22.3594C73.9062 18.4531 71.7344 15.375 68.6875 12.2344C65.3125 8.73436 62 6.32811 57.5781 4.14061C52.9531 1.85936 48.6406 0.624985 43.5156 0.156235C41.9219 0.0156097 38.3125 -0.0156403 37.0312 0.10936ZM41.7812 19.6875C42.0938 19.9062 42.5469 20.3594 42.7812 20.6875L43.2031 21.2969L43.2812 28.9687L43.3594 36.6406L51.0312 36.7187L58.7031 36.7969L59.3125 37.2187C59.6406 37.4531 60.0938 37.9062 60.3125 38.2344C60.6406 38.7187 60.7031 38.9844 60.7031 40C60.7031 41.0156 60.6406 41.2812 60.3125 41.7656C60.0938 42.0937 59.6406 42.5469 59.3125 42.7812L58.7031 43.2031L51.0312 43.2812L43.3594 43.3594L43.2812 51.0312L43.2031 58.7031L42.7812 59.3125C42.5469 59.6406 42.0938 60.0937 41.7656 60.3125C41.2812 60.6406 41.0156 60.7031 40 60.7031C38.9844 60.7031 38.7188 60.6406 38.2344 60.3125C37.9062 60.0937 37.4531 59.6406 37.2188 59.3125L36.7969 58.7031L36.7188 51.0312L36.6406 43.3594L28.9688 43.2812L21.2969 43.2031L20.6875 42.7812C19.7188 42.0937 19.3125 41.375 19.25 40.1719C19.1875 38.8906 19.6094 37.9687 20.6094 37.2656L21.2812 36.7969L28.9531 36.7187L36.6406 36.6406L36.7188 28.9531L36.7969 21.2812L37.2656 20.6094C37.9688 19.6094 38.8906 19.1875 40.1719 19.25C40.9531 19.2969 41.3438 19.4062 41.7812 19.6875Z"
                  fill="#ADFA00"
                />
              </svg>
            </i>
          </div>
          <h5 className="teacher-mode__button-text">Создать курс</h5>
        </button>
        {courses.length > 0 &&
          courses.map(course => (
            <CourseCard
              key={course._id}
              title={course.title}
              image={course.image}
              id={`/course/${course._id}`}
              price={course.price}
            />
          ))}
      </div>
      {show && <CreateCourseModal setOpen={setShow} />}
    </div>
  )
}

export default TeacherMode
