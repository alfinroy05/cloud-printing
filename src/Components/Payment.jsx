import React, { useState } from "react";

const Payment = ({ onPaymentSuccess }) => {
  const [numPages, setNumPages] = useState(1);
  const [paymentDone, setPaymentDone] = useState(false);
  const pricePerPage = 2; // ₹2 per page
  const totalAmount = numPages * pricePerPage;

  const handlePayment = () => {
    alert(`✅ Payment of ₹${totalAmount} Successful!`);
    setPaymentDone(true);
    onPaymentSuccess(numPages); // ✅ Notify parent component
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col col-12 text-center">
            <h2>💳 Make Payment</h2>
            <p>Price: ₹{pricePerPage} per page</p>

            <label className="form-label">Select Number of Pages:</label>
            <select
              className="form-select mb-3"
              value={numPages}
              onChange={(e) => setNumPages(Number(e.target.value))}
            >
              {[...Array(10).keys()].map(i => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <h4>Total: ₹{totalAmount}</h4>
            <button className="btn btn-success mt-3" onClick={handlePayment} disabled={paymentDone}>
              {paymentDone ? "✅ Payment Completed" : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
