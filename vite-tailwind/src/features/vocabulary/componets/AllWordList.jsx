// export default WordLearn;

import React, { useState, useRef,useEffect} from "react";
import axios from "axios";
import { encodeWAV } from "./wavEncoder";
import bush from "../../../assets/bush-clipart-animated-6.png";
import sun from "../../../assets/source.gif";
import { useParams, useLocation } from "react-router-dom";
import StartingPage from "../utile/StartingPage";
import { AddSpeechResults, AllAddWord, Allresults, lastresults } from "../../../Api/vocabularyApi";
import LineChart from "./linechar";

const AllWordList = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [start, setStart] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [pagecount, setPagecount] = useState(1);
  const userme = localStorage.getItem("userid");
  const [prediction, setPrediction] = useState(null);
  const [scoreborder, setscoreborder] = useState(true);
  const [marks, setmarks] = useState(false);
  const addspeechMutation = AddSpeechResults(); // This is the hook that triggers the mutation
  const userid = localStorage.getItem("userid"); // Get user ID from localStorage
  const { word } = useParams();
  const location = useLocation(); // Get the state
  const isActive = location.state?.isActive || false;
  //   const { data: getallword, isLoading, error } = findword(id);
     const {
       data: getresults,
       isLoading: losdresultd,
       error: errorresults,
     } = Allresults(userid);

     const {
       data: getlastresults,
       isLoading: loadlastresultd,
       error: errorlastresults,
     } = lastresults(userid);

  const {
    data: getallword,
    isLoading,
    error,
  } = AllAddWord(pagecount, 1, userme);

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

    // console.log("Uploading audio file...");
    // console.log("Audio Blob Details:", audioBlob);
    // console.log("Blob Size:", audioBlob.size, "Type:", audioBlob.type);

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
      await addresulis(response.data);
      console.log("✅ Upload success:", response.data);
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
    console.log("dadadadaddadad ", response);
    addspeechMutation.mutate(response);
  };

  const [lastResult, setLastResult] = useState(null);
  const [currentResult, setCurrentResult] = useState(null);

  useEffect(() => {
    if (getresults?.length > 0) {
      // Assuming the last result is the first element, you can adjust as needed
      const last = getresults[getresults.length - 2]; // Get the second-to-last item (Last row)
      const current = getresults[getresults.length - 1]; // Get the most recent item (Current row)

      setLastResult(last);
      setCurrentResult(current);
    }
  }, [getresults]);

  // const addresulis = (data) => {
  //   const response = {
  //     confidence: data.confidence,
  //     cluster: data.cluster,
  //     userid: userid,
  //   };
  //   addspeechMutation.mutate(response);
  // };
  // ▶ Move to Next Word
  const nextWord = () => {
    setCompleted(true);

    // Increment page count or set it to the total count if completed
    if (pagecount < getallword.data.totalCount) {
      setPagecount(pagecount + 1);
    }

    // If pagecount matches the totalCount, mark the task as completed
    if (pagecount + 1 === getallword.data.totalCount) {
      setTaskCompleted(true);
    }
  };
  let starCount = 0;
  if (marks >= 75) {
    starCount = 4;
  } else if (marks >= 50) {
    starCount = 3;
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

  //   const nextWord = () => {
  //     setCompleted(true);
  //     setPagecount(pagecount + 1);
  //     if (getallword.data.totalCount == pagecount) {
  //      setTaskCompleted(true)
  //     }
  //   };
  console.log("🔥 Prediction:", getresults?.data);

  return (
    <div className=" bg-center bg-[url(https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg)] bg-cover bg-no-repeat w-full">
      <div className="py-10 px-11">
        <div className="flex justify-between">
          <img src={sun} alt="sun" className="h-48" />
          {start ? (
            scoreborder && (
              <div className="flex flex-wrap justify-center space-x-4">
                {/* {getallword?.data && (
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
              )} */}
                {getallword?.data?.wordses?.map((word) => (
                  <div key={word._id} className="text-center space-y-4">
                    <img
                      src={word.imagewordUrl}
                      alt={word.wordAdd}
                      className="lg:h-[500px] lg:w-[700px] rounded-xl"
                    />
                    {isActive && (
                      <h1
                        className="font-bold text-[90px] text-center hover:text-blue-500 active:text-red-500 transition-colors cursor-pointer"
                        onClick={() => spechword(word.wordAdd)}
                      >
                        {word.wordAdd}
                      </h1>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            <StartingPage
              setstart={() => {
                startRecording();
                setStart(true);
              }}
            />
          )}
          {start && scoreborder && (
            <>
              {taskCompleted ? (
                <button
                  onClick={() => {
                    // uploadAudio();
                    stopRecording();
                    setscoreborder(false);
                    setmarks(true);
                  }}
                >
                  Complete
                </button>
              ) : (
                <button
                  onClick={() => {
                    nextWord();
                    //startRecording();
                  }}
                >
                  Next
                </button>
              )}
            </>
          )}
        </div>

        {marks && (
          <div className=" flex justify-center flex-col">
            <div className=" flex justify-center">
              <button
                onClick={() => {
                  uploadAudio();
                }}
                className='"bg-[#F18F02] bg-orange-500 font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 text-white px-5 mt-14 max-w-28 max-h-12 '
              >
                Complete
              </button>
            </div>
            <div className=" grid grid-cols-2 gap-5">
              <div>
                <div className=" flex justify-center">
                  {prediction && (
                    <div>
                      <div className=" shadow-2xl text-center  w-[450px] h-[250px] py-16">
                        <h2>Prediction Result</h2>
                        <p>Confidence: {prediction.confidence}</p>
                        <p>Cluster: {prediction.cluster}</p>
                      </div>
                      <div className="flex">{stars}</div>
                    </div>
                  )}
                </div>{" "}
                <div className=" flex flex-col justify-center">
                  <div className=" text-center">
                    <h1 className=" font-bold">Last Results</h1>
                  </div>
                  <div className=" flex justify-center">
                    {getlastresults.data && (
                      <div>
                        <div className=" shadow-2xl text-center  w-[450px] h-[250px] py-16">
                          <h2>Prediction Result</h2>
                          <p>Confidence: {getlastresults.data.confidence}</p>
                          <p>Cluster: {getlastresults.data.cluster}</p>
                        </div>
                        <div className="flex">{stars}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full border-collapse border bg-white border-gray-200">
                  <thead class="bg-gray-200">
                    <tr>
                      <th class="border border-gray-300 px-4 py-2 text-left">
                        cluster
                      </th>
                      <th class="border border-gray-300 px-4 py-2 text-left">
                        confidence
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getresults?.data?.length > 0 ? (
                      getresults?.data?.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-100">
                          <td className="border border-gray-300 px-4 py-2">
                            {user.cluster}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {user.confidence}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="2" // Adjusted to match the number of columns (2 columns: cluster, confidence)
                          className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                        >
                          No results found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
{/* 
                <div>
                  {getresults.data.length > 0 && (
                    <LineChart
                      lastResult={getresults[getresults.length - 2]}
                      currentResult={getresults[getresults.length - 1]}
                    />
                  )}
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllWordList;
