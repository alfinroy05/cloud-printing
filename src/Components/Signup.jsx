import React from 'react';
import { Link } from "react-router-dom"; 

const Signup = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row g-3">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" placeholder="Enter your name" />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <label className="form-label">Mail ID</label>
                <input type="email" className="form-control" placeholder="Enter your email" />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Enter your password" />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <label className="form-label">Confirm Password</label>
                <input type="password" className="form-control" placeholder="Confirm your password" />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 text-center">
                
                <Link to="/" className="btn btn-success w-100">Sign Up</Link>
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
