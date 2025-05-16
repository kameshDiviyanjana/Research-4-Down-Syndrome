import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { encodeWAV } from "./wavEncoder";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AddSpeechResults } from "../../../Api/vocabularyApi";
import Swal from "sweetalert2";
import perload from "../../../assets/scientist-holding-beaker-testing-tube-animation.gif";
import happygif from "../../../assets/happygif.gif";
const AlphabetSelector = () => {
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null); // State to store the downloadable audio URL
  const [taskCompleted, setTaskCompleted] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const userme = localStorage.getItem("userid");
  const [prediction, setPrediction] = useState(null);
  const [marks, setmarks] = useState(0);
  const addspeechMutation = AddSpeechResults(); // This is the hook that triggers the mutation
  const userid = localStorage.getItem("userid"); // Get user ID from localStorage
  const { word } = useParams();
  const location = useLocation(); // Get the state
  const isActive = location.state?.isActive || false;
  const [message, setMessage] = useState("");
  const[restartpactices,setrestartpactices] = useState(false);
  const[finshed,setfinished] = useState(false); 
  const [stop, setStop] = useState(false);
  const [satart,setstaret] = useState(true);
  //   const { data: getallword, isLoading, error } = findword(id);
 const [clarifyResults, setclarifyResults] = useState(true);
 const [loads, setloads] = useState(false);
 const [calculateWrog, setcalculateWrog] = useState(0);

  const letterSets = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
    ["K", "L"],
    ["M", "N"],
    ["O", "P"],
    ["Q", "R"],
    ["S", "T"],
    ["U", "V"],
    ["W", "X"],
    ["Y", "Z"],
  ];

  const [selectedLetters, setSelectedLetters] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const [spokenWord, setSpokenWord] = useState("");
 const [navigaetstarge,setNavigateStage] = useState(false);
  const generateRandomLetters = () => {
    const randomSet = letterSets[Math.floor(Math.random() * letterSets.length)];
    const randomIndex = Math.floor(Math.random() * 2);
    setSelectedLetters({ 0: randomSet[0], 1: randomSet[1] });
    setActiveIndex(randomIndex);
  };

  const [audioURL, setAudioURL] = useState(null);

  // 🎙 Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        console.log("Data available, size:", event.data.size);
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        console.log("Recording stopped, processing audio...");
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        setAudioURL(URL.createObjectURL(audioBlob));
        try {
          const wavBlob = await convertToWav(audioBlob);
          console.log("WAV conversion completed, size:", wavBlob.size);
          setAudioBlob(wavBlob);
        } catch (error) {
          console.error("Error converting to WAV:", error);
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // ⏹ Stop Recording
  const stopRecording = () => {
       setfinished(true);
    if (mediaRecorderRef.current && recording) {
      setTimeout(() => {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
        setRecording(false);
        console.log("Recording stopped successfully.");
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" }); // Blob from recorded data
        convertToWav(audioBlob);
     
      }, 500); // ⏳ Delay ensures all data is processed
    }
  };

  // 🎵 Convert Audio to WAV
  const convertToWav = async (blob) => {
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await new AudioContext().decodeAudioData(arrayBuffer);

    return encodeWAV(audioBuffer);
  };
const LeaingCaneter = () =>{
navigate("/vocabulary/stage-two");
}
  // 📤 Upload Audio File
  const uploadAudio = async () => {
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");
setclarifyResults(false)
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/audio/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setPrediction(response.data);
      setmarks(response.data.confidence);
      setTaskCompleted(true);
      await addresulis(response.data);
      console.log("✅ Upload success:", response.data);
      setloads(true);
    } catch (error) {
      console.error("❌ Error uploading file:", error);
    }
  };
  const addresulis = (data) => {
    if (!data?.confidence || !data?.cluster) {
      alert("❌ Missing required fields: confidence or cluster");
      return;
    }

    const response = {
      confidence: data.confidence,
      cluster: data.cluster,
      userid: userid, // Ensure `userid` is defined
    };
    addspeechMutation.mutate(response);
  };



  let starCount = 0;
  if (marks >= 2) {
    starCount = 2;
  } else if (marks >= 3) {
    starCount = 3;
  } else if (marks >= 4) {
    starCount = 4;
  } else if (marks >= 5) {
    starCount = 5;
  }

  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`mr-2 text-yellow-500 text-4xl ${
        index < starCount ? "★" : "☆"
      }`}
    >
      {index < starCount ? "★" : "☆"}
    </span>
  ));

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessage("⚠️ Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onstart = () => {
      setMessage("🎤 Listening...");
    };

    recognition.onresult = (event) => {
      const spokenLetter = event.results[0][0].transcript
        .toUpperCase()
        .trim()
        .replace(".", ""); // Clean input

      setSpokenWord(spokenLetter);
      console.log("Heard:", spokenLetter);

      // Check if the spoken letter matches the missing letter
      if (spokenLetter === selectedLetters[activeIndex]) {
        setMessage(
          `✅ Correct! The sequence is ${Object.values(selectedLetters).join(
            " "
          )}`
        );
        setstaret(true);
      } else {
        setMessage("❌ Wrong! Try again.");
        setstaret(false)
        setcalculateWrog( calculateWrog + 1);
        if (calculateWrog >= 3) {
          setfinished(true);
          setMessage("❌ Too many attempts! Please try again.");
          setstaret(false);
          setNavigateStage(true);
        }
      }
    };
  };

  const satrtNewPreactice = ()=>{
    setfinished(false);
    setclarifyResults(true);
    setSelectedLetters({});
    setActiveIndex(null);
    setSpokenWord("");
    setMessage("");
    setmarks(0);
    setstaret(true)
  }

  return (
    <div className=" bg-center bg-[url(https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg)] bg-cover bg-no-repeat w-full">
      <div className="py-10 px-11">
        <div className="py-10 px-11">
          {clarifyResults ? (
            <div className="flex flex-col items-center space-y-6 p-6">
              <div className="text-4xl font-bold space-x-4 flex justify-center">
                {[0, 1].map((idx) => (
                  <span
                    key={idx}
                    className="border-b-4 w-[200px] h-[200px] flex items-center justify-center text-7xl text-center border-blue-500 bg-yellow-200 text-blue-700 px-6 py-2 rounded-lg shadow-lg"
                  >
                    {selectedLetters[idx] && idx !== activeIndex ? (
                      <h1 className="text-7xl font-extrabold">
                        {selectedLetters[idx]}
                      </h1>
                    ) : (
                      <div className="text-7xl">❓</div>
                    )}
                  </span>
                ))}
              </div>

              {message && (
                <p className="text-lg font-semibold text-blue-600 bg-yellow-200 p-2 rounded-md shadow-md">
                  {message}
                </p>
              )}
              {spokenWord && (
                <p className="text-xl font-bold mt-4 text-green-600 bg-pink-200 p-3 rounded-lg shadow-lg animate-bounce">
                  🎤 You said:{" "}
                  <span className="text-red-500">{spokenWord}</span>
                </p>
              )}
              {stars && (
                <>
                  <button
                    onClick={generateRandomLetters}
                    className="px-6 py-3 bg-green-400 text-white font-bold rounded-full shadow-lg hover:bg-green-500 transition-transform transform hover:scale-105 active:scale-95 animate-bounce"
                  >
                    🎲 Surprise Me!
                  </button>
                </>
              )}

              <div className="flex space-x-4">
                {satart ? (
                  <>
                    <button
                      onClick={() => {
                        startRecording();
                        handleVoiceInput();
                      }}
                      className="px-6 py-3 bg-red-400 text-white font-bold rounded-full shadow-lg hover:bg-red-500 transition-transform transform hover:scale-105 active:scale-95 animate-pulse"
                    >
                      🎤 Start Talking!
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleVoiceInput();
                        if (finshed) {
                          startRecording();
                          setAudioURL(null);
                        }
                      }}
                      className="px-6 py-3 bg-red-400 text-white font-bold rounded-full shadow-lg hover:bg-red-500 transition-transform transform hover:scale-105 active:scale-95 animate-pulse"
                    >
                      Let's Try Again
                    </button>
                  </>
                )}
                <button
                  onClick={stopRecording}
                  className="px-6 py-3 bg-gray-400 text-white font-bold rounded-full shadow-lg hover:bg-gray-500 transition-transform transform hover:scale-105 active:scale-95"
                >
                  ⏹️ Stop Talking
                </button>
              </div>

              {finshed && (
                <>
                  <button
                    onClick={uploadAudio}
                    className="px-6 py-3 bg-purple-500 text-white font-bold rounded-full shadow-lg hover:bg-purple-600 transition-transform transform hover:scale-105 active:scale-95"
                  >
                    📤 Upload Your Sound!
                  </button>
                  {navigaetstarge && (
                    <button
                      onClick={LeaingCaneter}
                      className="px-6 py-3 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 
             text-white text-lg font-bold rounded-full shadow-xl 
             hover:scale-105 active:scale-95 transition-all duration-300 
             border-4 border-white outline-none focus:ring-4 focus:ring-yellow-300"
                    >
                      🎵 Learning Sound 🎈
                    </button>
                  )}

                  {audioURL && (
                    <div className="mt-4 flex flex-col items-center space-y-2">
                      <p className="text-lg font-bold text-blue-600">
                        🔊 Your Recording:
                      </p>
                      <audio
                        controls
                        className="w-full max-w-xs border-2 border-blue-400 rounded-lg shadow-md"
                      >
                        <source src={audioURL} type="audio/wav" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <>
              {loads ? (
                <>
                  <div className=" flex justify-center">
                    {prediction && (
                      <div>
                        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-pink-100 rounded-2xl shadow-2xl w-[550px] h-[400px]  py-12 px-16">
                          <h2 className="text-2xl font-bold text-pink-600">
                            🎈 Prediction Result 🎈
                          </h2>
                          <p className="text-lg font-semibold text-blue-700 mt-2">
                            Confidence:{" "}
                            <span className="text-orange-500">
                              {prediction.confidence}
                            </span>
                          </p>
                          <p className="text-lg font-semibold text-blue-700">
                            Cluster:{" "}
                            <span className="text-green-500">
                              {prediction.cluster === 1
                                ? "Loqw"
                                : prediction.cluster === 2
                                ? "Mediam"
                                : prediction.cluster === 3
                                ? "Modarate"
                                : prediction.cluster === 4
                                ? "High"
                                : ""}
                            </span>
                          </p>
                          <div className="flex mt-4 text-yellow-500 text-3xl">
                            {stars}
                          </div>
                          <div>
                            <img
                              src={happygif}
                              alt="Loading..."
                              className="w-1/2 mx-auto"
                            />
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                // generateRandomLetters()
                                // startRecording();
                                // handleVoiceInput();
                                satrtNewPreactice();
                              }}
                              className="px-6 py-3 bg-red-400 text-white font-bold rounded-full shadow-lg hover:bg-red-500 transition-transform transform hover:scale-105 active:scale-95 "
                            >
                              🎤 Start Talking!
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h1 className=" text-center text-3xl">
                      predict Results...
                    </h1>
                    <img
                      src={perload}
                      alt="Loading..."
                      className="w-1/2 mx-auto"
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlphabetSelector;
