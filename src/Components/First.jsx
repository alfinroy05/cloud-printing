import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";  

const First = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ For error messages
  const navigate = useNavigate(); // ✅ For redirecting after login

  const handleLogin = async () => {
    setError(""); // ✅ Clear previous errors
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });

      // ✅ Store JWT token in local storage
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Save user details
      alert("Login Successful!");

      // ✅ Redirect to dashboard
      navigate("/upload");  
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Invalid Email or Password!");
      } else {
        setError("Server error! Please try again later.");
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row g-3">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <label className="form-label"> Mail ID</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <label className="form-label"> Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              {error && (
                <div className="col col-12 text-center">
                  <p className="text-danger">{error}</p> {/* ✅ Error message */}
                </div>
              )}
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 text-center">
                <button onClick={handleLogin} className="btn btn-success w-100">Log In</button>
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 text-center">
                <p>Don't have an account?</p>
                <Link to="/signup" className="btn btn-secondary w-100">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default First;
