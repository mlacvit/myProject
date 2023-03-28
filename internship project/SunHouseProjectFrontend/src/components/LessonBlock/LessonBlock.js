import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ContentForm from '../ContentForm/ContentForm'
import { clearLesson, editLessonRequest, fetchLessonRequest } from '../../store/actions/lessonsActions'

const LessonBlock = () => {
  const { lessonId } = useParams()
  const dispatch = useDispatch()
  const lesson = useSelector(state => state.lessons.lesson)
  const error = useSelector(state => state.lessons.error)
  useEffect(() => {
    dispatch(fetchLessonRequest(lessonId))

    return () => {
      dispatch(clearLesson())
    }
  }, [dispatch, lessonId])

  const handleSaveLesson = data => {
    dispatch(editLessonRequest(data))
  }

  return (
    <>
      {' '}
      {lesson && <ContentForm contentData={lesson} contentId={lessonId} handleSave={handleSaveLesson} error={error} />}
    </>
  )
}

export default LessonBlock
