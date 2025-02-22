import React from 'react';
import { Link } from "react-router-dom"; 
import "../styles.css";  

const First = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row g-3">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <label className="form-label"> Mail ID</label>
                <input type="text" className="form-control" placeholder="Enter your email" />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <label className="form-label"> Password</label>
                <input type="password" className="form-control" placeholder="Enter your password" />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 text-center">
               
                <Link to="/" className="btn btn-success w-100">Log In</Link>
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
