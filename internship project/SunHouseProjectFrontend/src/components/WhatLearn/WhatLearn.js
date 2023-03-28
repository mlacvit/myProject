import React, { useState } from 'react'
import LearnCardText from './LearnCardText/LearnCardText'
import Paragraph from '../Paragraph/Paragraph'
import Modal from '../UI/Modal2/Modal'
import './WhatLearn.scss'

const WhatLearn = ({ teacherCheck, willLearn, onVisibilityBlock, block }) => {
  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState({
    title: '',
    description: '',
    image: null,
  })
  const newLearn = [...willLearn]

  const handleFileChange = e => {
    if (!e.target.files) {
      return
    }
    setDescription(prev => ({
      ...prev,
      image: e.target.files[0],
      title: prev.title,
      description: prev.description,
    }))
  }

  const handlerClick = () => {
    setOpen(true)
  }

  const updateDescription = e => {
    e.preventDefault()

    newLearn.push(description)
    onVisibilityBlock('willLearn', newLearn)
    setDescription({
      title: '',
      description: '',
      image: null,
    })
    setOpen(false)
  }

  const inputChangeHandler = e => {
    const { name, value } = e.target
    setDescription(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const deleteBlock = index => {
    newLearn.splice(index, 1)

    onVisibilityBlock('willLearn', newLearn)
  }

  return (
    <div className="learn-plan-block">
      <Paragraph
        title="Чему вы научитесь"
        subtitle={block?.description}
        teacherCheck={teacherCheck}
        type="blockLearn"
        onVisibility={onVisibilityBlock}
        isVisibility={block?.visibility}
      />
      {teacherCheck ? (
        <>
          <div className="learn-plan-block__cards">
            <button type="button" className="learn-plan-block__btn-plus" onClick={e => handlerClick(e)}>
              <div className="learn-plan-block__btn-plus-icon">+</div>
              <span className="learn-plan-block__btn-plus-text">Добавить блок ...</span>
            </button>
            {newLearn.map((item, index) => (
              <LearnCardText
                key={item._id || item.title}
                title={item.title}
                image={item.image}
                description={item.description}
                deleteBlock={() => deleteBlock(index)}
              />
            ))}
          </div>
          {open && (
            <Modal setOpen={setOpen}>
              <form onSubmit={updateDescription}>
                <div className="block__modal">
                  <h3 className="block__modal-title">Добавить описание:</h3>
                  <input
                    className="block__add-description"
                    name="title"
                    value={description.title}
                    onChange={inputChangeHandler}
                    placeholder="Введите название..."
                    required
                    type="text"
                  />
                  <input
                    className="block__add-description"
                    name="description"
                    value={description.description}
                    onChange={inputChangeHandler}
                    placeholder="Введите описание..."
                    type="text"
                    required
                  />
                  <div className="field__wrapper">
                    <input
                      name="file"
                      type="file"
                      id="field__file-2"
                      className="field field__file"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <label className="field__file-wrapper" htmlFor="field__file-2">
                      <div className="field__file-fake">
                        {description.image ? `${description.image.name}` : 'Файл не выбран'}
                      </div>
                      <div className="field__file-button">Выбрать</div>
                    </label>
                  </div>
                  <button className="block__modal-btn" type="submit">
                    Сохранить
                  </button>
                </div>
              </form>
            </Modal>
          )}
        </>
      ) : (
        <div className="learn-plan-block__cards">
          {newLearn.map(item => (
            <LearnCardText
              key={item._id || item.title}
              title={item.title}
              image={item.image}
              description={item.description}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default WhatLearn
