// import React, { useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// function NextTaskPage() {
//   const location = useLocation();
//   const { difficultyLevel } = location.state || {};
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [predictions, setPredictions] = useState([]);
//   const [uploadStatus, setUploadStatus] = useState("");
//   const [videoURL, setVideoURL] = useState("");
//   const [randomCategory, setRandomCategory] = useState("");

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
//       const response = await axios.post("http://localhost:5000/upload", formData);

//       const { predictions: receivedPredictions, video_url } = response.data;
//       setPredictions(receivedPredictions);
//       setVideoURL(video_url);
//       setUploadStatus("Processing complete!");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setUploadStatus("Failed to process video.");
//     }
//   };

//   const calculateMatchPercentage = () => {
//     const totalPredictions = predictions.length;
//     if (totalPredictions === 0) return 0;

//     const matchCount = predictions.filter((item) => item.prediction === randomCategory).length;
//     return ((matchCount / totalPredictions) * 100).toFixed(2);
//   };

//   const matchPercentage = calculateMatchPercentage();

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Next Task Page</h1>
//       <p>
//         Difficulty Level: <strong>{difficultyLevel || "Not available"}</strong>
//       </p>
//       <p>Available Categories: {categories.join(", ")}</p>
//       <p>Randomly Mentioned Category: <strong>{randomCategory || "None selected yet"}</strong></p>
//       <button onClick={handleRandomCategory} style={{ marginBottom: "10px" }}>
//         Generate Random Category
//       </button>
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

//           <div style={{ marginTop: "20px" }}>
//             <h3>Percentage Match with Randomly Mentioned Category:</h3>
//             <p>
//               Category: <strong>{randomCategory}</strong> — Match Percentage: <strong>{matchPercentage}%</strong>
//             </p>
//           </div>
//         </div>
//       )}

//       {videoURL && (
//         <div style={{ marginTop: "20px" }}>
//           <h2>Processed Video:</h2>
//           <video src={`http://localhost:5000/${videoURL}`} controls style={{ width: "100%", maxWidth: "600px" }} />
//           <a href={`http://localhost:5000/${videoURL}`} download="processed_video.mp4">
//             Download Processed Video
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NextTaskPage;

