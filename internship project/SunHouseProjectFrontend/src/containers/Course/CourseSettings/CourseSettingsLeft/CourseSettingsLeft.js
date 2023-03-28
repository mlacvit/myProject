import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import FormInput from '../../../../components/UI/Form/FormInput/FormInput'
import { deleteCourseRequest } from '../../../../store/actions/coursesActions'
import Switcher from '../../../../components/UI/Switcher/Switcher'
import Modal from '../../../../components/UI/Modal2/Modal'
import Card from '../../../../components/UI/Cards/Card/Card'
import './CourseSettingsLeft.scss'
import { inputChangeHandler } from '../../../../components/UI/Form/Handlers/Handlers'

const CourseSettingsLeft = ({ course, setCourse }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [open, setOpen] = useState(false)

  const changeInputState = e => {
    inputChangeHandler(e, setCourse)
  }

  const handleDelete = () => {
    dispatch(deleteCourseRequest(id))
  }

  return (
    <div className="block-form">
      <form className="course-settings__right-form">
        <div>
          <div className="block-form__input-block">
            <span className="block-form__input-block_label">Название курса</span>
            <FormInput
              onChange={changeInputState}
              name="title"
              placeholder="Введите название"
              value={course.title}
              className="block-form__input-block_input"
            />
            <span className="block-form__input-block_label">Описание курса</span>
            <FormInput
              onChange={changeInputState}
              name="description"
              cou
              placeholder="Введите описание"
              value={course.description}
              className="block-form__input-block_input"
            />
          </div>
          <div className="block-form__nav-block">
            <div className="block-form__nav-block_item">
              <span className="block-form__input-block_label">Статус курса</span>
              <div className="block-form__nav-block_item-mini">
                <span className="block-form__nav-block_item-mini_label">
                  {course?.private ? 'Открытый курс' : 'Закрытый курс'}
                </span>
                <Switcher onChange={changeInputState} value={course.private} />
              </div>
            </div>
            <div className="block-form__nav-block_rem">
              <span className="block-form__input-block_label">Удаление курса</span>
              <button type="button" onClick={() => setOpen(true)} className="block-form__nav-block_btn">
                Удалить курс
              </button>
            </div>
          </div>
        </div>
      </form>
      {open ? (
        <Modal setOpen={setOpen}>
          <Card className="block-form_modal">
            <span className="block-form_modal_title">Удалить курс?</span>
            <div className="block-form_modal_item">
              <button type="button" onClick={() => setOpen(false)} className="block-form_modal_item-btn">
                Отмена
              </button>
              <button type="button" onClick={handleDelete} className="block-form__nav-block_btn">
                Удалить курс
              </button>
            </div>
          </Card>
        </Modal>
      ) : null}
    </div>
  )
}
export default CourseSettingsLeft
