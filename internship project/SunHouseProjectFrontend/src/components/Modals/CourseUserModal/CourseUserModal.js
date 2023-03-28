import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import { Progress } from 'react-sweet-progress'
import { apiUrl } from '../../../config'
import { clearCourseUser, getUserRequest } from '../../../store/actions/coursesActions'
import Modal from '../../UI/Modal2/Modal'
import MainButton from '../../UI/MainButton/MainButton'
import TestItem from '../../TestItem/TestItem'
import avatarStub from '../../../assets/icons/avatarStub.svg'
import 'react-sweet-progress/lib/style.css'
import './CourseUserModal.scss'

const CourseUserModal = ({ setOpen, user }) => {
  const dispatch = useDispatch()
  const course = useSelector(state => state.courses.course)
  const userGeneral = useSelector(state => state.courses.user)
  const [showMore, setShowMore] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [counts, setCounts] = useState({
    testCounts: 0,
    userPassed: 0,
  })
  let avatarImage = avatarStub
  let userAvatar = avatarStub

  useEffect(() => {
    dispatch(getUserRequest({ courseId: course._id, userId: user._id }))

    return () => {
      dispatch(clearCourseUser())
    }
  }, [user, dispatch, course])

  useEffect(() => {
    setCounts(prev => ({
      ...prev,
      testCounts: 0,
    }))
    // eslint-disable-next-line no-unused-expressions
    course &&
      course.modules &&
      course.modules.length !== 0 &&
      course.modules.forEach(module => {
        if (module.data.length !== 0) {
          module.data.forEach(content => {
            if (content.type === 'test') {
              setCounts(prev => ({
                ...prev,
                testCounts: prev.testCounts + 1,
              }))
            }
          })
        }
      })
  }, [course, user])

  useEffect(() => {
    setCounts(prev => ({
      ...prev,
      userPassed: 0,
    }))
    // eslint-disable-next-line no-unused-expressions
    userGeneral &&
      userGeneral.tests &&
      userGeneral.tests.length !== 0 &&
      // eslint-disable-next-line array-callback-return
      userGeneral.tests.map(test => {
        if (test.status === true) {
          setCounts(prev => ({
            ...prev,
            userPassed: prev.userPassed + 1,
          }))
        }
      })
  }, [userGeneral, user])

  const handlerClick = () => {
    setOpen(false)
  }
  const onShowMoreBtn = () => {
    setIsOpen(!isOpen)
    setShowMore(!showMore)
  }

  if (course.image && course.image !== 'undefined') {
    avatarImage = `${apiUrl}/${course.image}`
  }

  if (userGeneral && userGeneral.avatar !== 'undefined') {
    if (userGeneral?.avatar.match(/http/) || userGeneral?.avatar.match(/https/)) {
      userAvatar = userGeneral.avatar
    } else if (userGeneral.avatar.includes('fixtures')) {
      userAvatar = `${apiUrl}/${userGeneral.avatar}`
    } else {
      userAvatar = `${apiUrl}/uploads/${userGeneral.avatar}`
    }
  }

  return (
    userGeneral && (
      <>
        <div className="course-user-modal__backdrop" onClick={handlerClick} />
        <Modal setOpen={setOpen}>
          <div className="course-user-modal__header">
            <div className="course-user-modal__header__avatar">
              <img src={userAvatar} alt={user.email} />
            </div>
            <h2 className="course-user-modal__header__title">{userGeneral.username}</h2>
            <p className="course-user-modal__header__text">{userGeneral.email}</p>
            <div className="course-user-modal__progressbar">
              <h4 className="course-user-modal__progressbar__title">Общий прогресс</h4>
              <div className="course-user-modal__progressbar__line">
                {userGeneral && (
                  <Progress
                    percent={userGeneral.coursePercent ? userGeneral.coursePercent : 0}
                    status="success"
                    strokeWidth={2}
                    trailWidth={2}
                    theme={{
                      success: {
                        symbol: `${userGeneral?.coursePercent || 0}%`,
                        color: '#ADFA00',
                        strokeWidth: 3,
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="course-user-modal__title__inner">
              <div className="course-user-modal__title__left">
                <div className="course-user-modal__title__left-image">
                  <img src={avatarImage} alt={course.title} />
                </div>
                <div className="course-user-modal__title__left-info">
                  <h2 className="course-user-modal__title__left-info-title">{course.title}</h2>
                </div>
              </div>
              <div className="course-user-modal__progress">
                <div className="course-user-modal__progress__circle">
                  <CircularProgressbar
                    value={(counts.userPassed / counts.testCounts) * 100}
                    strokeWidth={50}
                    styles={buildStyles({
                      textColor: '#1C1C1E',
                      strokeLinecap: 'butt',
                      pathColor: '#ADFA00',
                      trailColor: '#F2F2F7',
                    })}
                  />
                </div>
                <h4 className="course-user-modal__progress__text">{`${counts.userPassed}/${counts.testCounts}`}</h4>
              </div>
              <MainButton
                className={`course-user-modal__title__button ${isOpen ? 'open' : ''} WhiteButton`}
                type="button"
                onClick={onShowMoreBtn}
                text={
                  <>
                    <i>
                      <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.1733 1.38686L7.99997 6.56019L2.82664 1.38686C2.30664 0.866856 1.46664 0.866856 0.946641 1.38686C0.426641 1.90686 0.426641 2.74686 0.946641 3.26686L7.06664 9.38686C7.58664 9.90686 8.42664 9.90686 8.94664 9.38686L15.0666 3.26686C15.5866 2.74686 15.5866 1.90686 15.0666 1.38686C14.5466 0.880189 13.6933 0.866856 13.1733 1.38686Z"
                          fill="#1C1C1E"
                        />
                      </svg>
                    </i>
                  </>
                }
              />
            </div>
          </div>
          {showMore && (
            <div className="course-user-modal__tests">
              <h2 className="course-user-modal__tests__title">Тесты студента</h2>
              {userGeneral.tests.length !== 0 ? (
                userGeneral.tests.map(test => <TestItem key={test._id} test={test} />)
              ) : (
                <p className="course-user-modal__tests__text">Студент еще не прошел ни одного теста</p>
              )}
            </div>
          )}
        </Modal>
      </>
    )
  )
}

export default CourseUserModal
