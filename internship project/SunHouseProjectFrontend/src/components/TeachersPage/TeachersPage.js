import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendGFRequest } from '../../store/actions/sendGFActions'
import { inputChangeHandler, submitFormHandler } from '../UI/Form/Handlers/Handlers'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Card from '../UI/Cards/Card/Card'
import MainButton from '../UI/MainButton/MainButton'
import Modal from '../UI/Modal2/Modal'
import FormInput from '../UI/Form/FormInput/FormInput'
import FormArea from '../UI/Form/FormArea/FormArea'
import './TeachersPage.scss'

const TeachersPage = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [data, setData] = useState({
    name: '',
    surname: '',
    email: '',
    tel: '',
    description: '',
  })

  const openToModalWindow = () => {
    setShow(true)
  }

  const submitAndCloseModal = e => {
    submitFormHandler(e, dispatch(sendGFRequest({ ...data })))
    setShow(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="teachers-page">
      <Header />
      <div className="container">
        <div>
          <span className="title teachers-page_title">Преподавателям</span>
        </div>
        <Card className="WhiteCard">
          <div className="teachers-page_items">
            <span className="teachers-page_items_item">
              Платформа EduSpace предоставляет возможность преподавателям или фирмам загружать свои курсы для проведения
              онлайн обучения, а также повышения квалификации своих работников.
            </span>
            <span className="teachers-page_items_item">
              Для вашего удобства платформа предоставляет удобный конструктор курса, регистрацию и оперативную
              поддержку. Возможность создавать открытые или приватные курсы.
            </span>
            <span className="teachers-page_items_item">
              Платформа осуществляет предмодерацию курса, однако в случае поступления жалоб на авторские права или иных
              жалоб от пользователей, оставляет право за собой на удаление курса.
            </span>
            <span className="teachers-page_items_item">Платформа взывает 10% от стоимости продажи курса</span>
            <span className="teachers-page_items_item">
              Вы также можете заказать изготовление курсов под ключ (написание сценария, съемка, монтаж и т.д.)
              Изготовим Изготовим курс для вас с последующей передачей готового материала вам, включая все права.
            </span>
          </div>
        </Card>
        <MainButton className="GreenButton teachers-page_btn" text="Заказать курс" onClick={openToModalWindow} />
      </div>
      {show ? (
        <Modal setOpen={() => setShow(false)}>
          <div className="teachers-page__modal_block">
            <strong className="teachers-page__modal_block-title">Введите информацию</strong>
            <form className="content__modal__form" onSubmit={submitAndCloseModal}>
              <FormInput
                onChange={e => inputChangeHandler(e, setData)}
                name="name"
                placeholder="Введите имя"
                value={data.name}
                className="inputModal teachers-page__modal_block-input"
              />
              <FormInput
                onChange={e => inputChangeHandler(e, setData)}
                name="surname"
                placeholder="Введите фамилию"
                value={data.surname}
                className="inputModal teachers-page__modal_block-input"
              />
              <FormInput
                onChange={e => inputChangeHandler(e, setData)}
                type="text"
                name="email"
                placeholder="Введите email"
                value={data.email}
                className="inputModal teachers-page__modal_block-input"
              />
              <FormInput
                onChange={e => inputChangeHandler(e, setData)}
                type="tel"
                name="tel"
                placeholder="Введите телефон"
                value={data.tel}
                className="inputModal teachers-page__modal_block-input"
              />
              <FormArea
                onChange={e => inputChangeHandler(e, setData)}
                name="description"
                placeholder="Введите описание"
                value={data.description}
                cols={5}
                rows={5}
                className="inputModal teachers-page__modal_block-input"
              />
              <MainButton className="GreenButton" type="submit" text="отправить" />
            </form>
          </div>
        </Modal>
      ) : null}
      <Footer />
    </div>
  )
}

export default TeachersPage
