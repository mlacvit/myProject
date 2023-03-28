import React, { useEffect } from 'react'
import './TestBlock.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearTest,
  editTestQuestionsRequest,
  editTestRequest,
  fetchTestRequest,
} from '../../store/actions/testsActions'
import ContentFormTest from '../ContentForm/ContentFormTest/ContentFormTest'

const Test = () => {
  const { testId } = useParams()
  const dispatch = useDispatch()
  const test = useSelector(state => state.tests.test)

  useEffect(() => {
    dispatch(fetchTestRequest(testId))

    return () => {
      dispatch(clearTest())
    }
  }, [dispatch, testId])

  const handleSaveTest = data => {
    dispatch(editTestRequest(data))
  }
  const handleSaveQuestionsTest = data => {
    dispatch(editTestQuestionsRequest(data))
  }

  return (
    <>
      {test && (
        <>
          <ContentFormTest
            contentData={test}
            contentId={testId}
            handleSave={handleSaveTest}
            handleQuestionsSave={handleSaveQuestionsTest}
          />
        </>
      )}
    </>
  )
}

export default Test
