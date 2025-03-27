import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");  // ✅ Retrieve token

    if (!token) {
      setError("❌ Unauthorized: Please log in.");
      return;
    }

    axios.get("http://127.0.0.1:8000/orders/", {
        headers: { "Authorization": `Bearer ${token}` } // ✅ Attach token here
    })
    .then(response => setOrders(response.data))
    .catch(err => {
      console.error("❌ Error fetching orders:", err);
      setError("❌ Unauthorized: Please log in.");
    });
  }, []);

  return (
    <div className="container">
      <h2>📜 Your Orders</h2>
      {error && <p className="text-danger">{error}</p>}
      
      {orders.length > 0 ? (
        <ul className="list-group">
          {orders.map(order => (
            <li key={order.id} className="list-group-item">
              📄 {order.file_name} - {order.status}
            </li>
          ))}
        </ul>
      ) : !error && <p>No orders found.</p>}
      
      {/* ✅ Redirect to Login if Unauthorized */}
      {error && (
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          🔑 Login
        </button>
      )}
    </div>
  );
};

export default Orders;