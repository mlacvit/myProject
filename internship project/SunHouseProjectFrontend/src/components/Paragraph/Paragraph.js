import React, { useState } from 'react'
import Modal from '../UI/Modal2/Modal'
import EyeButton from '../EyeButton/EyeButton'
import './Paragraph.scss'

const Paragraph = ({ title, subtitle, teacherCheck, isVisibility, onVisibility, type }) => {
  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState(subtitle)

  const handleVisible = value => {
    onVisibility(type, value)
  }

  const handlerClick = () => {
    setOpen(true)
  }

  const updateDescription = e => {
    e.preventDefault()

    onVisibility('description', description, type)

    setOpen(false)
  }

  const inputChangeHandler = e => {
    const { value } = e.target
    setDescription(value)
  }

  return (
    <div className="block__paragraph">
      <i>
        <svg className="logo" xmlns="http://www.w3.org/2000/svg" width="48" height="38" viewBox="0 0 48 38" fill="none">
          <path
            d="M10.2826 9.39298C6.64046 11.8501 3.24578 14.6589 0.146872 17.7793C0.0756737 17.8535 0.0276942 17.947 0.00888581 18.0483C-0.00992254 18.1497 0.00127567 18.2543 0.0410703 18.3493C0.080865 18.4443 0.1475 18.5255 0.232752 18.5828C0.318003 18.64 0.418114 18.6709 0.52066 18.6716H13.0193C13.1203 18.6712 13.2193 18.7003 13.3042 18.7555C13.389 18.8107 13.4561 18.8895 13.4971 18.9823C13.5382 19.0752 13.5515 19.178 13.5353 19.2783C13.5192 19.3786 13.4744 19.472 13.4064 19.5471C7.90301 25.6993 5.46669 31.5798 7.68274 34.8706C7.83878 35.0978 8.01411 35.311 8.20673 35.5079C12.3418 39.7078 25.1741 36.4975 37.7161 27.9535C41.3557 25.4943 44.749 22.6857 47.8485 19.5672C47.9213 19.4937 47.9707 19.4 47.9904 19.2981C48.0101 19.1962 47.9993 19.0908 47.9592 18.9951C47.9191 18.8995 47.8517 18.818 47.7654 18.761C47.6792 18.704 47.5779 18.674 47.4747 18.6749H34.9795C34.8784 18.6753 34.7794 18.6462 34.6945 18.591C34.6097 18.5358 34.5426 18.457 34.5016 18.3642C34.4605 18.2713 34.4472 18.1685 34.4634 18.0682C34.4795 17.9679 34.5243 17.8745 34.5923 17.7994C40.0957 11.6472 42.5287 5.76674 40.3126 2.47596C40.1576 2.24794 39.9822 2.0346 39.7887 1.8386C35.6536 -2.36125 22.8213 0.832248 10.2826 9.39633"
            fill="#ADFA00"
          />
        </svg>
      </i>
      <div className="block__card-description">
        <h3 className="block__title" dangerouslySetInnerHTML={{ __html: title }} />
        <button type="button" className="block__add-link" onClick={e => handlerClick(e)} disabled={!teacherCheck}>
          {subtitle || `добавьте описании если необходимо`}
        </button>
        {open && (
          <Modal setOpen={setOpen}>
            <form onSubmit={updateDescription}>
              <div className="block__modal">
                <h3 className="block__modal-title">Добавить описание:</h3>
                <input
                  className="block__add-description"
                  name="description"
                  value={description.value}
                  onChange={inputChangeHandler}
                  type="text"
                />
                <button className="block__modal-btn" type="submit">
                  Сохранить
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
      {teacherCheck && <EyeButton handleVisible={handleVisible} isVisibility={isVisibility} />}
    </div>
  )
}

export default Paragraph
