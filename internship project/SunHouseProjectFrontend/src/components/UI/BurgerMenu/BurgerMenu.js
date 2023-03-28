import React, { useState } from 'react'
import './BurgerMenu.scss'

const BurgerMenu = () => {
  const [burgerClass, setBurgerClass] = useState('burger-bar unclicked')
  const [isMenuClicked, setIsMenuClicked] = useState(false)

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass('burger-bar clicked')
    } else {
      setBurgerClass('burger-bar unclicked')
    }
    setIsMenuClicked(!isMenuClicked)
  }

  return (
    <nav className="burger" onClick={updateMenu}>
      <div className="burger-menu">
        <div className={burgerClass} />
        <div className={burgerClass} />
        <div className={burgerClass} />
      </div>
    </nav>
  )
}

export default BurgerMenu
