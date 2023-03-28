import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCourseRequest } from '../../store/actions/coursesActions'
import './CertificateObtain.scss'
import certificate from '../../assets/images/certificate.png'
import Card from '../UI/Cards/Card/Card'
import RatingBlock from '../RatingBlock/RatingBlock'
import { ToastAlert } from '../UI/Toast/ToastAlert'

const CertificateObtain = () => {
  const course = useSelector(state => state.courses.course)
  const dispatch = useDispatch()
  const params = useParams()
  const [isOpenModal, setIsOpenModal] = useState(false)
  useEffect(() => {
    dispatch(fetchCourseRequest(params.id))
    setTimeout(() => {
      setIsOpenModal(true)
    }, 2000)
  }, [params.id, dispatch])

  const onBtnCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.origin + certificate)

    return ToastAlert({
      icon: 'success',
      title: 'Ссылка сохранена в буфер обмена',
    })
  }
  return (
    course && (
      <div className="container">
        <div className="certificate-obtain">
          <RatingBlock isOpen={isOpenModal} courseId={course._id} />
          <h4 className="certificate-obtain__title">{`Поздравляю, вы успешно окончили курс "${course.title}"`}</h4>
          <Card className="certificate-obtain__certificate WhiteCard">
            <a
              href={certificate}
              target="_blank"
              rel="noreferrer"
              className="certificate-obtain__certificate__imageLink"
            >
              <img src={certificate} alt={course.title} className="certificate-obtain__certificate__image" />
            </a>
            <div className="certificate-obtain__certificate__btns">
              <button type="button" className="certificate-obtain__certificate__btns__download MainButton GreenButton">
                <a
                  href={certificate}
                  className="certificate-obtain__certificate__btns__download__link"
                  target="_blank"
                  download
                  rel="noreferrer"
                >
                  Скачать
                </a>
              </button>
              <button
                type="button"
                className="certificate-obtain__certificate__btns__linkCopy MainButton GreenButton"
                onClick={onBtnCopyLink}
              >
                <i className="certificate-obtain__certificate__btns__linkCopy__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_783_621)">
                      <path
                        d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_783_621">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </i>
              </button>
            </div>
          </Card>
        </div>
      </div>
    )
  )
}

export default CertificateObtain
