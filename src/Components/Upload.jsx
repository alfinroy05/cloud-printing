import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [pageSize, setPageSize] = useState("A4");
    const [numCopies, setNumCopies] = useState("1");
    const [printType, setPrintType] = useState("black_white");

    // Handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Handle form submission
    const handleDone = async () => {
        if (!selectedFile) {
            alert("Please select a file before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("page_size", pageSize);
        formData.append("num_copies", numCopies);
        formData.append("print_type", printType);

        try {
            const token = localStorage.getItem("token");  // ✅ Retrieve authentication token
            if (!token) {
                alert("You must be logged in to upload a file.");
                return;
            }

            const response = await axios.post("http://127.0.0.1:8000/api/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`  // ✅ Corrected
                }
            });
            

            console.log("📂 Upload Success:", response.data);
            alert("File uploaded successfully!");
        } catch (error) {
            console.error("❌ Upload failed:", error.response?.data || error);
            alert("Upload failed!");
        }
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            
                            {/*  File Upload Section */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label className="form-label">Select a File:</label>
                                <input type="file" className="form-control" onChange={handleFileChange} />
                            </div>

                            {/*  Page Size Dropdown */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="pageSize" className="form-label">Select Page Size</label>
                                <select 
                                    id="pageSize" 
                                    className="form-select" 
                                    value={pageSize} 
                                    onChange={(e) => setPageSize(e.target.value)}
                                >
                                    <option value="A4">A4</option>
                                    <option value="A3">A3</option>
                                </select>
                            </div>

                            {/*  Number of Copies Dropdown */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="numCopies" className="form-label">No. of Copies</label>
                                <select 
                                    id="numCopies" 
                                    className="form-select" 
                                    value={numCopies} 
                                    onChange={(e) => setNumCopies(e.target.value)}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                </select>
                            </div>

                            {/*  Print Type Dropdown */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="printColor" className="form-label">Print Colour</label>
                                <select 
                                    id="printColor" 
                                    className="form-select" 
                                    value={printType} 
                                    onChange={(e) => setPrintType(e.target.value)}
                                >
                                    <option value="black_white">Black & White</option>
                                    <option value="color">Color</option>
                                </select>
                            </div>

                            {/*  Submit Button */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <button className="btn btn-success w-100" onClick={handleDone}>
                                    Done
                                </button>
                            </div>

                            {/*  Show Selected Details */}
                            {selectedFile && (
                                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 text-center">
                                    <p><strong>Selected File:</strong> {selectedFile.name}</p>
                                    <p><strong>Page Size:</strong> {pageSize}</p>
                                    <p><strong>Copies:</strong> {numCopies}</p>
                                    <p><strong>Print Type:</strong> {printType}</p>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
