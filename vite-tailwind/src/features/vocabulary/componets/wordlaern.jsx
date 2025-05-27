// export default WordLearn;

import React, { useState, useRef } from "react";
import axios from "axios";
import { encodeWAV } from "./wavEncoder";
import bush from "../../../assets/bush-clipart-animated-6.png";
import sun from "../../../assets/source.gif";
import { findword } from "../../../Api/vocabularyApi";
import { useParams } from "react-router-dom";
import StartingPage from "../utile/StartingPage";

const WordLearn = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [start, setStart] = useState(true);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [prediction, setPrediction] = useState(null);
  const { id } = useParams();
  const { data: getallword, isLoading, error } = findword(id);

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
    if (mediaRecorderRef.current && recording) {
      setTimeout(() => {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
        setRecording(false);
        console.log("Recording stopped successfully.");
      }, 500); // ⏳ Delay ensures all data is processed
    }
  };

  // 🎵 Convert Audio to WAV
  const convertToWav = async (blob) => {
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await new AudioContext().decodeAudioData(arrayBuffer);
    return encodeWAV(audioBuffer);
  };

  // 📤 Upload Audio File
  const uploadAudio = async () => {
    // if (!audioBlob) {
    //   console.error("❌ No audio recorded, blob is null");
    //   alert("No audio recorded");
    //   return;
    // }

    console.log("Uploading audio file...");
    console.log("Audio Blob Details:", audioBlob);
    console.log("Blob Size:", audioBlob.size, "Type:", audioBlob.type);

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5002/audio/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setPrediction(response.data);
      setTaskCompleted(true);
      console.log("✅ Upload success:", response.data);
    } catch (error) {
      console.error("❌ Error uploading file:", error);
    }
  };

  // ▶ Move to Next Word
  const nextWord = () => {
    setCompleted(true);
  };

  return (
    <div
      className="bg-cover bg-center h-screen"
    >
      <div className="py-10 px-11">
        <div className="flex justify-between">
          <img src={sun} alt="sun" className="h-48" />
          {start ? (
            <StartingPage
              setstart={() => {
                startRecording();
                setStart(false);
              }}
            />
          ) : (
            <div className="flex flex-wrap justify-center space-x-4">
              {prediction && (
                <div>
                  <h2>Prediction Result</h2>
                  <p>Cluster: {prediction.cluster}</p>
                  <p>Confidence: {prediction.confidence}</p>
                </div>
              )}
              {getallword?.data && (
                <div className="text-center">
                  <img
                    src={getallword.data.imagewordUrl}
                    alt={getallword.data.wordAdd}
                    className="h-[500px] w-[700px] rounded-xl"
                  />
                  <h1
                    className="font-bold text-[90px] cursor-pointer"
                    onClick={() => spechword(getallword.data.wordAdd)}
                  >
                    {getallword.data.wordAdd}
                  </h1>
                </div>
              )}
            </div>
          )}
          {taskCompleted ? (
            <button
              onClick={() => {
                nextWord();
                startRecording();
              }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                uploadAudio();
                stopRecording();
              }}
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordLearn;

