import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../Slices/UserSlice";
import { Input } from "./input";
import { Button } from "./button";

const SingleFileUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setError("");
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Only CSV or XLSX files are allowed.");
        setFile(null);
      } else {
        setFile(selectedFile);
      }
    }
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    if (!fileType.trim()) {
      setError("Please enter a file category.");
      return;
    }

    dispatch(uploadFile({ file, file_type: fileType }))
      .unwrap()
      .then(() => {
        alert("File uploaded successfully!");
        setFile(null);
        setFileType("");
        onUploadSuccess(); // Notify parent of success
      })
      .catch((uploadError) => {
        setError(`Upload failed: ${uploadError}`);
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg text-center">
      <div className="mb-4">
        <Input type="file" id="file" accept=".csv, .xlsx" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>

      {file && (
        <section className="mb-4 text-left">
          <h4 className="text-lg font-medium text-gray-700 mb-2">File Details</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            <li><strong>Name:</strong> {file.name}</li>
            <li><strong>Type:</strong> {file.type}</li>
            <li><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</li>
          </ul>
        </section>
      )}

      <div className="mb-4">
        <Input
          required
          type="text"
          id="file_type"
          name="file_type"
          value={fileType}
          onChange={handleFileTypeChange}
          placeholder="Enter file category (e.g., Fashion)"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {file && (
        <Button onClick={handleUpload} className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Upload File
        </Button>
      )}
    </div>
  );
};


export default SingleFileUploader;
