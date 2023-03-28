import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../../components/UI/Title/Title'
import { clearCourses, fetchUserCoursesRequest } from '../../store/actions/coursesActions'
import CourseCard from '../../components/CourseCard/CourseCard'
import './UserCourses.scss'

const UserCourses = () => {
  const user = useSelector(state => state.users.user)
  const courses = useSelector(state => state.courses.courses)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(fetchUserCoursesRequest(user._id))
    }

    return () => {
      dispatch(clearCourses())
    }
  }, [dispatch, user])

  return (
    <div className="user-courses">
      <Title>Мои курсы</Title>
      <div className="user-courses__bottom">
        <div className="user-courses__bottom-courses">
          {courses.length ? (
            <>
              {courses.map(course => (
                <CourseCard
                  key={course._id}
                  title={course.title}
                  date={course.date}
                  image={course.image}
                  id={`/course/${course._id}`}
                />
              ))}
            </>
          ) : (
            <h2>Вы пока не записаны на курсы</h2>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserCourses
