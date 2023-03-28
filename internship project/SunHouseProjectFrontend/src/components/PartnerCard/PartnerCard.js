import React from 'react'

import './PartnerCard.scss'

const PartnerCard = ({ image }) => (
  <div className="partner-card">
    <p>{image.altText}</p>
  </div>
)

export default PartnerCard
