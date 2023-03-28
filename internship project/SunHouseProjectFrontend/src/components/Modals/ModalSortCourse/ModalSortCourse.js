import React from 'react'

const ModalSortCourse = ({ sortCourse }) => {
  const sortArray = [
    { key: 'rating', name: 'по рейтингу', id: 1 },
    { key: 'new', name: 'сначало новые', id: 2 },
    { key: 'old', name: 'сначало старые', id: 3 },
    { key: 'cheap', name: 'сначало дешевле', id: 4 },
    { key: 'expensive', name: 'сначало дороже', id: 5 },
  ]

  return (
    <ul className="modal-category">
      <h4 className="modal-category__title">Сортировать:</h4>
      <div className="modal-category__block">
        {sortArray &&
          sortArray.map(list => (
            <li
              key={list.id}
              className="modal-category__list"
              onClick={() => {
                sortCourse(list.key)
              }}
            >
              {list.name}
            </li>
          ))}
      </div>
    </ul>
  )
}

export default ModalSortCourse
