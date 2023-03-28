import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../../UI/Title/Title'
import {
  createCategoryRequest,
  deleteCategoryRequest,
  fetchCategoriesRequest,
} from '../../../store/actions/categoriesActions'
import MainButton from '../../UI/MainButton/MainButton'
import { inputChangeHandler, submitFormHandler } from '../../UI/Form/Handlers/Handlers'
import FormInput from '../../UI/Form/FormInput/FormInput'
import FormArea from '../../UI/Form/FormArea/FormArea'
import './AddCategory.scss'

const AddCategory = () => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.categories)
  const [state, setState] = useState({ title: '', description: '' })
  useEffect(() => {
    dispatch(fetchCategoriesRequest())
  }, [dispatch])
  const deleteCategory = id => {
    dispatch(deleteCategoryRequest(id))
  }
  return (
    <div className="category">
      <Title>Категории курсов</Title>
      <div className="category__add-category">
        <h3 className="category__add-category-title">Тут создаются категории</h3>
        <FormInput
          type="text"
          required
          name="title"
          value={state.title}
          onChange={e => inputChangeHandler(e, setState)}
          placeholder="Название категории"
          className="inputModal category__add-category-input"
        />
        <FormArea
          type="text"
          name="description"
          value={state.description}
          onChange={e => inputChangeHandler(e, setState)}
          placeholder="Описание категории"
          rows="6"
          className="category__add-category-input"
        />
        <MainButton
          disabled={!state.title}
          text="Создать"
          type="button"
          className={state.title ? 'GreenButton' : 'category__add-category-btn'}
          onClick={e => submitFormHandler(e, dispatch(createCategoryRequest(state)))}
        />
      </div>
      <div className="category__wrapper">
        {categories.map(category => (
          <div key={category._id} className="category__inner-block">
            <p className="category__inner-block-content">
              <span className="category__inner-block-title">Название:</span> {category.title}
            </p>
            {category.description ? (
              <p className="category__inner-block-content">
                <span className="category__inner-block-title">Описание:</span> {category.description}
              </p>
            ) : null}
            <MainButton
              text="Удалить категорию"
              className="RedButton"
              type="button"
              onClick={() => deleteCategory(category._id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddCategory
