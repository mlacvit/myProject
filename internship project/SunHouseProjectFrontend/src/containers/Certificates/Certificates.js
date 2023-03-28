import React from 'react'
import Title from '../../components/UI/Title/Title'
import Certificate from '../../components/Certificate/Certificate'
import './Certificates.scss'

const CERTIFICATES = [
  { course: 'Программист', datetime: '24 октября 2022 года' },
  {
    course: 'UX-UI',
    datetime: '24 октября 2022 года',
  },
]

const Certificates = () => (
  <div className="certificates">
    <Title>Мои сертификаты</Title>
    <div className="certificates__block">
      {CERTIFICATES.map((certificate, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Certificate key={certificate.course + i} course={certificate.course} datetime={certificate.datetime} />
      ))}
    </div>
  </div>
)

export default Certificates
