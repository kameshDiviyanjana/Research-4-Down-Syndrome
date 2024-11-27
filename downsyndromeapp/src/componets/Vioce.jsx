// import React, { useState } from "react";
// import axios from "axios";

// const PronunciationChecker = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [feedback, setFeedback] = useState("");
//   const mediaRecorderRef = React.useRef(null);

//   const handleStartRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     const mediaRecorder = new MediaRecorder(stream);
//     mediaRecorderRef.current = mediaRecorder;

//     const audioChunks = [];
//     mediaRecorder.ondataavailable = (event) => {
//       audioChunks.push(event.data);
//     };

//     mediaRecorder.onstop = async () => {
//       const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
//       const formData = new FormData();
//       formData.append("audio", audioBlob);
//       formData.append("expectedWord", "example"); // Expected word for pronunciation

//       // Send audio to the backend
//       try {
//         const response = await axios.post(
//           "http://localhost:3000/voice-check",
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );
//         setFeedback(response.data.feedback);
//       } catch (error) {
//         console.error("Error sending audio:", error);
//         setFeedback("An error occurred while processing your pronunciation.");
//       }
//     };

//     mediaRecorder.start();
//     setIsRecording(true);
//   };

//   const handleStopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Word Pronunciation Checker</h1>
//       <button
//         onClick={isRecording ? handleStopRecording : handleStartRecording}
//       >
//         {isRecording ? "Stop Recording" : "Start Recording"}
//       </button>
//       {feedback && <p>Feedback: {feedback}</p>}
//     </div>
//   );
// };

// // export default PronunciationChecker;

// import React, { useState } from "react";
// import axios from "axios";

// const PronunciationChecker = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [result, setResult] = useState("");

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     const recorder = new MediaRecorder(stream);
//     let chunks = [];

//     recorder.ondataavailable = (e) => chunks.push(e.data);
//     recorder.onstop = async () => {
//       const blob = new Blob(chunks, { type: "audio/webm" });
//       const formData = new FormData();
//       formData.append("audio", blob, "recording.webm");

//       try {
//         // Send the audio to the backend
//         const response = await axios.post(
//           "http://localhost:5000/api/analyze",
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );
//         setResult(response.data.result);
//       } catch (error) {
//         console.error("Error analyzing audio:", error);
//       }

//       chunks = [];
//     };

//     setMediaRecorder(recorder);
//     recorder.start();
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     mediaRecorder.stop();
//     setIsRecording(false);
//   };

//   return (
//     <div>
//       <h1>Voice Pronunciation Checker</h1>
//       {isRecording ? (
//         <button onClick={stopRecording}>Stop Recording</button>
//       ) : (
//         <button onClick={startRecording}>Start Recording</button>
//       )}
//       <h2>Result: {result}</h2>
//     </div>
//   );
// };

// export default PronunciationChecker;

import React, { useState } from "react";
import axios from "axios";

const PronunciationChecker = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [result, setResult] = useState("");
  const [recordings, setRecordings] = useState([]); // List to store recordings

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    let chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(blob);

      // Add the new recording to the list
      setRecordings((prevRecordings) => [
        ...prevRecordings,
        { blob, audioUrl, name: `Recording-${Date.now()}` },
      ]);

      chunks = [];
    };

    setMediaRecorder(recorder);
    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const analyzeAudio = async (recording) => {
    const formData = new FormData();
    formData.append("audio", recording.blob, `${recording.name}.webm`);

    try {
      // Send audio to the backend for analysis
      const response = await axios.post(
        "",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResult(response.data.result);
    } catch (error) {
      console.error("Error analyzing audio:", error);
    }
  };

  const deleteRecording = (index) => {
    setRecordings((prevRecordings) =>
      prevRecordings.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <h1 className=" text-center text-4xl">Voice Pronunciation Checker</h1>

      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}

      <h2>Result: {result}</h2>

      <h2>Recordings:</h2>
      {recordings.length === 0 ? (
        <p>No recordings yet.</p>
      ) : (
        <ul>
          {recordings.map((recording, index) => (
            <li key={index}>
              <audio controls src={recording.audioUrl}></audio>
              <button onClick={() => analyzeAudio(recording)}>Analyze</button>
              <button onClick={() => deleteRecording(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PronunciationChecker;


