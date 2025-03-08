import React from 'react';
import "../styles.css";  // Ensure CSS file is imported
import { useNavigate } from "react-router-dom";

const AdminOrUser = () => {
    const navigate = useNavigate(); // ✅ Initialize navigate function

    return (
        <div className="admin-user-page">  {/* Unique class for custom background */}
            <div className="container">
                <div className="row">
                    {/* Welcome Message Section */}
                    <div className="col col-12 text-center text-black">
                        <h1 className="mt-5">💫 Welcome to Web2Print! 💫</h1>
                        <p className="lead">
                            Your one-stop solution for seamless document printing.
                            Upload your files, select your preferences, and get your prints ready hassle-free!
                        </p>
                        <p className="fw-bold">Are you an Admin or a User? Choose below to proceed.</p>
                    </div>

                    {/* Admin/User Selection Section */}
                    <div className="col col-12 text-center">
                        <button className="btn btn-primary m-3" onClick={() => navigate("/first")}>
                            I am a User
                        </button>

                        {/* ✅ Navigate to AdminDashboard.jsx for Admins */}
                        <button className="btn btn-danger m-3" onClick={() => navigate("/admindashboard")}>
                            I am an Admin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrUser;
