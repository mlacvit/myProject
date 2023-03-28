import React from 'react'

const FooterLink = ({ href, className, children, onClick }) => (
  <a href={href} className={className} onClick={onClick}>
    {children}
  </a>
)

export default FooterLink
