import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getFieldError, inputChangeHandler, submitFormHandler } from '../../UI/Form/Handlers/Handlers'
import { createTestRequest } from '../../../store/actions/testsActions'
import Modal from '../../UI/Modal2/Modal'
import FormInput from '../../UI/Form/FormInput/FormInput'
import MainButton from '../../UI/MainButton/MainButton'
import FormCheck from '../../UI/Form/FormCheck/FormCheck'
import test from '../../../assets/icons/test.svg'
import './CreateTestModal.scss'

const CreateTestModal = ({ setOpen, courseId, moduleId, setModalType, error }) => {
  const dispatch = useDispatch()
  const [testData, setTestData] = useState({
    title: '',
    correct: 100,
    random: false,
  })

  const [isChecked, setIsChecked] = useState(true)

  const handleOnChangeChecked = () => {
    setIsChecked(!isChecked)
    setTestData({ ...testData, random: isChecked })
  }

  const handlerClick = e => {
    submitFormHandler(e, dispatch(createTestRequest({ courseId, moduleId, testData })))
    setOpen(false)
    setTestData({ title: '', correct: 0, random: false })
  }

  return (
    <Modal setOpen={setOpen}>
      <div className="content">
        <img src={test} alt="test" className="content__test__img" />
        <span className="content__test__title">Настройте тест</span>
        <div className="content__test">
          <form>
            <span className="content__test__label">Название теста</span>
            <FormInput
              onChange={e => inputChangeHandler(e, setTestData)}
              value={testData.title}
              name="title"
              placeholder="Название"
              className="inputModal"
              error={getFieldError(error, 'title')}
            />
            <span className="content__test__label">Процент правильных ответов для выполнения</span>
            <FormInput
              onChange={e => inputChangeHandler(e, setTestData)}
              type="number"
              min="0"
              max="100"
              value={testData.correct}
              name="correct"
              placeholder="0"
              className="inputModal"
              error={getFieldError(error, 'correct')}
            />
            <div className="content__test__checkbox">
              <FormCheck onChange={handleOnChangeChecked} />
              <span>Случайный порядок вопросов</span>
            </div>
            <span className="content__test__subtitle">Вопросы будут задаваться в случайном порядке</span>
            <div className="content__test__button-block">
              <MainButton
                className="WhiteButton content__btn"
                text="Назад"
                type="button"
                onClick={() => setModalType('content')}
              />
              <MainButton
                disabled={!testData.title || !testData.correct}
                className="GreenButton content__btn-two"
                text="Создать тест"
                onClick={e => handlerClick(e)}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default CreateTestModal
