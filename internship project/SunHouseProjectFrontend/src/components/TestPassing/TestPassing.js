import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearTest, fetchTestRequest } from '../../store/actions/testsActions'
import PassingBlock from '../PassingBlock/PassingBlock'
import './TestPassing.scss'
import CoursePassingControls from '../CoursePassingControls/CoursePassingControls'
import PassingTest from '../PassingTest/PassingTest'

const TestPassing = ({ setModuleId }) => {
  const { testId } = useParams()
  const dispatch = useDispatch()
  const test = useSelector(state => state.tests.test)

  useEffect(() => {
    dispatch(fetchTestRequest(testId))

    return () => {
      dispatch(clearTest())
    }
  }, [dispatch, testId])

  return (
    test && (
      <>
        <PassingBlock event={test} />
        {test && <PassingTest test={test} />}
        <CoursePassingControls setModuleId={setModuleId} test={test} />
      </>
    )
  )
}

export default TestPassing
