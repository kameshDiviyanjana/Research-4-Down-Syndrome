import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SystemPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [randomCategory, setRandomCategory] = useState("");
  const navigate = useNavigate();

  const categories = ["catch", "walk", "jump","run"];
  const categoryVideos = {
    catch: "/videos/catch.mp4",
    walk: "/videos/walk.mp4",
    jump: "/videos/jump.mp4",
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleNextTask = () => {
    navigate("/next-task", { state: { difficultyLevel } });
  };

  const handleRandomCategory = () => {
    const randomIndex = Math.floor(Math.random() * categories.length);
    setRandomCategory(categories[randomIndex]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    if (!randomCategory) {
      alert("Please generate a random category first!");
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
      setPredictions(receivedPredictions);
      setVideoURL(video_url);
      setUploadStatus("Processing complete!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Failed to process video.");
    }
  };

  const calculateMatchPercentage = () => {
    const totalPredictions = predictions.length;
    if (totalPredictions === 0) return 0;

    const matchCount = predictions.filter(
      (item) => item.prediction === randomCategory
    ).length;
    return ((matchCount / totalPredictions) * 100).toFixed(2);
  };

  const getDifficultyLevel = (percentage) => {
    if (percentage <= 50) {
      return "Easy";
    } else if (percentage <= 80) {
      return "Medium";
    } else {
      return "Hard";
    }
  };

  const matchPercentage = calculateMatchPercentage();
  const difficultyLevel = getDifficultyLevel(matchPercentage);

  return (
    <div
      className="bg-[url(https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg)] bg-cover bg-no-repeat bg-center h-[700px] w-full overflow-y-auto"
      style={{ padding: "20px" }}
    >
      <h1>System Page</h1>
      <p>
        Randomly Mentioned Category:{" "}
        <strong>{randomCategory || "None selected yet"}</strong>
      </p>
      <button
        onClick={handleRandomCategory}
        style={{ marginBottom: "10px" }}
        className=" bg-[#F18F02] font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 text-white px-5 mt-14"
      >
        select you task
      </button>

      {/* Display the introduction video for the chosen category */}
      {randomCategory && (
        <div style={{ marginTop: "20px" }}>
          <h3>Introduction Video for: {randomCategory}</h3>
          <video
            src={categoryVideos[randomCategory]}
            controls
            style={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          />
        </div>
      )}

      <br />
      <div className=" flex justify-center">
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button
          onClick={handleFileUpload}
          style={{ marginLeft: "10px" }}
          className="bg-[#F18F02] font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 text-white px-5 mt-14"
        >
          Upload and Process Video
        </button>
        <p>{uploadStatus}</p>
      </div>

      {predictions.length > 0 && (
        <div>
          <h2>Predictions and Feedback:</h2>
          <table border="1" style={{ width: "100%", marginTop: "10px" }}>
            <thead>
              <tr>
                <th>Frame</th>
                <th>Prediction</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((item, index) => (
                <tr key={index}>
                  <td>{item.frame}</td>
                  <td>{item.prediction}</td>
                  <td>{item.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "20px" }}>
            <h3>Percentage Match with Randomly Mentioned Category:</h3>
            <p>
              Category: <strong>{randomCategory}</strong> — Match Percentage:{" "}
              <strong>{matchPercentage}%</strong>
            </p>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h3>Difficulty Level:</h3>
            <p>
              Based on the match percentage, the assigned difficulty level is:{" "}
              <strong>{difficultyLevel}</strong>
            </p>
            <button onClick={handleNextTask} style={{ marginTop: "10px" }}>
              Go to Next Task
            </button>
          </div>
        </div>
      )}

      {/* {videoURL && (
        <div style={{ marginTop: "20px" }}>
          <h2>Processed Video:</h2>
          <video
            src={`http://localhost:5000/${videoURL}`}
            controls
            style={{ width: "100%", maxWidth: "600px" }}
          />
          <a href={`http://localhost:5000/${videoURL}`} download="processed_video.mp4">
            Download Processed Video
          </a>
        </div>
      )} */}
    </div>
  );
}

export default SystemPage;