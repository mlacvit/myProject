import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { fetchCourseRequest, joinTheCourseRequest, visibilityRequest } from '../../../store/actions/coursesActions'
import CourseTitle from '../../../components/CourseTitle/CourseTitle'
import WhatLearn from '../../../components/WhatLearn/WhatLearn'
import TeachersBlock from '../../../components/TeachersBlock/TeachersBlock'
import CourseProgram from '../../../components/CourseProgram/CourseProgram'

const CourseHomepage = ({ teacherCheck, courseCheck }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const course = useSelector(state => state.courses.course)
  const user = useSelector(state => state.users.user)
  const [courseLending, setCourseLending] = useState(null)

  useEffect(() => {
    if (course) {
      setCourseLending({
        blockLearn: course.blockLearn,
        blockTeachers: course.blockTeachers,
        blockModules: course.blockModules,
        searchTeachers: course.searchTeachers,
        willLearn: course.willLearn,
        lendingTeachers: course.lendingTeachers,
      })
    }
  }, [course])

  useEffect(() => {
    if (!course) {
      dispatch(fetchCourseRequest(id))
    }
  }, [dispatch, course, id])

  const onVisibilityBlock = (type, content, name) => {
    if (type === 'lendingTeachers') {
      setCourseLending(prev => ({
        ...prev,
        [type]: content,
      }))
      return
    }

    if (type === 'willLearn') {
      setCourseLending(prev => ({
        ...prev,
        [type]: content,
      }))
      return
    }

    if (type === 'description') {
      setCourseLending(prev => ({
        ...prev,
        [name]: { visibility: prev[name].visibility, description: content },
      }))
      return
    }

    setCourseLending(prev => ({
      ...prev,
      [type]: { visibility: content, description: prev[type].description },
    }))
  }

  const onSave = () => {
    const formData = new FormData()

    courseLending.willLearn.forEach(elem => {
      Object.keys(elem).forEach(key => {
        if (key === 'image') {
          return formData.append(key, elem[key])
        }

        return null
      })
    })

    formData.append('payload', JSON.stringify(courseLending))

    dispatch(visibilityRequest({ formData, id }))

    return Swal.fire({
      toast: true,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      icon: 'success',
      title: 'Изменения успешно сохранены',
    })
  }

  const handleJoinTheCourse = () => {
    if (!user) {
      return <Redirect to="/login" />
    }

    let firstId

    if (course?.modules.length && course.modules[0]?.data.length) {
      firstId = course.modules[0]?.data[0]
    }

    return dispatch(joinTheCourseRequest({ courseId: id, firstId, userId: user._id }))
  }

  return (
    <>
      {course && (
        <div className="course-homepage">
          <CourseTitle
            courseId={id}
            title={course.title}
            description={course.description}
            image={course.image}
            teacherCheck={teacherCheck}
            courseCheck={courseCheck}
            handleJoinTheCourse={handleJoinTheCourse}
          />
          <div className="container">
            <div className="course-homepage__bottom">
              {teacherCheck ? (
                courseLending && (
                  <>
                    <WhatLearn
                      block={courseLending.blockLearn}
                      willLearn={courseLending.willLearn}
                      teacherCheck={teacherCheck}
                      onVisibilityBlock={onVisibilityBlock}
                    />
                    <TeachersBlock
                      title="Преподаватели"
                      subtitle={courseLending.blockTeachers && courseLending.blockTeachers.description}
                      block={courseLending.blockTeachers}
                      teachers={courseLending.lendingTeachers}
                      searchTeachers={course.searchTeachers}
                      teacherCheck={teacherCheck}
                      onVisibilityBlock={onVisibilityBlock}
                    />
                    {course.modules && course.modules.length !== 0 && (
                      <CourseProgram
                        block={courseLending.blockModules}
                        teacherCheck={teacherCheck}
                        modules={course.modules}
                        onVisibilityBlock={onVisibilityBlock}
                      />
                    )}
                    <button type="button" className="course__save-btn MainButton GreenButton" onClick={onSave}>
                      Сохранить изменения
                    </button>
                  </>
                )
              ) : (
                <>
                  {courseLending && (
                    <>
                      {courseLending.blockLearn && courseLending.blockLearn.visibility && (
                        <WhatLearn
                          block={courseLending.blockLearn}
                          willLearn={course.willLearn}
                          newWillLearn={courseLending.willLearn}
                          teacherCheck={teacherCheck}
                          onVisibilityBlock={onVisibilityBlock}
                        />
                      )}
                      {courseLending.blockTeachers && courseLending.blockTeachers.visibility && (
                        <TeachersBlock
                          title="Преподаватели"
                          subtitle={courseLending.blockTeachers && courseLending.blockTeachers.description}
                          block={courseLending.blockTeachers}
                          teachers={course.lendingTeachers}
                          newTeachers={courseLending.lendingTeachers}
                          teacherCheck={teacherCheck}
                          onVisibilityBlock={onVisibilityBlock}
                        />
                      )}
                      {courseLending.blockModules && courseLending.blockModules.visibility && (
                        <CourseProgram
                          block={courseLending.blockModules}
                          teacherCheck={teacherCheck}
                          modules={course.modules}
                          onVisibilityBlock={onVisibilityBlock}
                        />
                      )}
                    </>
                  )}
                  {!courseCheck ? (
                    <button
                      type="button"
                      className="course__save-btn MainButton GreenButton"
                      onClick={handleJoinTheCourse}
                    >
                      Записаться на курс
                    </button>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CourseHomepage
