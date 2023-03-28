import React from 'react'
import { Link } from 'react-router-dom'
import Eduspace from '../../../assets/logo/eduspace.svg'
import './Logo.scss'

const Logo = ({ className }) => (
  <Link to="/" className={`logo ${className}`} onClick={() => window.scrollTo(0, 0)}>
    <img src={Eduspace} alt="Eduspace" className="logo_image" />
  </Link>
)

export default Logo
