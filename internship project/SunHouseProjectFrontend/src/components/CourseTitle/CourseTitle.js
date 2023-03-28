import React from 'react'
import { Link } from 'react-router-dom'
import MainButton from '../UI/MainButton/MainButton'
import avatarStub from '../../assets/icons/avatarStub.svg'
import { apiUrl } from '../../config'
import './CourseTitle.scss'

const CourseTitle = ({ courseId, title, description, teacherCheck, courseCheck, image, handleJoinTheCourse }) => {
  let avatarImage = avatarStub

  if (image && image !== 'undefined') {
    if (image.includes('fixtures')) {
      avatarImage = `${apiUrl}/${image}`
    } else {
      avatarImage = `${apiUrl}/uploads/${image}`
    }
  }

  return (
    <div className="course-title">
      <div className="container">
        <div className="course-title__inner">
          <div className="course-title__left">
            <div>
              <div className="course-title__left-image">
                <img src={avatarImage} alt={title} />
              </div>
            </div>
            <div className="course-title__left-info">
              <h2 className="course-title__left-info-title">{title}</h2>
              <p className="course-title__left-info-description">{description}</p>
            </div>
          </div>
          {teacherCheck ? (
            <Link to={`/course/${courseId}/settings`} className="course-title__button">
              <MainButton
                className="WhiteButton"
                type="button"
                text={
                  <>
                    <i>
                      <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8.06262 0.471851C7.05949 0.823414 5.51262 1.71404 4.94543 2.26716C4.51887 2.67966 4.42981 3.21873 4.66418 3.92185C4.84699 4.45623 4.86106 5.22029 4.70168 5.72654C4.35481 6.81404 3.44074 7.58748 2.29699 7.76091C1.69699 7.85466 1.31262 8.1031 1.08293 8.5531C0.871994 8.9656 0.721994 10.3344 0.768869 11.4219C0.825119 12.7625 0.951682 13.2312 1.35012 13.5828C1.58918 13.7937 1.79074 13.8687 2.36731 13.9765C3.00949 14.0937 3.40793 14.3047 3.89074 14.7922C4.50949 15.4203 4.75324 16.0109 4.74856 16.8828C4.74856 17.3047 4.72981 17.4031 4.56574 17.8672C4.16731 19.0109 4.37824 19.4281 5.85949 20.4125C6.36106 20.7453 7.35481 21.2609 7.91262 21.4765C8.48449 21.6969 8.81731 21.7015 9.22981 21.4953C9.41262 21.4015 9.58137 21.275 9.69387 21.1344C10.2376 20.464 10.6079 20.1828 11.2361 19.9719C12.3939 19.5781 13.6454 19.9531 14.447 20.9281C14.897 21.4719 15.4548 21.6687 16.0407 21.4812C16.5001 21.3312 17.5173 20.8015 18.1501 20.3797C18.9517 19.8453 19.3595 19.4703 19.4954 19.1562C19.6689 18.7531 19.6689 18.5375 19.5001 18.0312C19.3126 17.4687 19.2611 16.775 19.3782 16.2875C19.6314 15.2047 20.4564 14.3703 21.5392 14.1125C22.3126 13.925 22.3454 13.9109 22.6126 13.6672C22.7954 13.4984 22.8986 13.3625 22.9642 13.1797C23.3204 12.2234 23.3111 9.47654 22.9501 8.67498C22.8282 8.41248 22.5798 8.13591 22.3548 8.01873C22.2751 7.98123 22.0642 7.9156 21.8861 7.8781C20.6439 7.62029 19.772 6.81873 19.4767 5.65623C19.3642 5.22966 19.4017 4.4281 19.547 4.03904C19.6923 3.64529 19.697 3.18122 19.5564 2.86716C19.4204 2.57654 19.3032 2.44529 18.7829 2.04216C17.7517 1.2406 16.1439 0.424976 15.4876 0.373413C14.9954 0.331226 14.7939 0.429663 14.1798 1.01091C13.7814 1.39529 13.5657 1.55466 13.2986 1.68591C12.4642 2.09841 11.5501 2.09841 10.7017 1.68591C10.4157 1.54529 10.2282 1.40466 9.81574 1.01091C9.41731 0.631226 9.24387 0.495289 9.07043 0.434351C8.75637 0.331226 8.42356 0.340601 8.06262 0.471851ZM12.8907 7.36248C13.8657 7.62498 14.6157 8.15935 15.1407 8.97029C16.2657 10.6859 15.7642 13.0109 14.0298 14.1406C13.3923 14.5578 12.8157 14.7265 12.0001 14.7265C10.9407 14.7265 10.0876 14.375 9.35637 13.6437C8.62512 12.9125 8.27356 12.0594 8.27356 11C8.27356 10.1844 8.44231 9.60779 8.85949 8.97029C9.42199 8.1031 10.2986 7.51716 11.3204 7.3156C11.7189 7.2406 12.5251 7.25935 12.8907 7.36248Z"
                          fill="#2C2C2E"
                        />
                      </svg>
                    </i>
                    Настройки
                  </>
                }
              />
            </Link>
          ) : (
            <>
              {courseCheck !== undefined && (
                <>
                  {courseCheck ? (
                    <Link to={`/course/${courseId}/pass`} className="course-title__button">
                      <MainButton className="WhiteButton" type="button" text="Перейти к прохождению >" />
                    </Link>
                  ) : (
                    <div className="course-title__button">
                      <MainButton
                        className="WhiteButton"
                        type="button"
                        text="Записаться на курс"
                        onClick={handleJoinTheCourse}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseTitle
