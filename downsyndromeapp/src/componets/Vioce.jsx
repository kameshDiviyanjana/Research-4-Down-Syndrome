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
import Modal from "../molecule/moble";
import AllAddWord from "../api/findAllword";
import { useSelector } from "react-redux";

const PronunciationChecker = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [result, setResult] = useState("");
  const [recordings, setRecordings] = useState([]); // List to store recordings
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [daibaleBack, setdaibaleBack] = useState(false);
  const [diablenext, setdiablenext] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
    const userme = localStorage.getItem("userid");

  const[finsh,setfinsh] = useState(false)
  const pacticesword = useSelector((state) => state.id.value); // Access the ID from Redux store
console.log(pacticesword);
  const [page, setpage] = useState(1);
  const {
    data: getallword,
    isLoading,
    error,
  } = AllAddWord(page, 1, userme, pacticesword);
  const [startlearn, setstartlearn] = useState(false);
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
      const response = await axios.post("", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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

  const learning = () => {
    setstartlearn(true);
      startRecording();
  };
  // const nextpage = () => {
  //   setpage(page + 1);

  //   if (page === getallword.data.length) {
  //      console.log("ssssssss");
  //     setdiablenext(true);
  //   }
  // };
  // const backpage = () => {
  //   setpage(page - 1);

  //   if (page === 0) {
  //     console.log("ssssssss");
  //     setdaibaleBack(true);
  //   }
  // };
  console.log(getallword?.data?.wordses.length);
  const nextpage = (event) => {
    event.preventDefault();
    if (page < getallword.data.totalCount) {
      setpage(page + 1);
      setdaibaleBack(false);
      // setdiablenext(false); // Ensure the "next" button stays enabled as needed
    } else {
      console.log("No more pages.");
      setdiablenext(true);
            setfinsh(true);
            stopRecording();
 // Disable the "next" button when on the last page
    }
  };

  const backpage = (event) => {
    event.preventDefault();
    if (page > 0) {
      setpage(page - 1);
      setdiablenext(false); // Ensure the "next" button is re-enabled when moving back
      //  setdaibaleBack(false); // Ensure the "back" button stays enabled
    } else {
      console.log("No more pages.");
      setdiablenext(false);
      setdaibaleBack(true); // Disable the "back" button when on the first page
    }
  };

  console.log(diablenext);
  console.log(daibaleBack);

  return (
    <div>
      {finsh ? (
        <>
          <h1>hi</h1>
          <ul>
            {recordings.map((recording, index) => (
              <li key={index}>
                <audio controls src={recording.audioUrl}></audio>
                <button onClick={() => analyzeAudio(recording)}>Analyze</button>
                <button onClick={() => deleteRecording(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          {startlearn ? (
            <>
              {/* <h1 className=" text-center text-4xl">Voice Pronunciation Checker</h1> */}
              <div className="flex flex-col items-center">
                {getallword?.data?.wordses?.length > 0 ? (
                  <div className="relative flex items-center justify-center w-full">
                    <button
                      onClick={backpage}
                      className="absolute left-5 bg-slate-300 py-2 px-4 rounded hover:bg-slate-400"
                      disabled={daibaleBack}
                    >
                      Back
                    </button>

                    {getallword.data.wordses.map((word, index) => (
                      <div key={index} className="text-center mx-4">
                        <img
                          src={
                            word.imagewordUrl ||
                            "https://via.placeholder.com/150"
                          }
                          alt={word.wordAdd || "Word Image"}
                          onClick={stopRecording}
                          className="h-[500px] w-[700px] object-cover mx-auto rounded"
                        />
                        <h1 className="font-bold  text-4xl mt-4">
                          {word.wordAdd || "Unnamed Word"}
                        </h1>
                      </div>
                    ))}

                    <button
                      onClick={nextpage}
                      className="absolute right-5 bg-slate-300 py-2 px-4 rounded hover:bg-slate-400"
                      disabled={diablenext}
                    >
                      Next
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center mt-8">
                    No words available.
                  </p>
                )}
              </div>

              {/* {isRecording ? (
            <button onClick={stopRecording}>Stop Recording</button>
          ) : (
            // <Modal open={isModalOpen} onClose={closeModal}>
            <button onClick={startRecording}>Start Recording</button>
            // </Modal>
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
                  <button onClick={() => analyzeAudio(recording)}>
                    Analyze
                  </button>
                  <button onClick={() => deleteRecording(index)}>Delete</button>
                </li>
              ))}
            </ul>
          )} */}
            </>
          ) : (
            <>
              <div className="  items-center">
                <div className=" text-center">
                  <h1 className=" text-5xl">
                    Welcome Learning Center, let's start.
                  </h1>
                </div>
                <div className=" flex justify-center mt-72">
                  <button
                    onClick={learning}
                    className=" py-5 px-8 bg-[#F18F02] text-white font-semibold rounded-lg hover:bg-[#d77e02] focus:ring-2 focus:ring-offset-2 focus:ring-[#F18F02] "
                  >
                    Start
                  </button>
                </div>
                <div>
                  <p className="text-gray-500 text-center mt-8">
                    Need stop lering click image
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PronunciationChecker;
