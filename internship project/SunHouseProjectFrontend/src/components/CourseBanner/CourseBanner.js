import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { apiUrl } from '../../config'
import { editCourseHeaderImageRequest } from '../../store/actions/coursesActions'
import MainButton from '../UI/MainButton/MainButton'
import banner from '../../assets/images/banner.svg'
import './CourseBanner.scss'

const CourseBanner = ({ course, teacherCheck }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)

  let image = banner

  if (course.headerImage) {
    if (course.headerImage.includes('fixtures')) {
      image = `${apiUrl}/${course.headerImage}`
    } else {
      image = `${apiUrl}/uploads/${course.headerImage}`
    }
  }

  const handleChangeHeaderImage = e => {
    const file = e.target.files[0]

    const formData = new FormData()

    formData.append('headerImage', file)

    dispatch(editCourseHeaderImageRequest({ courseId: course._id, image: formData }))
  }

  return (
    <div className="course-banner">
      <div className="container">
        <div className="course-banner__top">
          <Link
            to={
              location.pathname !== `/course/${course._id}`
                ? `/course/${course._id}`
                : `${user?.role === 'admin' ? '/admin_panel' : `/user/${teacherCheck ? 'teacher_mode' : 'courses'}`}`
            }
            className="course-banner__course-button"
          >
            <i>
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.61333 13.1733L3.43999 7.99997L8.61333 2.82664C9.13333 2.30664 9.13333 1.46664 8.61333 0.946641C8.09333 0.426641 7.25333 0.426641 6.73333 0.946641L0.613328 7.06664C0.0933277 7.58664 0.0933277 8.42664 0.613328 8.94664L6.73333 15.0666C7.25333 15.5866 8.09333 15.5866 8.61333 15.0666C9.11999 14.5466 9.13333 13.6933 8.61333 13.1733Z"
                  fill="#1C1C1E"
                />
              </svg>
            </i>
            {location.pathname === `/course/${course._id}` ? 'Мой профиль' : 'Главная страница курса'}
          </Link>
        </div>
      </div>
      <div className={`course-banner__image ${user?._id === course.user && 'course-banner__image--edit'}`}>
        <img src={image} alt={course.title} />
        {teacherCheck && (
          <>
            <i className="course-banner__image-add-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.87501 2.57813C3.88126 2.8875 2.86876 3.91875 2.57813 4.92188C2.45626 5.33438 2.43751 7.86563 2.45626 24.1875L2.48438 42.9844L2.75626 43.5469C3.11251 44.2594 3.74063 44.8875 4.45313 45.2438L5.01563 45.5156L14.5125 45.5438L24 45.5625V43.1719V40.7813H15.975H7.95001L7.58438 40.4156C7.26563 40.1063 7.21876 39.9938 7.21876 39.6375C7.21876 39.3563 7.28438 39.1313 7.43438 38.9438C7.54688 38.7844 9.55313 36.4781 11.8969 33.8156C15.5438 29.6531 16.2 28.9594 16.5 28.8656C17.2031 28.65 17.3438 28.7625 19.5563 31.275C20.6719 32.5406 21.6 33.5531 21.6281 33.525C21.6563 33.4969 23.325 30.9 25.35 27.7406C27.3656 24.5813 29.1375 21.9188 29.2688 21.8156C29.5875 21.5719 30.2438 21.5625 30.5906 21.7875C30.7406 21.8906 31.1813 22.5469 31.6875 23.4281C32.1469 24.2344 32.5688 24.9469 32.6063 25.0125C32.6719 25.1156 32.8875 25.0688 33.675 24.8063C35.8313 24.0844 36 24.075 41.0438 24.0281L45.5625 23.9813L45.5438 14.5031L45.5156 5.01563L45.2438 4.45313C44.8875 3.74063 44.2594 3.1125 43.5469 2.75625L42.9844 2.48438L24.1406 2.46563C8.20313 2.45625 5.23126 2.46563 4.87501 2.57813ZM18.9563 10.9125C19.8469 11.1094 20.5594 11.475 21.2156 12.0938C21.9188 12.75 22.3781 13.4813 22.6031 14.325C23.4469 17.3625 21.1688 20.3625 18 20.3625C14.8313 20.3625 12.5531 17.3625 13.3969 14.325C13.8563 12.6469 15.3 11.2969 17.0156 10.9219C17.7563 10.7531 18.1969 10.7531 18.9563 10.9125Z"
                  fill="white"
                />
                <path
                  d="M37.6125 28.9498C37.05 29.156 36.5438 29.5873 36.2531 30.1404C36.0563 30.4967 36.0469 30.656 36.0188 33.2529L35.9906 35.9904L33.2531 36.0185C30.6469 36.0467 30.4969 36.056 30.1313 36.2529C28.9594 36.881 28.4813 38.3248 29.0719 39.4779C29.2969 39.9373 30 40.5373 30.45 40.6685C30.6938 40.7435 31.6969 40.781 33.4031 40.781H35.9906L36.0188 43.5185C36.0469 45.9842 36.0656 46.3029 36.225 46.5935C37.0313 48.1123 38.9063 48.4592 40.0688 47.2873C40.7438 46.6217 40.7813 46.3967 40.7813 43.3873V40.781H43.3875C46.3406 40.781 46.6125 40.7342 47.2313 40.1342C47.7656 39.6092 47.9531 39.1592 47.9531 38.3904C47.9438 37.9029 47.8969 37.631 47.7469 37.3498C47.4563 36.806 46.7719 36.2342 46.2656 36.1029C46.0125 36.0373 44.8781 35.9998 43.3219 35.9998H40.7813V33.4123C40.7813 31.6967 40.7438 30.6935 40.6688 30.4498C40.5375 29.9904 39.9375 29.2967 39.4688 29.0623C38.925 28.781 38.2031 28.7435 37.6125 28.9498Z"
                  fill="white"
                />
              </svg>
            </i>
            <input
              className="course-banner__image-input-file"
              type="file"
              onChange={handleChangeHeaderImage}
              accept="image/*"
            />
            {(location.pathname === `/course/${course._id}` ||
              location.pathname === `/course/${course._id}/settings`) && (
              <div className="container course-banner__image-container">
                <Link to={`/course/${course._id}/edit`} className="course-banner__image-edit-button">
                  <MainButton
                    className="WhiteButton"
                    text={
                      <>
                        <i>
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 15.4601V18.5001C0 18.7801 0.22 19.0001 0.5 19.0001H3.54C3.67 19.0001 3.8 18.9501 3.89 18.8501L14.81 7.94006L11.06 4.19006L0.15 15.1001C0.0500001 15.2001 0 15.3201 0 15.4601ZM17.71 5.04006C18.1 4.65006 18.1 4.02006 17.71 3.63006L15.37 1.29006C14.98 0.900059 14.35 0.900059 13.96 1.29006L12.13 3.12006L15.88 6.87006L17.71 5.04006V5.04006Z"
                              fill="#2C2C2E"
                            />
                          </svg>
                        </i>
                        Редактор курса
                      </>
                    }
                  />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CourseBanner
