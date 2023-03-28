import React, { useState } from 'react'
import './Swither.scss'

const Switcher = ({ value, onChange }) => {
  const [switcher, setSwitcher] = useState(value)

  const changeSwitcher = e => {
    setSwitcher(e)
    onChange({ target: { name: 'private', value: e } })
  }
  return (
    <button
      type="button"
      className={switcher ? 'switch-btn switch-on' : 'switch-btn'}
      onClick={() => changeSwitcher(!switcher)}
    />
  )
}

export default Switcher
