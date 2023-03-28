import React from 'react'
import BigLogo from '../../assets/images/BigLogo.png'
import Vector from '../../assets/images/Vector.png'
import './About.scss'

const About = () => (
  <div className="about">
    <div className="container about_con">
      <div className="about_con_left">
        <div className="about_con_left_imgUnderBlock">
          <img src={Vector} className="about_con_left_imgUnderBlock_image" alt="Eduspace" />
        </div>
        <div className="about_con_left_imgUpBlock">
          <img src={BigLogo} className="about_con_left_imgUpBlock_image" alt="Eduspace" />
        </div>
      </div>
      <div className="about_con_right">
        <h3 className="about_con_right_title">О платформе</h3>
        <p className="about_con_right_sub-title">Мы современная платформа для развития и профессионального роста</p>
        <p className="about_con_right_text">
          У нас вы можете увидеть сочетание новейших образовательных, информационных технологий и экспертных
          руководителей курсов, работающих в своей сфере по сей день.
        </p>
      </div>
    </div>
  </div>
)

export default About
