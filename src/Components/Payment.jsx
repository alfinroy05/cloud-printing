import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Extract numPages & numCopies from state or set defaults
  const { numPages = 1, numCopies = 1 } = location.state || {};
  const pricePerPage = 2; // ₹2 per page
  const totalAmount = numPages * numCopies * pricePerPage;

  const [paymentDone, setPaymentDone] = useState(false);

  const handlePayment = () => {
    alert(`✅ Payment of ₹${totalAmount} Successful!`);
    setPaymentDone(true);

    // ✅ Navigate to Orders Page after payment
    navigate("/orders", { state: { successMessage: "✅ Payment Successful! Your order has been placed." } });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 text-center">
            <h2>💳 Make Payment</h2>
            <p>Price: ₹{pricePerPage} per page</p>

            <p><strong>Selected Pages:</strong> {numPages}</p>
            <p><strong>Copies:</strong> {numCopies}</p>

            <h4><strong>Total Amount:</strong> ₹{totalAmount}</h4>

            <button
              className="btn btn-success mt-3"
              onClick={handlePayment}
              disabled={paymentDone}
            >
              {paymentDone ? "✅ Payment Completed" : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;