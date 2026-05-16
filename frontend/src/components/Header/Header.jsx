import React from 'react'
import "./Header.css"
const Header = () => {
  return (
    <div className='header'>
      <div className="header-container">
        <div className="header-content">
        <h1>Authentic Khmer Food, Made with Love</h1>
        <p>Savor the rich flavors of Cambodia with our carefully prepared Khmer dishes. Fresh ingredients, traditional spices, and unforgettable taste — all in one place.</p>
        <a href="#findFood"><button className='button'><p class="text">View Menu</p></button></a>
        
      </div>
      </div>
    </div>
  )
}

export default Header
