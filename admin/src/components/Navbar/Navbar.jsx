import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="logo-title">
            <img className='logo-img' src={assets.logo} alt='logo' />
            <img  className='profile-img' src={assets.profile_image} alt='profile'/>            
        </div>
        <div className="profile">
            <p>Admin panel</p>    
        </div>
    </div>
  )
}

export default Navbar
