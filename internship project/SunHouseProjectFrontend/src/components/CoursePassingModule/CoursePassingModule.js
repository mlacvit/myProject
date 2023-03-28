import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './CoursePassingModule.scss'
import { useSelector } from 'react-redux'

const CoursePassingModules = ({ course, moduleId }) => {
  const location = useLocation()
  const user = useSelector(state => state.users.user)
  const [isOpen, setIsOpen] = useState({ status: false, id: '' })

  useEffect(() => {
    if (moduleId) {
      setIsOpen({ status: true, id: moduleId })
    }
  }, [moduleId])

  const toggleAccordion = value => {
    if (value === isOpen.id) {
      setIsOpen({
        status: false,
        id: '',
      })
    } else if (isOpen.id !== '') {
      setIsOpen({
        status: isOpen.status,
        id: value,
      })
    } else {
      setIsOpen({
        status: !isOpen.status,
        id: value,
      })
    }
  }

  return (
    course && (
      <div className="course-passing-modules">
        {course.modules.length > 0 &&
          course.modules.map(module => (
            <div key={module._id} className="course-passing-modules__block">
              <div
                onClick={() => toggleAccordion(module._id)}
                className={`course-passing-modules__block-header ${
                  isOpen.status && isOpen.id === module._id && `course-passing-modules__block-header--is-open`
                }`}
              >
                <i>
                  <svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.1249 0.11875C2.5749 0.29375 2.2499 0.49375 1.8749 0.86875C1.4749 1.275 1.23115 1.7 1.09365 2.21875C0.949902 2.775 0.949902 15.1 1.09365 15.6562C1.35615 16.6625 2.10615 17.4437 3.1124 17.75C3.50615 17.875 3.71865 17.875 14.8999 17.875C24.4374 17.875 26.3312 17.8625 26.6062 17.7875C27.5812 17.525 28.3249 16.8312 28.6999 15.8375L28.8437 15.4687L28.8624 9.28125C28.8749 5.3 28.8562 2.91875 28.8187 2.6125C28.6562 1.40625 27.7874 0.3875 26.6562 0.0937497C26.3312 0.0124997 24.9499 -2.66358e-07 14.8749 0.00624973C4.11865 0.00624973 3.4499 0.0124997 3.1249 0.11875ZM13.1312 4.98125C13.3874 5.03125 17.5999 8.16875 17.7687 8.44375C17.9249 8.68125 17.8937 9.275 17.7187 9.5C17.5249 9.7625 13.4062 12.8125 13.1624 12.8812C12.7312 13 12.2749 12.7875 12.0624 12.3687C11.9374 12.1312 11.9374 12.025 11.9499 8.85625L11.9687 5.59375L12.1187 5.38125C12.1999 5.26875 12.3812 5.11875 12.5249 5.05625C12.8124 4.925 12.8437 4.91875 13.1312 4.98125Z"
                      fill="#ADFA00"
                    />
                    <path
                      d="M8.3935 19.9628C8.02475 20.0816 7.73725 20.2753 7.46225 20.5816L7.22475 20.8441L4.42475 20.8753C1.7185 20.9066 1.631 20.9128 1.456 21.0378C1.1185 21.2878 0.987252 21.5566 1.01225 21.9253C1.0435 22.2753 1.1685 22.4941 1.46225 22.7128C1.631 22.8378 1.731 22.8441 4.42475 22.8753L7.2185 22.9066L7.4935 23.2003C8.2685 24.0441 9.57475 24.0628 10.3685 23.2503C10.5123 23.1066 10.6248 22.9628 10.6248 22.9316C10.6248 22.9003 14.3623 22.8753 19.3248 22.8753C27.9935 22.8753 28.0248 22.8753 28.2873 22.7441C29.0123 22.3941 29.0185 21.3628 28.306 21.0003C28.0748 20.8753 27.8935 20.8753 19.3623 20.8691H10.656L10.4685 20.6066C10.0685 20.0628 9.056 19.7441 8.3935 19.9628Z"
                      fill="#ADFA00"
                    />
                  </svg>
                </i>
                <p className="course-passing-modules__block-title">{module.title}</p>
                <button
                  type="button"
                  className={`course-passing-modules__block-button ${
                    isOpen.status && isOpen.id === module._id && `course-passing-modules__block-button--is-open`
                  }`}
                >
                  <i>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.3866 10.8267L17.5599 16L12.3866 21.1734C11.8666 21.6934 11.8666 22.5334 12.3866 23.0534C12.9066 23.5734 13.7466 23.5734 14.2666 23.0534L20.3866 16.9334C20.9066 16.4134 20.9066 15.5734 20.3866 15.0534L14.2666 8.93336C13.7466 8.41336 12.9066 8.41336 12.3866 8.93336C11.8799 9.45336 11.8666 10.3067 12.3866 10.8267Z"
                        fill="#1C1C1E"
                      />
                    </svg>
                  </i>
                </button>
              </div>
              <div
                className={`course-passing-modules__block-content ${
                  isOpen.status && isOpen.id === module._id && `course-passing-modules__block-content--is-open`
                }`}
              >
                <ul className="course-passing-modules__block-items">
                  {module.data.map((item, index) => (
                    <li
                      key={item._id}
                      className={`course-passing-modules__block-item course-passing-modules__block-item--${item.type} ${
                        location.pathname.match(item._id) && 'course-modules-block__item--active'
                      }`}
                    >
                      {user && user[`${item.type}s`].find(elem => elem[item.type] === item._id)?.status ? (
                        <Link
                          to={`/course/${course._id}/pass/${item.type}/${item._id}`}
                          className="course-passing-modules__block-item-title"
                        >
                          {item.type === 'test' ? (
                            <i>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM8.748 17.148L4.44 12.84C3.972 12.372 3.972 11.616 4.44 11.148C4.908 10.68 5.664 10.68 6.132 11.148L9.6 14.604L17.856 6.348C18.324 5.88 19.08 5.88 19.548 6.348C20.016 6.816 20.016 7.572 19.548 8.04L10.44 17.148C9.984 17.616 9.216 17.616 8.748 17.148Z"
                                  fill="#ADFA00"
                                />
                              </svg>
                            </i>
                          ) : null}
                          {item.type === 'task' ? (
                            <i>
                              <svg
                                width="19"
                                height="19"
                                viewBox="0 0 19 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 15.4601V18.5001C0 18.7801 0.22 19.0001 0.5 19.0001H3.54C3.67 19.0001 3.8 18.9501 3.89 18.8501L14.81 7.94006L11.06 4.19006L0.15 15.1001C0.0500001 15.2001 0 15.3201 0 15.4601ZM17.71 5.04006C18.1 4.65006 18.1 4.02006 17.71 3.63006L15.37 1.29006C14.98 0.900059 14.35 0.900059 13.96 1.29006L12.13 3.12006L15.88 6.87006L17.71 5.04006Z"
                                  fill="#ADFA00"
                                />
                              </svg>
                            </i>
                          ) : null}
                          {item.type === 'lesson' ? (
                            <i>
                              <svg
                                width="24"
                                height="19.5"
                                viewBox="0 0 24 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.2266 0.465517C11.1234 0.479579 10.8609 0.517079 10.6406 0.554579C10.2234 0.624892 1.18125 3.3202 0.834375 3.47489C0.328125 3.70458 0 4.12177 0 4.53427C0.0046875 4.94208 0.328125 5.34989 0.820313 5.57489C1.22344 5.76239 10.2375 8.44833 10.7344 8.5327C11.3391 8.63114 12.6656 8.63114 13.275 8.52802C13.7672 8.44833 22.5844 5.82802 23.1094 5.6077C24.2953 5.11083 24.2813 3.92489 23.0859 3.43739C22.6406 3.25927 13.7813 0.624892 13.3734 0.549891C12.975 0.479579 11.6063 0.428017 11.2266 0.465517Z"
                                  fill="#ADFA00"
                                />
                                <path
                                  d="M22.0312 7.43132C21.7875 7.50632 21.4734 7.60007 21.3422 7.63757L21.0938 7.70789V9.97195V12.236L20.8969 12.3251C20.3297 12.5782 19.8703 13.0985 19.6875 13.6891C19.5984 13.9751 19.5938 14.1251 19.5938 15.8313C19.5938 17.2094 19.6125 17.7204 19.6594 17.8985C19.95 18.9907 21.0469 19.7126 22.1344 19.5251C23.025 19.3704 23.7281 18.7282 23.9297 17.8704C24.0188 17.4907 24.0328 14.2844 23.9484 13.8813C23.8219 13.2813 23.3484 12.6626 22.8 12.3813L22.5 12.2266L22.4906 9.76101L22.4766 7.30007L22.0312 7.43132Z"
                                  fill="#ADFA00"
                                />
                                <path
                                  d="M4.50941 9.35318C4.53285 10.6282 4.55629 10.736 4.86566 11.1485C5.8266 12.4235 8.94847 13.2251 12.5391 13.1266C15.5532 13.0422 17.911 12.4001 18.9188 11.3876C19.2328 11.0688 19.3828 10.8016 19.4532 10.4266C19.5141 10.0938 19.5141 8.21881 19.4532 8.21881C19.4297 8.21881 18.2391 8.57037 16.8188 8.99693C15.3938 9.42349 14.0344 9.81256 13.8047 9.85943C13.2188 9.98599 12.1782 10.0563 11.5313 10.0188C10.5282 9.96256 10.05 9.85006 7.26097 9.01568C5.80316 8.57506 4.58441 8.21881 4.5516 8.21881C4.50472 8.21881 4.49535 8.46724 4.50941 9.35318Z"
                                  fill="#ADFA00"
                                />
                              </svg>
                            </i>
                          ) : null}
                          {item.title}
                        </Link>
                      ) : (
                        <>
                          {module.data[index - 1] &&
                          user &&
                          user[`${module.data[index - 1].type}s`].find(
                            elem => elem[module.data[index - 1].type] === module.data[index - 1]._id,
                          )?.status ? (
                            <h6 className="course-passing-modules__block-item-title">
                              <i>
                                <svg
                                  width="22"
                                  height="22"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM5.832 11.432L2.96 8.56C2.648 8.248 2.648 7.744 2.96 7.432C3.272 7.12 3.776 7.12 4.088 7.432L6.4 9.736L11.904 4.232C12.216 3.92 12.72 3.92 13.032 4.232C13.344 4.544 13.344 5.048 13.032 5.36L6.96 11.432C6.656 11.744 6.144 11.744 5.832 11.432Z"
                                    fill="#D1D1D6"
                                  />
                                </svg>
                              </i>
                              {item.title}
                            </h6>
                          ) : (
                            <h6 className="course-passing-modules__block-item-title">
                              <i>
                                <svg
                                  width="18"
                                  height="21"
                                  viewBox="0 0 12 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.99984 5.33366H9.33317V4.00033C9.33317 2.16033 7.83984 0.666992 5.99984 0.666992C4.15984 0.666992 2.6665 2.16033 2.6665 4.00033V5.33366H1.99984C1.2665 5.33366 0.666504 5.93366 0.666504 6.66699V13.3337C0.666504 14.067 1.2665 14.667 1.99984 14.667H9.99984C10.7332 14.667 11.3332 14.067 11.3332 13.3337V6.66699C11.3332 5.93366 10.7332 5.33366 9.99984 5.33366ZM5.99984 11.3337C5.2665 11.3337 4.6665 10.7337 4.6665 10.0003C4.6665 9.26699 5.2665 8.66699 5.99984 8.66699C6.73317 8.66699 7.33317 9.26699 7.33317 10.0003C7.33317 10.7337 6.73317 11.3337 5.99984 11.3337ZM3.99984 5.33366V4.00033C3.99984 2.89366 4.89317 2.00033 5.99984 2.00033C7.1065 2.00033 7.99984 2.89366 7.99984 4.00033V5.33366H3.99984Z"
                                    fill="#D1D1D6"
                                  />
                                </svg>
                              </i>
                              {item.title}
                            </h6>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    )
  )
}

export default CoursePassingModules
