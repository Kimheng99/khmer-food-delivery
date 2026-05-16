import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import { Route, Routes } from 'react-router-dom'
import Upload from './pages/Upload/Upload.jsx'
import List from './pages/List/List.jsx'
import Order from './pages/Order/Order.jsx'

const App = () => {
  return (
    <>
    <Navbar/>
    <div className="app-container">
      <Sidebar/>
      <div className="page-content">
        <Routes>
          <Route path='/' element={<Upload/>} />
          <Route path='/list' element={<List/>} />
          <Route path='/order' element={<Order/>} />
        </Routes>
      </div>
    </div>
    </>
  )
}

export default App
