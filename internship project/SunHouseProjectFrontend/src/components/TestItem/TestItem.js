import React, { useEffect, useState } from 'react'
import './TestItem.scss'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'

const TestItem = ({ test }) => {
  const [counts, setCounts] = useState({
    questions: 0,
    correctAnswers: 0,
  })
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    test &&
      test.test.questions &&
      setCounts(prev => ({
        ...prev,
        questions: test.test.questions.length,
      }))
  }, [test])

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    test.answers.map(answer => {
      setCounts(prev => ({
        ...prev,
        correctAnswers: answer.status ? prev.correctAnswers + 1 : prev.correctAnswers,
      }))
    })
  }, [test])

  const onShowMore = () => {
    setShowMore(!showMore)
  }

  return (
    test.test &&
    test.answers.length !== 0 && (
      <div className="test-item">
        <div className="test-item__title-block">
          {test.answers.find(obj => obj.status === false) ? (
            <i className="test-item__title-block__icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 0C5.364 0 0 5.364 0 12C0 18.636 5.364 24 12 24C18.636 24 24 18.636 24 12C24 5.364 18.636 0 12 0ZM17.16 17.16C16.692 17.628 15.936 17.628 15.468 17.16L12 13.692L8.532 17.16C8.064 17.628 7.308 17.628 6.84 17.16C6.372 16.692 6.372 15.936 6.84 15.468L10.308 12L6.84 8.532C6.372 8.064 6.372 7.308 6.84 6.84C7.308 6.372 8.064 6.372 8.532 6.84L12 10.308L15.468 6.84C15.936 6.372 16.692 6.372 17.16 6.84C17.628 7.308 17.628 8.064 17.16 8.532L13.692 12L17.16 15.468C17.616 15.924 17.616 16.692 17.16 17.16Z"
                  fill="#FF0000"
                />
              </svg>
            </i>
          ) : (
            <i className="test-item__title-block__icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM8.748 17.148L4.44 12.84C3.972 12.372 3.972 11.616 4.44 11.148C4.908 10.68 5.664 10.68 6.132 11.148L9.6 14.604L17.856 6.348C18.324 5.88 19.08 5.88 19.548 6.348C20.016 6.816 20.016 7.572 19.548 8.04L10.44 17.148C9.984 17.616 9.216 17.616 8.748 17.148Z"
                  fill="#ADFA00"
                />
              </svg>
            </i>
          )}
          <h4 className="test-item__title-block__title">{test.test.title}</h4>
        </div>
        <div className="test-item__progress">
          <div className="test-item__progress__circle">
            <CircularProgressbar
              value={(counts.correctAnswers / counts.questions) * 100}
              strokeWidth={50}
              styles={buildStyles({
                textColor: '#1C1C1E',
                strokeLinecap: 'butt',
                pathColor: '#ADFA00',
                trailColor: '#F2F2F7',
              })}
            />
          </div>
          <h4 className="test-item__progress__text">{Math.round((counts.correctAnswers / counts.questions) * 100)}%</h4>
          <h4 className="test-item__progress__text">{`${counts.correctAnswers}/${counts.questions}`}</h4>
          <button
            type="button"
            className={`test-item__progress__moreBtn ${showMore ? 'open' : null} WhiteButton`}
            onClick={() => onShowMore()}
          >
            <i>
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.1733 1.38686L7.99997 6.56019L2.82664 1.38686C2.30664 0.866856 1.46664 0.866856 0.946641 1.38686C0.426641 1.90686 0.426641 2.74686 0.946641 3.26686L7.06664 9.38686C7.58664 9.90686 8.42664 9.90686 8.94664 9.38686L15.0666 3.26686C15.5866 2.74686 15.5866 1.90686 15.0666 1.38686C14.5466 0.880189 13.6933 0.866856 13.1733 1.38686Z"
                  fill="#1C1C1E"
                />
              </svg>
            </i>
          </button>
        </div>
        {showMore && (
          <div className="test-item__questions">
            {test &&
              test.answers.map(answer => (
                <div className="test-item__questions__question" key={answer.questionId}>
                  <h4 className="test-item__questions__question__title">{answer.question}</h4>
                  {answer.status ? (
                    <i className="est-item__questions__question__icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM8.748 17.148L4.44 12.84C3.972 12.372 3.972 11.616 4.44 11.148C4.908 10.68 5.664 10.68 6.132 11.148L9.6 14.604L17.856 6.348C18.324 5.88 19.08 5.88 19.548 6.348C20.016 6.816 20.016 7.572 19.548 8.04L10.44 17.148C9.984 17.616 9.216 17.616 8.748 17.148Z"
                          fill="#ADFA00"
                        />
                      </svg>
                    </i>
                  ) : (
                    <i className="test-item__questions__question__icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 0C5.364 0 0 5.364 0 12C0 18.636 5.364 24 12 24C18.636 24 24 18.636 24 12C24 5.364 18.636 0 12 0ZM17.16 17.16C16.692 17.628 15.936 17.628 15.468 17.16L12 13.692L8.532 17.16C8.064 17.628 7.308 17.628 6.84 17.16C6.372 16.692 6.372 15.936 6.84 15.468L10.308 12L6.84 8.532C6.372 8.064 6.372 7.308 6.84 6.84C7.308 6.372 8.064 6.372 8.532 6.84L12 10.308L15.468 6.84C15.936 6.372 16.692 6.372 17.16 6.84C17.628 7.308 17.628 8.064 17.16 8.532L13.692 12L17.16 15.468C17.616 15.924 17.616 16.692 17.16 17.16Z"
                          fill="#FF0000"
                        />
                      </svg>
                    </i>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    )
  )
}

export default TestItem
