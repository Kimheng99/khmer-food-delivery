import React, { useEffect, useState, useContext } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { BASE_URL, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      
      const res = await fetch(`${BASE_URL}/order/myorders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setOrders(data.data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.log("Fetch orders error:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatus = (status) => {
    return status?.toLowerCase();
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => {
          const status = getStatus(order.status);

          return (
            <div className="order-card" key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <div className="order-containder">
                <div className="order-progress">
                    <div className={`step ${["pending", "cooking", "delivered"].includes(status) ? "active" : ""}`}>
                    🟡 Pending
                    </div>

                    <div className={`line ${["cooking", "delivered"].includes(status) ? "active" : ""}`}></div>

                    <div className={`step ${["cooking", "delivered"].includes(status) ? "active" : ""}`}>
                    🔵 Cooking
                    </div>

                    <div className={`line ${status === "delivered" ? "active" : ""}`}></div>

                    <div className={`step ${status === "delivered" ? "active" : ""}`}>
                    🟢 Delivered
                    </div>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total:</strong> ${order.total}</p>
                    
                </div>

                <div className="customer-info">
                    <h4>Customer Info</h4>
                    <p><strong>Name:</strong> {order.customerInfo?.name}</p>
                    <p><strong>Phone:</strong> {order.customerInfo?.phone}</p>
                    <p><strong>Address:</strong> {order.customerInfo?.address}</p>
                    {order.items?.map((item, index) => (
                      <div className="it-container" key={index}>
                        <p>{item.name} x  </p>
                        <p> {item.quantity}</p>
                      </div>
                    ))}
                </div>
                </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyOrders;