import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const Upload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [pageSize, setPageSize] = useState("A4");
  const [numCopies, setNumCopies] = useState("1");
  const [printType, setPrintType] = useState("black_white");
  const [numPages, setNumPages] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedStore, setSelectedStore] = useState(location.state?.selectedStore || "");

  useEffect(() => {
    if (location.state?.selectedStore) {
      setSelectedStore(location.state.selectedStore);
    }

    const savedFile = sessionStorage.getItem("selectedFile");
    if (savedFile) {
      const fileData = JSON.parse(savedFile);
      setSelectedFile(fileData);
    }
  }, [location.state]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMessage("");

      sessionStorage.setItem(
        "selectedFile",
        JSON.stringify({
          name: file.name,
          size: file.size,
          type: file.type,
        })
      );

      if (file.type === "application/pdf") {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = async function () {
          try {
            const pdf = await pdfjsLib.getDocument({ data: fileReader.result }).promise;
            setNumPages(pdf.numPages);
          } catch (error) {
            setMessage("❌ Error reading PDF file.");
            setNumPages(1);
          }
        };
      } else {
        setNumPages(1);
      }
    }
  };

  const handleSelectStore = () => {
    navigate("/dashboard");
  };

  const handleDone = async () => {
    if (!selectedFile) {
      setMessage("❌ Please select a file before submitting.");
      return;
    }
    if (!selectedStore) {
      setMessage("❌ Please select a store before proceeding.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ You must be logged in to upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("page_size", pageSize);
    formData.append("num_copies", numCopies);
    formData.append("print_type", printType);
    formData.append("num_pages", numPages);
    formData.append("store_id", selectedStore);

    try {
      setUploading(true);
      setMessage("⏳ Uploading... Please wait.");

      const response = await axios.post("http://127.0.0.1:8000/api/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      });

      console.log("📂 Upload Success:", response.data);
      setMessage(`✅ File uploaded successfully! Sent to: ${response.data.store}`);

      navigate("/payment", { state: { numPages, numCopies } });
    } catch (error) {
      console.error("❌ Upload failed:", error.response?.data || error);
      setMessage("❌ Upload failed! Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const totalCost = numPages * parseInt(numCopies) * 2;

  return (
    <div className="container">
      <div className="row">
        <div className="col col-12">
          <div className="row g-3">
            <div className="col col-12">
              <label className="form-label">Select a File:</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
              {selectedFile && <p className="mt-2">📄 Selected: <strong>{selectedFile.name}</strong></p>}
            </div>

            <div className="col col-12">
              <button className="btn btn-primary w-100" onClick={handleSelectStore}>Select Nearby Store</button>
              {selectedStore && <p className="mt-2">🏢 Selected Store ID: <strong>{selectedStore}</strong></p>}
            </div>

            <div className="col col-12">
              <label className="form-label">Select Page Size</label>
              <select className="form-select" value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                <option value="A4">A4</option>
                <option value="A3">A3</option>
              </select>
            </div>

            <div className="col col-12">
              <label className="form-label">No. of Copies</label>
              <select className="form-select" value={numCopies} onChange={(e) => setNumCopies(e.target.value)}>
                {[...Array(10).keys()].map(i => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            <div className="col col-12">
              <label className="form-label">Print Colour</label>
              <select className="form-select" value={printType} onChange={(e) => setPrintType(e.target.value)}>
                <option value="black_white">Black & White</option>
                <option value="color">Color</option>
              </select>
            </div>

            <div className="col col-12">
              <p className="text-center"><strong>💰 Total Cost: ₹{totalCost}</strong></p>
            </div>

            <div className="col col-12">
              <button className="btn btn-success w-100" onClick={handleDone} disabled={uploading}>
                {uploading ? "Uploading..." : "Proceed to Payment"}
              </button>
            </div>

            {message && (
              <div className="col col-12 text-center">
                <p><strong>{message}</strong></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
