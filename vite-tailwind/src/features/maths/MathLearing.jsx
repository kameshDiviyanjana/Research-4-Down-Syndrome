// import { useState, useRef, useEffect } from "react";
// import axios from "axios";

// function MathLearing() {
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [capturedPredictions, setCapturedPredictions] = useState([]);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Start camera
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (error) {
//       console.error("Error accessing webcam:", error);
//     }
//   };

//   // Capture a frame and return as a Blob
//   const captureFrameAsBlob = () => {
//     return new Promise((resolve) => {
//       if (!videoRef.current || !canvasRef.current) return resolve(null);

//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//       canvas.toBlob((blob) => {
//         if (blob) resolve(blob);
//         else resolve(null);
//       }, "image/jpeg");
//     });
//   };

//   // Capture 20 images and send them to backend
//   const captureFrames = async () => {
//     if (!videoRef.current || !canvasRef.current) return;

//     setLoading(true);
//     setCapturedPredictions([]);
//     let predictions = [];

//     for (let i = 0; i < 2; i++) {
//       const blob = await captureFrameAsBlob(); // Wait for Blob
//       if (!blob) {
//         console.error("Failed to capture image as Blob");
//         continue;
//       }

//       const formData = new FormData();
//       formData.append("image", blob, `frame_${i}.jpg`);

//       try {
//         const response = await axios.post(
//           "http://127.0.0.1:5002/image/predict-math",
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );
//         predictions.push(response.data.prediction);
//         setCapturedPredictions([...predictions]);
//       } catch (error) {
//         console.error("Error sending frame to backend:", error);
//       }

//       await new Promise((resolve) => setTimeout(resolve, 500)); // Capture every 0.5 sec
//     }

//     // Majority Voting - Get most frequent prediction
//     setTimeout(() => {
//       if (predictions.length > 0) {
//         const finalPrediction = predictions
//           .sort(
//             (a, b) =>
//               predictions.filter((v) => v === a).length -
//               predictions.filter((v) => v === b).length
//           )
//           .pop();
//         setPrediction(finalPrediction);
//       }
//       setLoading(false);
//     }, 1000);
//   };

//   useEffect(() => {
//     startCamera();
//   }, []);

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h1>Hand Gesture Recognition</h1>
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         width="400"
//         height="300"
//         style={{ border: "2px solid black" }}
//       />
//       <canvas
//         ref={canvasRef}
//         width="400"
//         height="300"
//         style={{ display: "none" }}
//       ></canvas>
//       <br />
//       <button
//         onClick={captureFrames}
//         disabled={loading}
//         style={{ marginTop: "10px", padding: "10px", fontSize: "16px" }}
//       >
//         {loading ? "Processing..." : "Start Capturing (10s)"}
//       </button>
//       <h3>Predictions: {capturedPredictions.join(", ")}</h3>
//       {prediction && <h2>Final Prediction: {prediction}</h2>}
//     </div>
//   );
// }

// export default MathLearing;
import { useState, useRef, useEffect } from "react";
import axios from "axios";

function MathLearing() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [capturedPredictions, setCapturedPredictions] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  // Capture a frame and return as a Blob
  const captureFrameAsBlob = () => {
    return new Promise((resolve) => {
      if (!videoRef.current || !canvasRef.current) return resolve(null);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else resolve(null);
      }, "image/jpeg");
    });
  };

  // Recursive function to capture frames without a loop
  const captureFrameRecursively = async (predictions = [], count = 0) => {
    if (count >= 2) {
      // Majority Voting - Get most frequent prediction
      setTimeout(() => {
        if (predictions.length > 0) {
          const finalPrediction = predictions
            .sort(
              (a, b) =>
                predictions.filter((v) => v === a).length -
                predictions.filter((v) => v === b).length
            )
            .pop();
          setPrediction(finalPrediction);
        }
        setLoading(false);
      }, 1000);
      return;
    }

    const blob = await captureFrameAsBlob();
    if (!blob) {
      console.error("Failed to capture image as Blob");
      return;
    }

    const formData = new FormData();
    formData.append("image", blob, `frame_${count}.jpg`);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5002/image/predict-math",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const newPredictions = [...predictions, response.data.prediction];
      setCapturedPredictions(newPredictions);
      setTimeout(() => captureFrameRecursively(newPredictions, count + 1), 500);
    } catch (error) {
      console.error("Error sending frame to backend:", error);
    }
  };

  // Start capturing frames
  const captureFrames = () => {
    if (!videoRef.current || !canvasRef.current) return;
    setLoading(true);
    setCapturedPredictions([]);
    captureFrameRecursively();
  };

  useEffect(() => {
    startCamera();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Hand Gesture Recognition</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="400"
        height="300"
        style={{ border: "2px solid black" }}
      />
      <canvas
        ref={canvasRef}
        width="400"
        height="300"
        style={{ display: "none" }}
      ></canvas>
      <br />
      <button
        onClick={captureFrames}
        disabled={loading}
        style={{ marginTop: "10px", padding: "10px", fontSize: "16px" }}
      >
        {loading ? "Processing..." : "Start Capturing (10s)"}
      </button>
      <h3>Predictions: {capturedPredictions.join(", ")}</h3>
      {prediction && <h2>Final Prediction: {prediction}</h2>}
    </div>
  );
}

export default MathLearing;

