import React, { useState } from 'react'
import './ButtonsContent.scss'

const ButtonsContent = ({ titleOne, titleTwo, childrenOne, childrenTwo, onClickOne, onClickTwo }) => {
  const [active, setActive] = useState(true)

  return (
    <div className="title-block">
      <div className="title-block__buttons">
        <div
          onClick={onClickOne}
          className={
            active ? 'title-block__buttons-item title-block__buttons-item--active' : 'title-block__buttons-item'
          }
        >
          <button type="button" onClick={() => setActive(true)} className="title-block__buttons-button">
            {titleOne}
          </button>
        </div>
        <div
          onClick={onClickTwo}
          className={
            active ? 'title-block__buttons-item' : 'title-block__buttons-item title-block__buttons-item--active'
          }
        >
          <button type="button" onClick={() => setActive(false)} className="title-block__buttons-button">
            {titleTwo}
          </button>
        </div>
      </div>
      <div>{active ? <>{childrenOne}</> : <>{childrenTwo}</>}</div>
    </div>
  )
}

export default ButtonsContent
