import React from 'react'
import './ModalOfCategory.scss'

const ModalOfCategory = ({ categories, setCategory }) => (
  <ul className="modal-category">
    <h4 className="modal-category__title">Категории:</h4>
    <div className="modal-category__block">
      <div>
        <li
          className="modal-category__list"
          onClick={() => {
            setCategory('all')
          }}
        >
          Все
        </li>
      </div>
      {categories.map(category => (
        <div key={category._id}>
          <li
            className="modal-category__list"
            onClick={() => {
              setCategory(category._id)
            }}
          >
            {category.title}
          </li>
        </div>
      ))}
    </div>
  </ul>
)

export default ModalOfCategory
