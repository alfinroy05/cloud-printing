import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/orders/")
            .then(response => {
                console.log("📂 Orders Data:", response.data);  // ✅ Debugging
                setOrders(response.data);
            })
            .catch(error => console.error("❌ Error fetching orders:", error));
    }, []);

    return (
        <div className="container">
            <h2>Print Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>  // ✅ Show message if no data
            ) : (
                <ul className="list-group">
                    {orders.map(order => (
                        <li key={order.id} className="list-group-item">
                            <strong>{order.file_name}</strong> - {order.page_size}, {order.num_copies} copies, {order.print_type}
                            <br />
                            <small><strong>Requested by:</strong> {order.user.username} ({order.user.email})</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Orders;
