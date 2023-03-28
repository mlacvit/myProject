import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCourseRequest } from '../../../store/actions/coursesActions'
import { getFieldError, inputChangeHandler, submitFormHandler } from '../../UI/Form/Handlers/Handlers'
import Modal from '../../UI/Modal2/Modal'
import FormInput from '../../UI/Form/FormInput/FormInput'
import FormSelect from '../../UI/Form/FormSelect/FormSelect'
import MainButton from '../../UI/MainButton/MainButton'
import './CreateCourseModal.scss'

const CreateCourseModal = ({ setOpen }) => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.categories)
  const error = useSelector(state => state.courses.error)
  const [course, setCourse] = useState({
    title: '',
    category: '',
    price: 0,
  })

  const handlerClick = e => {
    submitFormHandler(e, dispatch(createCourseRequest({ ...course })))
    setOpen(false)
  }

  return (
    <Modal setOpen={setOpen}>
      <div className="content">
        <span className="content__modal__title">Создание курса</span>
        <div className="content__modal">
          <form className="content__modal__form">
            <span className="content__modal__label">Введите название курса</span>
            <FormInput
              onChange={e => inputChangeHandler(e, setCourse)}
              value={course.title}
              name="title"
              placeholder="Название курса"
              className="inputModal"
              error={getFieldError(error, 'title')}
            />
            <span className="content__modal__label">Выберите категорию курса</span>
            <FormSelect
              onChange={e => inputChangeHandler(e, setCourse)}
              items={categories && categories}
              className="content__modal__select"
              error={getFieldError(error, 'category')}
            />
            <span className="content__modal__label">Установите цену</span>
            <FormInput
              onChange={e => inputChangeHandler(e, setCourse)}
              value={course.price}
              name="price"
              placeholder="Цена курса"
              className="inputModal"
              error={getFieldError(error, 'price')}
            />
            <MainButton
              disabled={!course.title || !course.category}
              className="GreenButton content__modal__button"
              text="Создать курс"
              onClick={e => handlerClick(e)}
              type="submit"
            />
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default CreateCourseModal
