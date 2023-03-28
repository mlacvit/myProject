import React from 'react'
import './Certificate.scss'
import CertificateImage from '../../assets/images/certificate.png'

const Certificate = ({ course, datetime }) => (
  <div className="certificate">
    <div className="certificate__image-block">
      <img src={CertificateImage} className="certificate__image-block-img" alt="Eduspace" />
    </div>
    <div className="certificate__content-block">
      <h3 className="certificate__content-block-title">Успешное прохождение курса {course}</h3>
      <p className="certificate__content-block-datetime">{datetime}</p>
    </div>
  </div>
)

export default Certificate
