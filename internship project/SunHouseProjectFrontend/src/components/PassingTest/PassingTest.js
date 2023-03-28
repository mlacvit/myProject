import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainButton from '../UI/MainButton/MainButton'
import { sendTestAnswersRequest } from '../../store/actions/testsActions'
import { ToastAlert } from '../UI/Toast/ToastAlert'

const PassingTest = ({ test, disabled }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)

  const [state, setState] = useState([])
  const [disable, setDisable] = useState(false)

  useEffect(() => {
    setDisable(false)

    if (user) {
      const userAnswers = user.tests.find(elem => elem.test === test?._id)

      if (userAnswers?.answers.length) {
        const newState = userAnswers.answers.map(obj => ({
          question: obj.questionId,
          answer: obj.answerId,
        }))

        setDisable(true)
        setState(newState)
      } else {
        setState(
          test.questions.map(q => ({
            question: q._id,
            answer: null,
          })),
        )
      }
    }
  }, [test, user])

  useEffect(() => {
    if (disabled) {
      setDisable(true)
    }
  }, [disabled])

  const handleChoiceAnswer = (questionId, answerId) => {
    setState(prevState => {
      const answerCopy = {
        question: questionId,
        answer: answerId,
      }

      return prevState.map(elem => {
        if (elem.question === answerCopy.question) {
          return answerCopy
        }

        return elem
      })
    })
  }

  const handleSaveAnswers = e => {
    e.preventDefault()

    if (state.find(obj => obj.answer === null)) {
      return ToastAlert({
        timer: 3000,
        icon: 'error',
        title: `Вы не ответили на все вопросы!`,
      })
    }

    return dispatch(sendTestAnswersRequest({ testId: test._id, state }))
  }

  return (
    <div className="passing-test">
      {test.questions.map((question, index) => (
        <div key={question._id} className="passing-test__question">
          {index === 0 && (
            <h3 className="passing-test__title">
              <i className="passing-test__title-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM8.748 17.148L4.44 12.84C3.972 12.372 3.972 11.616 4.44 11.148C4.908 10.68 5.664 10.68 6.132 11.148L9.6 14.604L17.856 6.348C18.324 5.88 19.08 5.88 19.548 6.348C20.016 6.816 20.016 7.572 19.548 8.04L10.44 17.148C9.984 17.616 9.216 17.616 8.748 17.148Z"
                    fill="#D1D1D6"
                  />
                </svg>
              </i>
              Тест
            </h3>
          )}
          <h5 className="passing-test__question-title">{question.title}</h5>
          <ol className="passing-test__question-list">
            {question.answers.map((ans, ind) => (
              <li key={ans._id} className="passing-test__question-list-answer">
                <p className="passing-test__question-list-answer-title">
                  {ind + 1}. {ans.title}
                </p>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="passing-test__question-list-answer-checkbox">
                  <input
                    className="passing-test__question-list-answer-checkbox-input"
                    type="radio"
                    value={ans._id}
                    checked={state[index]?.answer === ans._id}
                    onChange={() => handleChoiceAnswer(question._id, ans._id)}
                    name="status"
                    disabled={disable}
                  />
                  {state[index]?.answer === ans._id ? (
                    <i>
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M26.6667 0H3.33333C1.5 0 0 1.5 0 3.33333V26.6667C0 28.5 1.5 30 3.33333 30H26.6667C28.5 30 30 28.5 30 26.6667V3.33333C30 1.5 28.5 0 26.6667 0ZM12.85 22.15C12.2 22.8 11.15 22.8 10.5 22.15L4.51667 16.1667C3.86667 15.5167 3.86667 14.4667 4.51667 13.8167C5.16667 13.1667 6.21667 13.1667 6.86667 13.8167L11.6667 18.6167L23.1333 7.15C23.7833 6.5 24.8333 6.5 25.4833 7.15C26.1333 7.8 26.1333 8.85 25.4833 9.5L12.85 22.15V22.15Z"
                          fill="#ADFA00"
                        />
                      </svg>
                    </i>
                  ) : (
                    <i className="passing-test__question-list-answer-checkbox-checkmark">
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M25 26.6667H5C4.08333 26.6667 3.33333 25.9167 3.33333 25V5C3.33333 4.08333 4.08333 3.33333 5 3.33333H25C25.9167 3.33333 26.6667 4.08333 26.6667 5V25C26.6667 25.9167 25.9167 26.6667 25 26.6667ZM26.6667 0H3.33333C1.5 0 0 1.5 0 3.33333V26.6667C0 28.5 1.5 30 3.33333 30H26.6667C28.5 30 30 28.5 30 26.6667V3.33333C30 1.5 28.5 0 26.6667 0Z"
                          fill="#F2F2F7"
                        />
                      </svg>
                    </i>
                  )}
                </label>
              </li>
            ))}
          </ol>
        </div>
      ))}
      {!disabled && (
        <MainButton
          className="GreenButton passing-test__save-button"
          text="Сохранить"
          onClick={handleSaveAnswers}
          disabled={disable}
        />
      )}
    </div>
  )
}

export default PassingTest
