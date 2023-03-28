import React from 'react'
import Card from '../UI/Cards/Card/Card'
import MainButton from '../UI/MainButton/MainButton'
import EduSpaceIcon from '../../assets/icons/eduspaceicon.svg'
import './Rates.scss'

const Rates = () => {
  const getHoverCards = id => {
    const getElem = document.querySelector(`#${id}`)
    getElem.children[0].className = 'Card GreenCard cards'
    getElem.children[0].children[2].className = 'MainButton WhiteButton btn'
  }

  const outHoverCards = id => {
    const getElem = document.querySelector(`#${id}`)
    getElem.children[0].className = 'Card WhiteCard cards'
    getElem.children[0].children[2].className = 'MainButton GreenButton btn'
  }

  return (
    <div className="all">
      <div className="titleLogo">
        <img className="logo" src={EduSpaceIcon} alt="EduSpaceIcon" />
        <span className="title">Тарифы</span>
      </div>
      <div className="rates">
        <div className="item" id="one" onMouseMove={() => getHoverCards('one')} onMouseOut={() => outHoverCards('one')}>
          <Card className="WhiteCard cards">
            <span className="subtitle">Базовый</span>
            <span className="content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci aut corporis,dolore dolores ex fugit
              impedit ipsa iusto laborum libero modi nam nobis, omnis quae repellat totam? Dignissimos, omnis.
            </span>
            <MainButton className="MainButton GreenButton btn" text="Хочу на курс" />
          </Card>
        </div>
        <div className="item" id="two" onMouseMove={() => getHoverCards('two')} onMouseOut={() => outHoverCards('two')}>
          <Card className="WhiteCard cards">
            <span className="subtitle">Оптимальный</span>
            <span className="content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci aut corporis,dolore dolores ex fugit
              impedit ipsa iusto laborum libero modi nam nobis, omnis quae repellat totam? Dignissimos, omnis. Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Alias cum facere harum id maxime molestiae quo totam
              ut. Atque esse explicabo quae saepe unde. In laborum maiores modi molestiae quasi!
            </span>
            <MainButton className=" MainButton GreenButton btn" text="Хочу на курс" />
          </Card>
        </div>
        <div
          className="item"
          id="three"
          onMouseMove={() => getHoverCards('three')}
          onMouseOut={() => outHoverCards('three')}
        >
          <Card className="WhiteCard cards">
            <span className="subtitle">Премиум</span>
            <span className="content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci aut corporis,dolore dolores ex fugit
              impedit ipsa iusto laborum libero modi nam nobis, omnis quae repellat totam? Dignissimos, omnis.
            </span>
            <MainButton className="GreenButton btn" text="Хочу на курс" />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Rates
