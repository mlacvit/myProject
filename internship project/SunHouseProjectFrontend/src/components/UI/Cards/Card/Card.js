import React from 'react'
import './Card.scss'

const Card = ({ children, className }) => <div className={`Card ${className}`}>{children}</div>

export default Card
