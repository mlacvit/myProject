import React from 'react'
import './FormCheck.scss'

const FormCheck = ({ onChange }) => (
  <>
    <input type="checkbox" className="check" onChange={onChange} />
  </>
)

export default FormCheck
