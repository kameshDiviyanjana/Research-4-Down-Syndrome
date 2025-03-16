import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function NextTaskPage() {
  const location = useLocation();
  const { difficultyLevel } = location.state || {};
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [randomCategory, setRandomCategory] = useState("");

  const categoriesMap = {
    Easy: ["catch", "walk", "jump"],
    Medium: ["run", "throw"],
    Hard: ["dribble", "handstand", "kick_ball", "somersault"],
  };

  const categoryVideos = {
    catch: "/videos/catch.mp4",
    walk: "/videos/walk.mp4",
    jump: "/videos/jump.mp4",
    run: "/videos/run.mp4",
    throw: "/videos/throw.mp4",
    dribble: "/videos/dribble.mp4",
    handstand: "/videos/handstand.mp4",
    kick_ball: "/videos/kick_ball.mp4",
    somersault: "/videos/somersault.mp4",
  };

  const categories = categoriesMap[difficultyLevel] || [];

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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

  const matchPercentage = calculateMatchPercentage();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Next Task Page</h1>
      <p>
        Difficulty Level: <strong>{difficultyLevel || "Not available"}</strong>
      </p>
      <p>Available Categories: {categories.join(", ")}</p>
      <p>
        Randomly Mentioned Category:{" "}
        <strong>{randomCategory || "None selected yet"}</strong>
      </p>
      <button onClick={handleRandomCategory} style={{ marginBottom: "10px" }}>
        Generate Random Category
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
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleFileUpload} style={{ marginLeft: "10px" }}>
        Upload and Process Video
      </button>
      <p>{uploadStatus}</p>

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

export default NextTaskPage;
// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// function NextTaskPage() {
//   const location = useLocation();
//   const { difficultyLevel } = location.state || {};
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [predictions, setPredictions] = useState([]);
//   const [uploadStatus, setUploadStatus] = useState("");
//   const [randomCategory, setRandomCategory] = useState("");
//   const videoRef = useRef(null);
//   const [isStreaming, setIsStreaming] = useState(false);

//   const categoriesMap = {
//     Easy: ["catch", "walk", "jump"],
//     Medium: ["run", "throw"],
//     Hard: ["dribble", "handstand", "kick_ball", "somersault"],
//   };

//   const categories = categoriesMap[difficultyLevel] || [];

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleRandomCategory = () => {
//     const randomIndex = Math.floor(Math.random() * categories.length);
//     setRandomCategory(categories[randomIndex]);
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first!");
//       return;
//     }

//     if (!randomCategory) {
//       alert("Please generate a random category first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       setUploadStatus("Uploading and processing...");
//       const response = await axios.post(
//         "http://127.0.0.1:5000/video/upload",
//         formData
//       );

//       const { predictions: receivedPredictions } = response.data;
//       setPredictions(receivedPredictions);
//       setUploadStatus("Processing complete!");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setUploadStatus("Failed to process video.");
//     }
//   };

//   const startLiveVideo = async () => {
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//         setIsStreaming(true);
//       } catch (error) {
//         console.error("Error accessing webcam:", error);
//       }
//     }
//   };

//   const stopLiveVideo = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       let tracks = videoRef.current.srcObject.getTracks();
//       tracks.forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//     setIsStreaming(false);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Next Task Page</h1>
//       <p>
//         Difficulty Level: <strong>{difficultyLevel || "Not available"}</strong>
//       </p>
//       <p>Available Categories: {categories.join(", ")}</p>
//       <p>
//         Randomly Mentioned Category:{" "}
//         <strong>{randomCategory || "None selected yet"}</strong>
//       </p>
//       <button onClick={handleRandomCategory} style={{ marginBottom: "10px" }}>
//         Generate Random Category
//       </button>

//       {/* Live Video Section */}
//       <div style={{ marginTop: "20px" }}>
//         <h2>Live Video</h2>
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           style={{
//             width: "100%",
//             maxWidth: "600px",
//             borderRadius: "10px",
//             border: "2px solid black",
//           }}
//         />
//         <div style={{ marginTop: "10px" }}>
//           {!isStreaming ? (
//             <button onClick={startLiveVideo}>Start Live Video</button>
//           ) : (
//             <button onClick={stopLiveVideo}>Stop Live Video</button>
//           )}
//         </div>
//       </div>

//       <br />
//       <input type="file" accept="video/*" onChange={handleFileChange} />
//       <button onClick={handleFileUpload} style={{ marginLeft: "10px" }}>
//         Upload and Process Video
//       </button>
//       <p>{uploadStatus}</p>

//       {predictions.length > 0 && (
//         <div>
//           <h2>Predictions and Feedback:</h2>
//           <table border="1" style={{ width: "100%", marginTop: "10px" }}>
//             <thead>
//               <tr>
//                 <th>Frame</th>
//                 <th>Prediction</th>
//                 <th>Feedback</th>
//               </tr>
//             </thead>
//             <tbody>
//               {predictions.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.frame}</td>
//                   <td>{item.prediction}</td>
//                   <td>{item.feedback}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NextTaskPage;
