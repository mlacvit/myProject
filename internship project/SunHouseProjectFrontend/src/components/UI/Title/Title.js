import React from 'react'
import './Title.scss'

const Title = ({ children, className }) => <h5 className={`title ${className}`}>{children}</h5>

export default Title
