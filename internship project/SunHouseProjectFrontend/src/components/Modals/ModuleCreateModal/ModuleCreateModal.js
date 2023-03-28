import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getFieldError, inputChangeHandler, submitFormHandler } from '../../UI/Form/Handlers/Handlers'
import { createModuleRequest } from '../../../store/actions/modulesActions'
import Modal from '../../UI/Modal2/Modal'
import FormInput from '../../UI/Form/FormInput/FormInput'
import MainButton from '../../UI/MainButton/MainButton'
import './ModuleCreateModal.scss'

const ModuleCreateModal = ({ setOpen, id, error }) => {
  const dispatch = useDispatch()
  const [moduleData, setModuleData] = useState({ title: '' })
  const handlerClick = e => {
    submitFormHandler(e, dispatch(createModuleRequest({ id, moduleData })))
    setOpen(false)
    setModuleData({ title: '' })
  }

  return (
    <Modal setOpen={setOpen}>
      <div className="content">
        <span className="content__module__title">Создание модуля</span>
        <div className="content__module">
          <form className="content__module__form">
            <span className="content__module__label">Введите название модуля</span>
            <FormInput
              onChange={e => inputChangeHandler(e, setModuleData)}
              value={moduleData.title}
              name="title"
              placeholder="Название"
              className="inputModal"
              error={getFieldError(error, 'title')}
            />
            <MainButton
              disabled={!moduleData.title}
              className="GreenButton content__module__button"
              text="Создать модуль"
              onClick={e => handlerClick(e)}
              type="submit"
            />
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default ModuleCreateModal
