import React from 'react'
import Select from 'react-select'
import FormInput from '../../../UI/Form/FormInput/FormInput'
import ProfileDescription from '../ProfileDescription/ProfileDescription'
import './LocationForm.scss'

const OPTIONS = [
  { value: 'kg', label: 'Кыргызстан' },
  { value: 'ru', label: 'Россия' },
  { value: 'kz', label: 'Казахстан' },
]

const LocationForm = ({ onChangeData, onChangeCountry, city, country }) => (
  <div className="location-block">
    <ProfileDescription title="Укажите местоположение" text="Разнообразный и богатый опыт сложившаяся структура" />
    <div className="location-block__form">
      <div>
        <Select
          className="location-block__form-select"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              padding: '7px 10px 7px 20px',
              borderRadius: '90px',
              borderWidth: '2px',
              borderColor: state.isFocused ? 'black' : '#E5E5EA',
              fontSize: '14px',
            }),
          }}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: 'black',
              primary25: 'grey',
            },
          })}
          value={country ? { value: 'user', label: country } : { value: 'df', label: 'Выберите страну' }}
          options={OPTIONS}
          onChange={onChangeCountry}
        />
      </div>
      <div>
        <FormInput
          className="location-block__form-input"
          onChange={onChangeData}
          name="city"
          placeholder="Город"
          value={city}
        />
      </div>
    </div>
  </div>
)

export default LocationForm
