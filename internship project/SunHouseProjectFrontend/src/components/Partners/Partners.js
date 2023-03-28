import React from 'react'
import './Partners.scss'
import PartnerCard from '../PartnerCard/PartnerCard'
import partnersData from './partnersData'
import CustomSlider from '../UI/CustomSlider/CustomSlider'

const sliderSettings = [
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      rows: 2,
    },
  },
]

const Partners = () => (
  <section className="partners-section">
    <div className="container partners-section__container">
      <h2 className="partners-section__title">
        Сотрудничаем <br /> с ведущими компаниями
      </h2>
      <p className="partners-section__description">
        Собираем лучшие вакансии в отрасли, <br /> готовим к интервью и рекомендуем вас компаниям-партнёрам.
      </p>
      <div className="partners-section__cards">
        {partnersData.map(item => (
          <PartnerCard key={item.image} image={item} />
        ))}
      </div>
      <div className="slider">
        <CustomSlider response={sliderSettings}>
          {partnersData.map(item => (
            <div className="slider__item" key={item.image}>
              <PartnerCard image={item} />
            </div>
          ))}
        </CustomSlider>
      </div>
    </div>
  </section>
)

export default Partners
