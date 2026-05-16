import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import Upload from '../../pages/Upload/Upload'

const Sidebar = () => {
  return (
    
      <div className="sidebar-menu">
        <div className="box">
          <NavLink to="/" >
            <img src={assets.add_icon} alt="" className="icon" />
            <p className='title' >Add Items</p>
          </NavLink>
          <NavLink to="/list" >
            <i className="fa-solid fa-list-check icon"></i>
            <p className='title' >List Items</p>
          </NavLink>
          <NavLink to="/order" >
            <img src={assets.order_icon} alt="" className="icon" />
            <p className='title' >Order Items</p>
          </NavLink>
        </div>
      </div>
      
    
  )
}

export default Sidebar
