import React, { useEffect, useState, useContext } from 'react'
import './Order.css'
import axios from 'axios'
import { assets } from '../../assets/assets.js'
import Swal from 'sweetalert2'
import { StoreContext } from '../../context/StoreContext'

const Order = () => {
  

  const [orders, setOrders] = useState([]);
  const {BASE_URL} = useContext(StoreContext)


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/order/list`);

          console.log("API response:", res.data); 

          if (res.data.success) {
            setOrders(res.data.data); 
          }
          

        } catch (error) {
          console.log(error);
        }
        
      };
  const updateStatus = async (orderId, status) => {
      try {
        await axios.post(`${BASE_URL}/order/status`, {
          orderId,
          status
        });

        fetchOrders();  

      } catch (error) {
        console.log(error);
      }
    };

  const deleteOrder = (orderId) => {
      Swal.fire({
        title: "Are you sure?",
        text: "This order will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axios.post(
              `${BASE_URL}/order/delete`,
              { orderId }
            );

            if (res.data.success) {
              // remove from UI
              setOrders((prevOrders) =>
                prevOrders.filter((order) => order._id !== orderId)
              );

              Swal.fire({
                title: "Deleted!",
                text: "Order has been deleted.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
              });

            } else {
              Swal.fire("Error", res.data.message, "error");
            }

          } catch (error) {
            console.log(error);
            Swal.fire("Error", "Something went wrong", "error");
          }
        }
      });
    };
  

  return (
    <div className='order'>
      <h1>Orders</h1>

      <div className="order-container">
          {Array.isArray(orders) && orders.map((order) => (
            <div key={order._id} className="order-card">
            <div className="order-icon">
                <img src={assets.parcel_icon} alt="" />
            </div>
            <div className="order-infor">
              <div className="order-box1">
                <h3>Customer Info</h3>
                  <p><b>Name:</b> {order.customerInfo.name}</p>
                  <p><b>Address:</b> {order.customerInfo.address}</p>
                  <p><b>Phone:</b> {order.customerInfo.phone}</p>

                  <h3>Items</h3>
                  {order.items.map((item) => (
                      <div className='it-container'>
                        <p>{item.name}</p>
                        <p>${item.price} x</p>
                        <p>{item.quantity}</p>
                      </div>
                    ))}
              </div>
              <div className="order-box2">
                <h3>Total</h3>
                <p>Delivery fee: $2</p>
                <p>Total Price: ${order.total}</p>
                <select
                  className={`status ${order.status.toLowerCase()}`}
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                >
                  <option value="Pending">🟡 Pending</option>
                  <option value="Cooking">🔵 Cooking</option>
                  <option value="Delivered">🟢 Delivered</option>
                </select>
                {order.status === "Delivered" && (
                  <button onClick={() => deleteOrder(order._id)}>
                    🗑 Delete
                  </button>
                )}
              </div>

            </div>

          </div>
        ))}
        
      </div>
    </div>
  )
}

export default Order