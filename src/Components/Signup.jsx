import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // ✅ State to handle errors
  const [success, setSuccess] = useState(""); // ✅ State to handle success message
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    // ✅ Check if passwords match before sending request
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        email,
        password,
      });

      setSuccess(response.data.message);
      alert("Signup Successful! Please log in.");  
      navigate("/"); // Redirect to login page

    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Signup failed! Try again.");
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
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter your name" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <label className="form-label">Mail ID</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <label className="form-label">Confirm Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Confirm your password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && (
                <div className="col col-12 text-center">
                  <p className="text-danger">{error}</p> {/* ✅ Show error message */}
                </div>
              )}
              {success && (
                <div className="col col-12 text-center">
                  <p className="text-success">{success}</p> {/* ✅ Show success message */}
                </div>
              )}
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 text-center">
                <button onClick={handleSignup} className="btn btn-success w-100">
                  Sign Up
                </button>
              </div>
              <div className="col col-12 text-center">
                <p>Already have an account? <Link to="/">Log in</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
