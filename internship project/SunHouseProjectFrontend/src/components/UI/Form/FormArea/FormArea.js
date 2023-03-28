import React from 'react'

const FormArea = ({ name, value, onChange, placeholder, className, required, error, cols, rows, max }) => (
  <>
    <textarea
      max={max}
      cols={cols}
      rows={rows}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`InputStyle TextArea ${className}`}
      required={required}
      maxLength={max}
    />
    {error ? <span className="helper">{error}</span> : null}
  </>
)

export default FormArea
