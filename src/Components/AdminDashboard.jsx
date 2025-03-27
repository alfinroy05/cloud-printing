import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const today = new Date().toLocaleDateString(); // ✅ Get today's date

  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ Retrieve token

    if (!token) {
      setError("❌ Unauthorized: Please log in.");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/orders/", {
        headers: { "Authorization": `Bearer ${token}` } // ✅ Attach token here
      })
      .then((response) => setOrders(response.data))
      .catch((error) => {
        console.error("❌ Error fetching orders:", error);
        setError("❌ Unauthorized: Please log in.");
      });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col col-12">
            {/* ✅ Heading with Today's Date */}
            <h2 className="text-center mt-4">📅 Today's Work - {today}</h2>
            {error && <p className="text-danger">{error}</p>}
          </div>
          <div className="col col-12">
            {/* ✅ Table Structure */}
            <div className="table-responsive mt-4">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Uploaded File</th>
                    <th>Status</th>
                    <th>Email ID</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.user.username}</td>
                        <td>
                          <a href={`http://127.0.0.1:8000${order.file_url}`} target="_blank" rel="noopener noreferrer">
                            {order.file_name}
                          </a>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              order.status === "pending"
                                ? "bg-warning"
                                : order.status === "completed"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>{order.user.email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No orders available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;