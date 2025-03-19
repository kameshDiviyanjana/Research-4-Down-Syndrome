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
  const [marks, setmarks] = useState(0);
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
      setmarks(response.data.confidence);
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
  let starCount =0 ;
  if (marks >= 2) {
    starCount = 2;
  } else if (marks >= 3) {
    starCount = 3;
  }else if (marks >= 4) {
    starCount = 4;
  }
else if (marks >= 5) {
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
                  <div
                    key={word._id}
                    className="text-center space-y-4 p-4 rounded-2xl shadow-xl bg-gradient-to-br from-yellow-100 to-blue-100"
                  >
                    <img
                      src={word.imagewordUrl}
                      alt={word.wordAdd}
                      className="lg:h-[500px] lg:w-[700px] rounded-xl border-8 border-white shadow-md"
                    />
                    {isActive && (
                      <h1
                        className="font-extrabold text-[90px] text-center text-pink-500 hover:text-green-500 active:text-orange-500 transition-all cursor-pointer drop-shadow-lg"
                        onClick={() => spechword(word.wordAdd)}
                      >
                        {word.wordAdd}
                      </h1>
                    )}
                  </div>

                  // <div key={word._id} className="text-center space-y-4">
                  //   <img
                  //     src={word.imagewordUrl}
                  //     alt={word.wordAdd}
                  //     className="lg:h-[500px] lg:w-[700px] rounded-xl"
                  //   />
                  //   {isActive && (
                  //     <h1
                  //       className="font-bold text-[90px] text-center hover:text-blue-500 active:text-red-500 transition-colors cursor-pointer"
                  //       onClick={() => spechword(word.wordAdd)}
                  //     >
                  //       {word.wordAdd}
                  //     </h1>
                  //   )}
                  // </div>
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
                  className="bg-gradient-to-r from-green-400 to-yellow-400 text-white text-2xl font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-400 hover:to-purple-400 h-[100px] active:scale-95 transition-all"
                >
                  🎉 Complete ✅
                </button>
              ) : (
                <button
                  onClick={() => {
                    nextWord();
                    //startRecording();
                  }}
                  className="bg-gradient-to-r from-yellow-400 to-pink-400 text-white text-2xl font-bold py-3 px-8 h-[100px] rounded-full shadow-lg hover:from-green-400 hover:to-blue-400 active:scale-95 transition-all"
                >
                  🚀 Next 🎈
                </button>

                // <button
                //   onClick={() => {
                //     nextWord();
                //     //startRecording();
                //   }}
                // >
                //   Next
                // </button>
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
                    // <div>
                    //   <div className=" shadow-2xl text-center  w-[450px] h-[250px] py-16">
                    //     <h2>Prediction Result</h2>
                    //     <p>Confidence: {prediction.confidence}</p>
                    //     <p>Cluster: {prediction.cluster}</p>
                    //   </div>
                    //   <div className="flex">{stars}</div>
                    // </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-pink-100 rounded-2xl shadow-2xl w-[450px] h-[300px]">
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
                          {prediction.cluster}
                        </span>
                      </p>
                      <div className="flex mt-4 text-yellow-500 text-3xl">
                        {stars}
                      </div>
                    </div>
                  )}
                </div>{" "}
                <div className=" flex flex-col justify-center">
                  <div className=" text-center"></div>
                  <div className=" flex justify-center">
                    {getlastresults.data && (
                      <div>
                        <div className=" shadow-2xl text-center  w-[450px] h-[250px] py-16">
                          <h2 className="text-2xl font-bold text-pink-600">
                            🎈Last Results Prediction Result 🎈
                          </h2>
                          <p className="text-lg font-semibold text-blue-700 mt-2">
                            Confidence:{" "}
                            <span className="text-orange-500">
                              {getlastresults.data.confidence}
                            </span>
                          </p>
                          <p className="text-lg font-semibold text-blue-700">
                            Cluster:{" "}
                            <span className="text-green-500">
                              {getlastresults.data.cluster}
                            </span>
                          </p>
                          {/* <div className="flex mt-4 text-yellow-500 text-3xl">
                            {stars}
                          </div> */}
                          {/* <h2>Prediction Result</h2>
                          <p>Confidence: {getlastresults.data.confidence}</p>
                          <p>Cluster: {getlastresults.data.cluster}</p> */}
                        </div>
                        {/* <div className="flex">{stars}</div> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-xl shadow-md overflow-hidden">
                  <thead className="bg-gradient-to-r from-blue-300 to-purple-400 text-white">
                    <tr>
                      <th className="border border-gray-300 px-6 py-3 text-left text-lg font-bold">
                        Cluster
                      </th>
                      <th className="border border-gray-300 px-6 py-3 text-left text-lg font-bold">
                        Confidence
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getresults?.data?.length > 0 ? (
                      getresults?.data?.map((user) => (
                        <tr
                          key={user._id}
                          className="hover:bg-yellow-200 transition-all duration-300"
                        >
                          <td className="border border-gray-300 px-6 py-3 text-lg text-center text-blue-600 font-semibold">
                            {user.cluster}
                          </td>
                          <td className="border border-gray-300 px-6 py-3 text-lg text-center text-green-600 font-semibold">
                            {user.confidence}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="2"
                          className="border border-gray-300 px-6 py-3 text-center text-gray-500 text-lg animate-pulse"
                        >
                          🚀 No results found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* <table class="w-full border-collapse border bg-white border-gray-200">
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
                </table> */}
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
