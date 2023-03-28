import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearLesson, fetchLessonRequest } from '../../store/actions/lessonsActions'
import PassingBlock from '../PassingBlock/PassingBlock'
import CoursePassingControls from '../CoursePassingControls/CoursePassingControls'

const LessonPassing = ({ setModuleId }) => {
  const dispatch = useDispatch()
  const { lessonId } = useParams()
  const lesson = useSelector(state => state.lessons.lesson)
  useEffect(() => {
    dispatch(fetchLessonRequest(lessonId))

    return () => {
      dispatch(clearLesson())
    }
  }, [dispatch, lessonId])

  return (
    lesson && (
      <>
        <PassingBlock event={lesson} />
        <CoursePassingControls setModuleId={setModuleId} />
      </>
    )
  )
}

export default LessonPassing
