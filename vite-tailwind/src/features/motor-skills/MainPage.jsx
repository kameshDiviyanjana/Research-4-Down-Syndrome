import React, { useState } from "react";
import axios from "axios";

function MainPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploadStatus("Uploading and processing...");
      const response = await axios.post(
        "http://127.0.0.1:5000/video/upload",
        formData
      );

      const { predictions: receivedPredictions, video_url } = response.data;
      setUploadStatus("Processing complete!");
    } catch (error) {
      setUploadStatus("Failed to process video.");
    }
  };

  return (
    <div>
      <h1>Action Recognition Video Uploader</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleFileUpload} style={{ marginLeft: "10px" }}>
        Upload Video
      </button>
      <p>{uploadStatus}</p>
    
    </div>
  );
}

export default MainPage;
