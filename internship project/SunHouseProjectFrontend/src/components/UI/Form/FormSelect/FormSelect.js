import React from 'react'
import '../FormInput/FormInput.scss'

const FormSelect = ({ items, onChange, error }) => (
  <div>
    <select onChange={onChange} name="category" className={error ? 'InputStyle error' : 'InputStyle'}>
      <option value="">Выберите категорию курса</option>
      {items.map(item => (
        <option key={item._id} value={item._id}>
          {item.title}
        </option>
      ))}
    </select>
    <div className="helper">{error ? <span>{error}</span> : null}</div>
  </div>
)

export default FormSelect
