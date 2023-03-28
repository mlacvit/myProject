import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../UI/Modal2/Modal'
import { inputChangeHandler, submitFormHandler } from '../UI/Form/Handlers/Handlers'
import { createCourseRequest } from '../../store/actions/coursesActions'
import Card from '../UI/Cards/Card/Card'
import FormInput from '../UI/Form/FormInput/FormInput'
import FormSelect from '../UI/Form/FormSelect/FormSelect'
import MainButton from '../UI/MainButton/MainButton'

const ModalCourseCreate = ({ show, clicked }) => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.categories)
  const [course, setCourse] = useState({
    title: '',
    category: '',
  })

  return (
    <Modal show={show} clicked={clicked} title="Создание курса">
      <Card className="Card WhiteCard">
        <form onSubmit={e => submitFormHandler(e, dispatch(createCourseRequest({ ...course })))}>
          <FormInput
            onChange={e => inputChangeHandler(e, setCourse)}
            value={course.title}
            name="title"
            placeholder="введите название курса"
          />
          <FormSelect onChange={e => inputChangeHandler(e, setCourse)} items={categories && categories} />
          <MainButton className="GreenButton" text="Создать курс" onClick={clicked} type="submit" />
        </form>
      </Card>
    </Modal>
  )
}

export default ModalCourseCreate
