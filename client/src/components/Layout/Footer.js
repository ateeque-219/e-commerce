import React from 'react'
import { NavLink } from 'react-router-dom'
import "../../styles/Footer.css"
const Footer = () => {
  return (
    <div className='footer'>
    <h1 className='text-center abc'>
      All right reserved &copy; shoppers
    </h1>
    <p className='text-center '>
    <NavLink to='/About'>About  </NavLink>|
    <NavLink to='/Contact'>Contact  </NavLink>|
    <NavLink to='/Privacy'>Privacy-Policy </NavLink>
    </p>
    </div>
  )
}

export default Footer