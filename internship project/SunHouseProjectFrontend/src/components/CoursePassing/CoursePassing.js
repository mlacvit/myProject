import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseRequest } from '../../store/actions/coursesActions'
import CourseTitle from '../CourseTitle/CourseTitle'
import LessonPassing from '../LessonPassing/LessonPassing'
import './CoursePassing.scss'
import CoursePassingModules from '../CoursePassingModule/CoursePassingModule'
import TaskPassing from '../TaskPassing/TaskPassing'
import TestPassing from '../TestPassing/TestPassing'

const CoursePassing = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const course = useSelector(state => state.courses.course)
  const user = useSelector(state => state.users.user)

  const [moduleId, setModuleId] = useState(null)

  useEffect(() => {
    if (!course) {
      dispatch(fetchCourseRequest(id))
    }
  }, [dispatch, course, id])

  useEffect(() => {
    if (course) {
      course.modules.forEach(module => {
        module.data.forEach((item, index) => {
          if (user && user[`${item.type}s`].find(elem => elem[item.type] === item?._id)?.status) {
            if (module.data[index + 1]) {
              if (
                !user[`${module.data[index + 1].type}s`]?.find(
                  elem => elem[module.data[index + 1].type] === module.data[index + 1]._id,
                ).status
              ) {
                setModuleId(module._id)
                return history.push(`/course/${id}/pass/${item.type}/${item._id}`)
              }

              return null
            }

            setModuleId(module._id)
            return history.push(`/course/${id}/pass/${item.type}/${item._id}`)
          }
          return null
        })
      })
    }
  }, [course, user, history, id])

  return (
    <>
      {course && (
        <div className="course-passing">
          <CourseTitle courseId={id} title={course.title} description={course.description} image={course.image} />
          <div className="container">
            <div className="course-passing__bottom">
              <div className="course-edit__left">
                <CoursePassingModules course={course} moduleId={moduleId} />
              </div>
              <div className="course-passing__right">
                <Switch>
                  <Route
                    path="/course/:courseId/pass/lesson/:lessonId"
                    render={() => <LessonPassing setModuleId={setModuleId} />}
                  />
                  <Route
                    path="/course/:courseId/pass/task/:taskId"
                    render={() => <TaskPassing setModuleId={setModuleId} />}
                  />
                  <Route
                    path="/course/:courseId/pass/test/:testId"
                    render={() => <TestPassing setModuleId={setModuleId} />}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CoursePassing