import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function NextTaskPage() {
  const location = useLocation();
  const { difficultyLevel } = location.state || {};
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [randomCategory, setRandomCategory] = useState("");
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(null);

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

  useEffect(() => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.srcObject
    ) {
      setCameraStream(webcamRef.current.video.srcObject);
    }
  }, [webcamRef]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setVideoBlob(null);
  };

  const handleRandomCategory = () => {
    if (categories.length === 0) {
      Swal.fire(
        "Error!",
        "No categories available for this difficulty level.",
        "error"
      );
      return;
    }
    const randomIndex = Math.floor(Math.random() * categories.length);
    setRandomCategory(categories[randomIndex]);
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      Swal.fire(
        "Warning!",
        "Please select or record a video first!",
        "warning"
      );
      return;
    }

    if (!randomCategory) {
      Swal.fire(
        "Warning!",
        "Please generate a random category first!",
        "warning"
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

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

      const matchPercentage = calculateMatchPercentage(receivedPredictions);
      const level = getDifficultyLevel(matchPercentage);
      const categoryCounts = calculateCategoryCounts(receivedPredictions);

      // Show SweetAlert2 Animated Alert
      Swal.fire({
        title: "Task Analysis Complete!",
        html: `
          <b>Match Percentage:</b> ${matchPercentage}% <br>
          <b>Difficulty Level:</b> ${level} <br>
          <b>Summary:</b> ${Object.entries(categoryCounts)
            .map(([cat, count]) => `<br>${cat}: ${count}`)
            .join("")}
        `,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        timer: 5000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Failed to process video.");
      Swal.fire("Error!", "Failed to process video.", "error");
    }
  };

  const calculateCategoryCounts = (predictionsList) => {
    return predictionsList.reduce((acc, item) => {
      acc[item.prediction] = (acc[item.prediction] || 0) + 1;
      return acc;
    }, {});
  };

  const calculateMatchPercentage = (predictionsList) => {
    if (predictionsList.length === 0) return 0;
    const matchCount = predictionsList.filter(
      (item) => item.prediction === randomCategory
    ).length;
    return ((matchCount / predictionsList.length) * 100).toFixed(2);
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

  const startRecording = async () => {
    if (!cameraStream) {
      Swal.fire(
        "Error!",
        "Camera is not available! Please check your webcam settings.",
        "error"
      );
      return;
    }

    setRecording(true);
    setVideoBlob(null);

    try {
      mediaRecorderRef.current = new MediaRecorder(cameraStream);
      let recordedChunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        setVideoBlob(blob);
        setSelectedFile(blob);
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Failed to start recording:", error);
      Swal.fire("Error!", "Failed to start recording. Try again.", "error");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      setRecording(false);
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <div className="p-6 bg-blue-50 rounded-xl shadow-lg flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold text-blue-700">🎯 Next Task!</h1>

      <p className="text-lg mt-2">
        Difficulty Level: <strong>{difficultyLevel || "Not available"}</strong>
      </p>

      <button
        onClick={handleRandomCategory}
        className="mt-4 px-6 py-3 bg-yellow-400 text-white font-bold rounded-full shadow-md hover:bg-yellow-500 transition-all duration-300"
      >
        🎲 Generate Random Category
      </button>

      {randomCategory && categoryVideos[randomCategory] && (
        <div className="mt-5">
          <h3 className="text-xl font-semibold text-blue-600">
            📺 Introduction Video: {randomCategory}
          </h3>
          <video
            src={categoryVideos[randomCategory]}
            controls
            className="w-full max-w-lg rounded-lg shadow-md mt-3"
          />
        </div>
      )}

      <div className="mt-6 bg-white p-5 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-green-600">
          📤 Upload Your Video
        </h2>
        <label className="cursor-pointer bg-purple-500 text-white font-bold px-5 py-3 rounded-full shadow-md hover:bg-purple-600 transition-all duration-300 mt-3 inline-block">
          🎥 Choose Video
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <button
          onClick={() => handleFileUpload(selectedFile)}
          className="ml-4 px-5 py-3 bg-green-500 text-white font-bold rounded-full shadow-md hover:bg-green-600 transition-all duration-300"
        >
          🚀 Upload Video
        </button>
        <p className="mt-3 text-blue-600 font-semibold">{uploadStatus}</p>
      </div>

      <div className="mt-8 bg-white p-5 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-red-600">
          🎥 Live Camera & Recording
        </h2>
        <Webcam
          ref={webcamRef}
          audio={false}
          mirrored={true}
          className="w-full max-w-lg rounded-lg shadow-md mt-3"
        />
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`mt-4 px-6 py-3 font-bold rounded-full shadow-md transition-all duration-300 ${
            recording
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white`}
        >
          {recording ? "⏹️ Stop Recording" : "⏺️ Start Recording"}
        </button>
      </div>
    </div>

    // <div style={{ padding: "20px" }}>
    //   <h1>Next Task Page</h1>
    //   <p>
    //     Difficulty Level: <strong>{difficultyLevel || "Not available"}</strong>
    //   </p>
    //   <button onClick={handleRandomCategory} style={{ marginBottom: "10px" }}>
    //     Generate Random Category
    //   </button>

    //   {randomCategory && categoryVideos[randomCategory] && (
    //     <div style={{ marginTop: "20px" }}>
    //       <h3>Introduction Video for: {randomCategory}</h3>
    //       <video
    //         src={categoryVideos[randomCategory]}
    //         controls
    //         style={{ width: "100%", maxWidth: "600px", borderRadius: "10px" }}
    //       />
    //     </div>
    //   )}

    //   <br />
    //   <input type="file" accept="video/*" onChange={handleFileChange} />
    //   <button
    //     onClick={() => handleFileUpload(selectedFile)}
    //     style={{ marginLeft: "10px" }}
    //   >
    //     Upload Video
    //   </button>
    //   <p>{uploadStatus}</p>

    //   <div style={{ marginTop: "20px" }}>
    //     <h2>Live Camera & Recording</h2>
    //     <Webcam
    //       ref={webcamRef}
    //       audio={false}
    //       mirrored={true}
    //       style={{ width: "100%", maxWidth: "600px", borderRadius: "10px" }}
    //     />
    //     <button
    //       onClick={recording ? stopRecording : startRecording}
    //       style={{
    //         marginTop: "10px",
    //         padding: "10px",
    //         backgroundColor: recording ? "red" : "green",
    //         color: "white",
    //       }}
    //     >
    //       {recording ? "Stop Recording ⏹️" : "Start Recording ⏺️"}
    //     </button>
    //   </div>
    // </div>
  );
}

export default NextTaskPage;
