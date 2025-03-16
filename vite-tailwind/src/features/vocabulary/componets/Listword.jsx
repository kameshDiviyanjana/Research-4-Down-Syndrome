import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import bush from "../../../assets/bush-clipart-animated-6.png";
import sun from "../../../assets/source.gif";
import { AllAddWord } from "../../../Api/vocabularyApi";
import StartingPage from "../utile/StartingPage";
import { encodeWAV } from "./wavEncoder";

function Listword() {
  const [pagecount, setPagecount] = useState(1);
  const userme = localStorage.getItem("userid");
  // const [completed, setCompleted] = useState(false);
  // const [start, setStart] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  // const mediaRecorderRef = useRef(null);
  // const audioChunksRef = useRef([]);
  const [wordis, setwordid] = useState("");
  // Fetching words data
  const {
    data: getallword,
    isLoading,
    error,
  } = AllAddWord(pagecount, 1, userme);

  // Text-to-speech function
  const spechword = (textword) => {
    const utterance = new SpeechSynthesisUtterance(textword);
    window.speechSynthesis.speak(utterance);
  };

  // Pagination Handlers
  const nextWord = () => {
    if (pagecount < getallword?.data?.totalPages) {
      setPagecount((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };
  const passid = (id) => {};
  const prevWord = () => {
    setPagecount((prev) => (prev > 1 ? prev - 1 : 1));
  };
 const [recording, setRecording] = useState(false);
 const [audioBlob, setAudioBlob] = useState(null);
 const [completed, setCompleted] = useState(false);
 const [taskCompleted, setTaskCompleted] = useState(false);
 const [start, setStart] = useState(true);
 const mediaRecorderRef = useRef(null);
 const audioChunksRef = useRef([]);
 const [prediction, setPrediction] = useState(null);
//  const { id } = useParams();
//  const { data: getallwords, isLoading:find, error:Errrorfinda } = findword(id);

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
       "http://127.0.0.1:5000/audio/predict",
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

 
  const [taskcompleted, settaskcompleted] = useState(false);

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
                {getallword?.data?.wordses?.map((word) => (
                  <div key={word._id} className="text-center space-y-4">
                    <img
                      src={word.imagewordUrl}
                      alt={word.wordAdd}
                      className="lg:h-[500px] lg:w-[700px] rounded-xl"
                    />
                    <h1
                      className="font-bold text-[90px] text-center hover:text-blue-500 active:text-red-500 transition-colors cursor-pointer"
                      onClick={() => spechword(word.wordAdd)}
                    >
                      {word.wordAdd}
                    </h1>
                  </div>
                ))}
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
                  //  sendAudioToBackend();
                     nextWord();
                  
                     uploadAudio();
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

export default Listword;
