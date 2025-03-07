import React, { useState } from "react";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

// ✅ Set the PDF.js Worker Path
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [pageSize, setPageSize] = useState("A4");
    const [numCopies, setNumCopies] = useState("1");
    const [printType, setPrintType] = useState("black_white");
    const [numPages, setNumPages] = useState(1);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    // ✅ Handle file selection
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setMessage("");

        if (file && file.type === "application/pdf") {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = async function () {
                const pdf = await pdfjsLib.getDocument({ data: fileReader.result }).promise;
                setNumPages(pdf.numPages);
            };
        } else {
            setNumPages(1);
        }
    };

    // ✅ Handle form submission
    const handleDone = async () => {
        if (!selectedFile) {
            setMessage("❌ Please select a file before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("page_size", pageSize);
        formData.append("num_copies", numCopies);
        formData.append("print_type", printType);
        formData.append("num_pages", numPages);

        try {
            setUploading(true);
            setMessage("");

            const token = localStorage.getItem("token");
            if (!token) {
                setMessage("❌ You must be logged in to upload a file.");
                return;
            }

            const response = await axios.post("http://127.0.0.1:8000/api/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("📂 Upload Success:", response.data);
            setMessage("✅ File uploaded successfully!");
            setSelectedFile(null);
            setNumPages(1);
        } catch (error) {
            console.error("❌ Upload failed:", error.response?.data || error);
            setMessage("❌ Upload failed! Please try again.");
        } finally {
            setUploading(false);
        }
    };

    // ✅ Calculate total cost (₹2 per page)
    const totalCost = numPages * parseInt(numCopies) * 2;

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">

                            {/* ✅ File Upload Section */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label className="form-label">Select a File:</label>
                                <input type="file" className="form-control" onChange={handleFileChange} />
                                {selectedFile && <p className="mt-2">📄 Selected: <strong>{selectedFile.name}</strong></p>}
                            </div>

                            {/* ✅ Page Size Dropdown */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label className="form-label">Select Page Size</label>
                                <select className="form-select" value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                                    <option value="A4">A4</option>
                                    <option value="A3">A3</option>
                                </select>
                            </div>

                            {/* ✅ Number of Copies Dropdown */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label className="form-label">No. of Copies</label>
                                <select className="form-select" value={numCopies} onChange={(e) => setNumCopies(e.target.value)}>
                                    {[...Array(10).keys()].map(i => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>

                            {/* ✅ Print Type Dropdown */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label className="form-label">Print Colour</label>
                                <select className="form-select" value={printType} onChange={(e) => setPrintType(e.target.value)}>
                                    <option value="black_white">Black & White</option>
                                    <option value="color">Color</option>
                                </select>
                            </div>

                            {/* ✅ Total Cost Display */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <p className="text-center"><strong>💰 Total Cost: ₹{totalCost}</strong></p>
                            </div>

                            {/* ✅ Submit Button */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <button className="btn btn-success w-100" onClick={handleDone} disabled={uploading}>
                                    {uploading ? "Uploading..." : "Proceed to Payment"}
                                </button>
                            </div>

                            {/* ✅ Show Upload Message */}
                            {message && (
                                <div className="col col-12 text-center">
                                    <p><strong>{message}</strong></p>
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
