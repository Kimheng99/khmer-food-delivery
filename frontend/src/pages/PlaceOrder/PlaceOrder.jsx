import { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import Swal from 'sweetalert2'

const PlaceOrder = () => {

  const { calTotalAmount, cartItem, food_list, token, BASE_URL,setCartItem  } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    address: "",
    phone: ""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!token) {
    Swal.fire({
      title: "Please login",
      text: "You need to login before ordering",
      icon: "warning"
    });
    return;
  }

  const items = food_list
    .filter(item => cartItem[item._id] > 0)
    .map(item => ({
      foodId: item._id,
      name: item.name,
      category: item.category,
      price: item.price,
      quantity: cartItem[item._id],
      total: item.price * cartItem[item._id]
    }));

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subTotal = calTotalAmount();
  const deliveryFee = subTotal === 0 ? 0 : 2;
  const total = subTotal + deliveryFee;

  const orderData = {
    customerInfo: {
      name: data.name,
      address: data.address,
      phone: data.phone
    },
    items,
    totalQuantity,
    subTotal,
    deliveryFee,
    total
  };

  try {
    const res = await axios.post(`${BASE_URL}/order/create`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    if (res.data.success) {
      setCartItem({});
      Swal.fire({
        title: "Ordered!",
        text: "Your Order Successfully!",
        icon: "success"
      });
    }
  } catch (error) {
    console.log(error);
    alert("Error placing order");
  }
};

  return (
    <form className='order-infor' onSubmit={handleSubmit}>
      
      <div className="costomer-infor">
        <h1>Costomer Information</h1>

        <label>Name: </label>
        <input type="text" name="name" placeholder='name' onChange={handleChange} required />

        <label>Address: </label>
        <input type="text" name="address" placeholder='address' onChange={handleChange} required />

        <label>Phone Number: </label>
        <input type="text" name="phone" placeholder='phone number' onChange={handleChange} required />
      </div>
      
      <div className='total-cart'>
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

        <button type='submit'>PROCESS TO PAYMENT</button>
      </div>
    </form>
  )
}

export default PlaceOrder