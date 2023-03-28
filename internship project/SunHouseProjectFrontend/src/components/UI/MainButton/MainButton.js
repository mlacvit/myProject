import React from 'react'
import './MainButton.scss'

const MainButton = ({ text, onClick, className, type, disabled }) => {
  let btnType = 'submit'
  if (type) btnType = type

  return (
    <button className={`MainButton ${className}`} type={btnType} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  )
}

export default MainButton
