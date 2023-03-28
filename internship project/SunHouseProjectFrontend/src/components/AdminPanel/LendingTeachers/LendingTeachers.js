import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import Title from '../../UI/Title/Title'
import FormInput from '../../UI/Form/FormInput/FormInput'
import { inputChangeHandler } from '../../UI/Form/Handlers/Handlers'
import FormArea from '../../UI/Form/FormArea/FormArea'
import MainButton from '../../UI/MainButton/MainButton'
import {
  createTeachersRequest,
  deleteTeachersRequest,
  fetchTeachersRequest,
} from '../../../store/actions/lendingTeachersActions'
import { CreateNewObject } from '../../../utils/utils'
import TeacherCard from '../../TeachersBlock/TeacherCard/TeacherCard'
import { apiUrl } from '../../../config'

const LendingTeachers = () => {
  const dispatch = useDispatch()
  const teachers = useSelector(state => state.teachers.teachers)
  const [state, setState] = useState({ image: '', name: '', description: '' })
  const [image, setImage] = useState(null)
  const newTeachers = CreateNewObject(teachers)
  useEffect(() => {
    dispatch(fetchTeachersRequest())
  }, [dispatch])
  const fileChangeHandler = e => {
    setImage(URL.createObjectURL(e.target.files[0]))
    const { name } = e.target
    const file = e.target.files[0]
    setState(prev => ({ ...prev, [name]: file }))
  }

  const submitFormHandler = e => {
    e.preventDefault()
    const formData = new FormData()
    Object.keys(state).forEach(key => {
      formData.append(key, state[key])
    })
    dispatch(createTeachersRequest(formData))
    setState({ image: '', name: '', description: '' })
    setImage(null)
  }
  const deleteTeacherForLending = id => {
    dispatch(deleteTeachersRequest(id))
  }

  return (
    <>
      <div className="reviews">
        <Title>Преподаватели</Title>
        <div className="reviews__wrapper">
          <h4 className="reviews__subtitle">Добавить преподавателя</h4>
          <div className="reviews__wrapper-inner">
            <div className="reviews__wrapper-inner2">
              <div className="reviews__input-label">
                <input type="file" name="image" className="reviews__input-file" onChange={fileChangeHandler} />
                <img
                  src={image || (state.image ? `${apiUrl}/${state.image}` : null)}
                  alt={state.title}
                  className="reviews__input-label-image"
                />
                {!state.image ? (
                  <i className="reviews__input-img">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M24 21.3333V2.66667C24 1.2 22.8 0 21.3333 0H2.66667C1.2 0 0 1.2 0 2.66667V21.3333C0 22.8 1.2 24 2.66667 24H21.3333C22.8 24 24 22.8 24 21.3333ZM7.86667 14.64L10.6667 18.0133L14.8 12.6933C15.0667 12.3467 15.6 12.3467 15.8667 12.7067L20.5467 18.9467C20.88 19.3867 20.56 20.0133 20.0133 20.0133H4.02667C3.46667 20.0133 3.16 19.3733 3.50667 18.9333L6.82667 14.6667C7.08 14.32 7.58667 14.3067 7.86667 14.64Z"
                        fill="white"
                      />
                    </svg>
                  </i>
                ) : null}
              </div>
              <div className="reviews__wrapper-inner3">
                <FormInput
                  required
                  type="text"
                  name="name"
                  value={state.name}
                  placeholder="Имя Фамилия"
                  className="reviews__input"
                  onChange={e => inputChangeHandler(e, setState)}
                />
              </div>
            </div>
            <div className="reviews__textarea-wrapper">
              <FormArea
                required
                name="description"
                value={state.description}
                cols="50"
                rows="10"
                placeholder="Тут будет описание преподвателя"
                className="reviews__textarea"
                onChange={e => inputChangeHandler(e, setState)}
                max="350"
              />
              <span
                className={
                  state.description.length !== 350 ? 'reviews__textarea-counter' : 'reviews__textarea-counter-red'
                }
              >
                Количество символов: {state.description.length}/350
              </span>
            </div>
          </div>
        </div>
        <MainButton
          disabled={!state.name || !state.image || !state.description}
          text="Добавить"
          type="button"
          onClick={e => submitFormHandler(e)}
          className={
            state.name && state.description && state.image
              ? 'GreenButton reviews__button'
              : 'GreenButton reviews__button reviews__button-disabled'
          }
        />
      </div>
      <div className="teacher-inner-block">
        <h2 className="teacher-inner-block__title">Преподаватели</h2>
        <div className="teacher-inner-block__content">
          {newTeachers.map(teacher => (
            <span
              className="teacher-inner-block__content-card"
              key={(teacher.user && teacher.user._id) || teacher.name}
            >
              <TeacherCard
                user={teacher.user}
                description={teacher.description}
                deleteCard={() => deleteTeacherForLending(teacher.user._id)}
              />
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

export default LendingTeachers
