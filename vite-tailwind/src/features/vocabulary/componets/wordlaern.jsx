import React, { useState, useEffect, useRef } from "react";
import bush from "../../../assets/bush-clipart-animated-6.png";
import sun from "../../../assets/source.gif";
import { AllAddWord, findword } from "../../../Api/vocabularyApi";
import StartingPage from "../utile/StartingPage";
import { useParams } from "react-router-dom";
function WordLearn() {
  const [pagecount, setPagecount] = useState(1);
  const userme = localStorage.getItem("userid");
  const [completed, setCompleted] = useState(false);
  const [start, setStart] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const { id } = useParams();
  const { data: getallword, isLoading, error } = findword(id);

  const spechword = (textword) => {
    const utterance = new SpeechSynthesisUtterance(textword);
    window.speechSynthesis.speak(utterance);
  };

  const nextWord = () => {
    if (pagecount < getallword?.data?.totalPages) {
      setPagecount((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const prevWord = () => {
    setPagecount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioURL(audioURL);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  const [taskcompleted, settaskcompleted] = useState(false);

  const sendAudioToBackend = async () => {
    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });

      if (audioBlob.size === 0) {
        console.error("Audio Blob is empty. Cannot send to backend.");
        return;
      }

      const formData = new FormData();
      formData.append("file", audioBlob, "audio.wav");

      for (let [key, value] of formData.entries()) {
        if (value instanceof Blob) {
          console.log(
            `${key}: Blob - size: ${value.size}, type: ${value.type}`
          );
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      // Send FormData to backend
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      // Handle server response
      if (response.ok) {
        const result = await response.json();
        console.log("Server response:", result);

        // Example: Handle successful task completion
        settaskcompleted(true);
      } else {
        // Capture and log the error response
        const error = await response.json();
        console.error("Error from server:", error.message || "Unknown error");
      }
    } catch (err) {
      // Log any unexpected errors
      console.error("Error sending audio:", err);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading words! Please try again later.</div>;

  const sgg = () => {
    startRecording();
    setStart(false);
  };
  return (
    <div className="bg-[url(https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg)] bg-cover bg-no-repeat bg-center lg:h-[700px] w-full">
      <div className="py-10 px-11">
        <div className="flex justify-between">
          {/* Left Images */}
          <div className="mb-0">
            <img src={sun} alt="sun" className="h-48 max-lg:hidden" />
            <div className="mt-80">
              <img src={bush} alt="bush" className="h-48 max-lg:hidden" />
            </div>
          </div>

          {/* Word Cards */}
          {start ? (
            <StartingPage setstart={sgg} />
          ) : (
            <div className="lg:flex justify-between w-full">
              <button onClick={prevWord} className="max-lg:hidden">
                Previous
              </button>
              <div className="flex flex-wrap justify-center space-x-4">
                {getallword?.data && (
                  <div className="text-center space-y-4">
                    <img
                      src={getallword.data.imagewordUrl}
                      alt={getallword.data.wordAdd}
                      className="lg:h-[500px] lg:w-[700px] rounded-xl"
                    />
                    <h1
                      className="font-bold text-[90px] text-center hover:text-blue-500 active:text-red-500 transition-colors cursor-pointer"
                      onClick={() => spechword(getallword.data.wordAdd)}
                    >
                      {getallword.data.wordAdd}
                    </h1>
                  </div>
                )}
              </div>
              {taskcompleted ? (
                <button
                  className="max-lg:hidden"
                  onClick={() => {
                    // sendAudioToBackend();
                    nextWord();
                    startRecording();
                    //stopRecording();
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  className="max-lg:hidden"
                  onClick={() => {
                    sendAudioToBackend();
                    //  nextWord();
                    stopRecording();
                  }}
                >
                  Complete
                </button>
              )}
            </div>
          )}

          {/* Bottom Images */}
          <div className="mb-0 mt-[490px]">
            <img src={bush} alt="bush" className="h-48 max-lg:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WordLearn;
