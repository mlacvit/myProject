import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Popup from 'reactjs-popup'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ModalOfCategory from '../../components/Modals/ModalOfCategory/ModalOfCategory'
import ModalSortCourse from '../../components/Modals/ModalSortCourse/ModalSortCourse'
import { clearCourses, fetchCoursesRequest } from '../../store/actions/coursesActions'
import { fetchCategoriesRequest } from '../../store/actions/categoriesActions'
import CourseCard from '../../components/CourseCard/CourseCard'
import './CatalogOfCourse.scss'

const coursePerPage = 6

const CatalogOfCourse = () => {
  const dispatch = useDispatch()
  const courses = useSelector(state => state.courses.courses)
  const categories = useSelector(state => state.categories.categories)
  const user = useSelector(state => state.users.user)
  const [next, setNext] = useState(coursePerPage)
  const [toggle, setToggle] = useState(false)
  const [sort, setSort] = useState('rating')
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(fetchCoursesRequest({ sort, category }))
    dispatch(fetchCategoriesRequest())

    return () => {
      dispatch(clearCourses())
    }
  }, [dispatch, sort, category])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filtered = courses.filter(course => course.title.toLowerCase().includes(search.toLowerCase()))

  const handleMoreCourses = () => {
    setNext(next + coursePerPage)
  }

  return (
    <>
      <Header />
      <section className="container">
        <div className="courses-section">
          <div className="courses-section__block">
            <h2 className="courses-section__title">Каталог курсов</h2>
            <div className="icons-block">
              {toggle === true && (
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="icon-value"
                  onChange={e => setSearch(e.target.value)}
                />
              )}
              <div
                className={toggle === false ? 'icons-item' : 'icons-item--active'}
                onClick={() => setToggle(toggleInput => !toggleInput)}
              >
                <i>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
                      fill="#333333"
                    />
                  </svg>
                </i>
              </div>
              <Popup
                position="bottom right center"
                className="popup-content"
                trigger={
                  <div className="icons-item" style={{ margin: '0 10px' }}>
                    <i>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.14844 3.79219C6.5625 3.94219 6.1125 4.43438 6.02344 5.02969L5.99063 5.24531L4.35938 5.25938C2.79375 5.27344 2.71875 5.27813 2.59688 5.37188C2.34844 5.55469 2.27344 5.70469 2.27344 6C2.27344 6.29531 2.34844 6.44531 2.59688 6.62813C2.71875 6.72188 2.79375 6.72656 4.35938 6.74063L5.99063 6.75469L6.02344 6.975C6.06094 7.25156 6.3 7.70156 6.48281 7.85625C6.55781 7.92188 6.73125 8.02969 6.8625 8.1L7.10156 8.22656H8.25H9.39844L9.69375 8.06719C9.85781 7.97813 10.0406 7.84219 10.1063 7.76719C10.2844 7.55625 10.4391 7.21875 10.4766 6.97031L10.5094 6.75L15.8906 6.74063C21.2438 6.72656 21.2766 6.72656 21.4031 6.62813C21.6516 6.44531 21.7266 6.29531 21.7266 6C21.7266 5.70469 21.6516 5.55469 21.4031 5.37188C21.2766 5.27344 21.2438 5.27344 15.8906 5.25938L10.5094 5.25L10.4766 5.02969C10.4391 4.78125 10.2844 4.44375 10.1063 4.23281C10.0406 4.15781 9.85781 4.02188 9.69375 3.93281L9.39844 3.77344L8.34375 3.76406C7.7625 3.75938 7.22813 3.77344 7.14844 3.79219Z"
                          fill="#2C2C2E"
                        />
                        <path
                          d="M13.1484 9.79219C12.5625 9.94219 12.1125 10.4344 12.0234 11.0297L11.9906 11.25L7.35938 11.2594C2.76094 11.2734 2.72344 11.2734 2.59688 11.3719C2.34844 11.5547 2.27344 11.7047 2.27344 12C2.27344 12.2953 2.34844 12.4453 2.59688 12.6281C2.72344 12.7266 2.76094 12.7266 7.35938 12.7406L11.9906 12.75L12.0234 12.975C12.0609 13.2516 12.3 13.7016 12.4828 13.8563C12.5578 13.9219 12.7313 14.0297 12.8625 14.1L13.1016 14.2266H14.25H15.3984L15.6938 14.0672C15.8578 13.9781 16.0406 13.8422 16.1063 13.7672C16.2844 13.5563 16.4391 13.2188 16.4766 12.9703L16.5094 12.7547L18.8906 12.7406C21.2156 12.7266 21.2766 12.7219 21.4031 12.6281C21.6516 12.4453 21.7266 12.2953 21.7266 12C21.7266 11.7047 21.6516 11.5547 21.4031 11.3719C21.2766 11.2781 21.2156 11.2734 18.8906 11.2594L16.5094 11.2453L16.4766 11.0297C16.4391 10.7813 16.2844 10.4438 16.1063 10.2328C16.0406 10.1578 15.8578 10.0219 15.6938 9.93281L15.3984 9.77344L14.3438 9.76406C13.7625 9.75938 13.2281 9.77344 13.1484 9.79219Z"
                          fill="#2C2C2E"
                        />
                        <path
                          d="M7.14844 15.7922C6.5625 15.9422 6.1125 16.4344 6.02344 17.0297L5.99063 17.2453L4.35938 17.2594C2.79375 17.2734 2.71875 17.2781 2.59688 17.3719C2.34844 17.5547 2.27344 17.7047 2.27344 18C2.27344 18.2953 2.34844 18.4453 2.59688 18.6281C2.71875 18.7219 2.79375 18.7266 4.35938 18.7406L5.99063 18.7547L6.02344 18.975C6.06094 19.2516 6.3 19.7016 6.48281 19.8563C6.55781 19.9219 6.73125 20.0297 6.8625 20.1L7.10156 20.2266H8.25H9.39844L9.69375 20.0672C9.85781 19.9781 10.0406 19.8422 10.1063 19.7672C10.2844 19.5563 10.4391 19.2188 10.4766 18.9703L10.5094 18.75L15.8906 18.7406C21.2438 18.7266 21.2766 18.7266 21.4031 18.6281C21.6516 18.4453 21.7266 18.2953 21.7266 18C21.7266 17.7047 21.6516 17.5547 21.4031 17.3719C21.2766 17.2734 21.2438 17.2734 15.8906 17.2594L10.5094 17.25L10.4766 17.0297C10.4391 16.7813 10.2844 16.4438 10.1063 16.2328C10.0406 16.1578 9.85781 16.0219 9.69375 15.9328L9.39844 15.7734L8.34375 15.7641C7.7625 15.7594 7.22813 15.7734 7.14844 15.7922Z"
                          fill="#2C2C2E"
                        />
                      </svg>
                    </i>
                  </div>
                }
              >
                <ModalSortCourse sortCourse={setSort} />
              </Popup>
              <Popup
                position="bottom right center"
                className="popup-content2"
                trigger={
                  <div className="icons-item">
                    <i>
                      <svg width="18" height="18" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1 12H17C17.55 12 18 11.55 18 11C18 10.45 17.55 10 17 10H1C0.45 10 0 10.45 0 11C0 11.55 0.45 12 1 12ZM1 7H17C17.55 7 18 6.55 18 6C18 5.45 17.55 5 17 5H1C0.45 5 0 5.45 0 6C0 6.55 0.45 7 1 7ZM0 1C0 1.55 0.45 2 1 2H17C17.55 2 18 1.55 18 1C18 0.45 17.55 0 17 0H1C0.45 0 0 0.45 0 1Z"
                          fill="#2C2C2E"
                        />
                      </svg>
                    </i>
                  </div>
                }
              >
                <ModalOfCategory categories={categories} setCategory={setCategory} />
              </Popup>
            </div>
          </div>
          <div className="courses-section__cards">
            {user?.role !== 'ban'
              ? filtered.map(item => (
                  <CourseCard
                    key={item._id}
                    id={`/course/${item._id}`}
                    title={item.title}
                    price={item.price}
                    image={item.image}
                  />
                )) &&
                filtered
                  ?.slice(0, next)
                  ?.map(item => (
                    <CourseCard
                      key={item._id}
                      id={`/course/${item._id}`}
                      title={item.title}
                      price={item.price}
                      image={item.image}
                    />
                  ))
              : filtered.map(item => (
                  <CourseCard key={item._id} id="/user" title={item.title} price={item.price} image={item.image} />
                ))}
          </div>
          {next < filtered?.length && (
            <button type="button" className="course-btn" onClick={handleMoreCourses}>
              Посмотреть курсы ({filtered.length - 6})
            </button>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default CatalogOfCourse
