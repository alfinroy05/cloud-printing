import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Adminlog = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    storeName: '',
    location: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister 
      ? 'http://localhost:8000/api/store/register/' 
      : 'http://localhost:8000/api/store/login/';

    try {
      const response = await axios.post(url, formData);

      if (isRegister) {
        alert(response.data.message || 'Store registered successfully! Please log in.');
        setIsRegister(false); // ✅ Switch to login after registration
      } else {
        // ✅ Save tokens for authentication
        localStorage.setItem('adminToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        alert('Login successful! Redirecting to Admin Dashboard.');
        navigate('/admindashboard');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      alert(error.response?.data?.error || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="admin-user-page">
      <div className="container">
        <h2>{isRegister ? 'Register Your Store' : 'Admin Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" name="username" className="form-control" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
          </div>

          {isRegister && (
            <>
              <div className="mb-3">
                <label className="form-label">Store Name</label>
                <input type="text" name="storeName" className="form-control" onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Location</label>
                <input type="text" name="location" className="form-control" onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input type="text" name="contact" className="form-control" onChange={handleChange} required />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary w-100">
            {isRegister ? 'Register Store' : 'Login as Admin'}
          </button>
        </form>

        <p className="mt-3">
          {isRegister ? 'Already have an account?' : 'Want to register your store?'}
          <button className="btn btn-link" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Adminlog;