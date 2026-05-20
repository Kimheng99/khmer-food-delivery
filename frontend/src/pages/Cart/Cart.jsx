import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
const Cart = () => {

  const {food_list, cartItem, removeCart,calTotalAmount} = useContext(StoreContext)
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-container">
          <table className='cart-table'>
            <thead>
              <tr>
                <th>Item</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody >
            {
              food_list.map((item)=>{
                if(cartItem[item._id]>0){
                  return (
                      
                    <tr key={item._id}>
                      <td><img 
                        src={item.image} 
                        alt={item.name}
                        style={{ width: "50px" }}
                      /></td>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td>{cartItem[item._id]}</td>
                      <td>${cartItem[item._id]*item.price}</td>
                      <td className='remove-btn' onClick={()=>removeCart(item._id)} >X</td>
                    </tr>
                  
                  )
                }
                
              return null
              })
              
            }
            </tbody>
          </table>
          
      </div> 
      <div className='total-cart' >
            <h1>Total Cart</h1>
            <div className="cart-total-detail">
              <p>SubTotal</p>
              <p>${calTotalAmount()}</p>
            </div>
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>${calTotalAmount()===0?0:2}</p>
            </div>
            <div className="cart-total-detail">
              <p>Total</p>
              <p>${calTotalAmount()===0?0:calTotalAmount()+2}</p>
            </div>
            <button onClick={()=>navigate('/order')} >PROCESS TO CHECKOUT</button>
          </div>
    </div>
  )
}

export default Cart
