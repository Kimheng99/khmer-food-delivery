import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import SignIn from './components/SignIn/SignIn'
import MyOrders from './pages/MyOrders/MyOrders'


const App = () => {
  
  const [showSignin,setShowSignin] = useState(false)
  

  return (
    <div className='app'>
      {showSignin?<SignIn setShowSignin={setShowSignin} />:<></>}
      
      <Navbar setShowSignin={setShowSignin} />

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path="/my-orders" element={<MyOrders/>} />
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App
