// // export default WordLearn;

// import React, { useState, useRef,useEffect} from "react";
// import axios from "axios";
// import { encodeWAV } from "./wavEncoder";
// import sun from "../../../assets/source.gif";
// import { useParams, useLocation } from "react-router-dom";
// import StartingPage from "../utile/StartingPage";
// import { AddSpeechResults, AllAddWord, Allresults, lastresults } from "../../../Api/vocabularyApi";
// import LineChart from "./linechar";
// import { Play, Pause } from "lucide-react";
// import bg1 from "../../../../public/images/bg3.jpg";


// const AllWordList = () => {
//   const [recording, setRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [audioUrl, setAudioUrl] = useState(null); // State to store the downloadable audio URL
//   const [completed, setCompleted] = useState(false);
//   const [taskCompleted, setTaskCompleted] = useState(false);
//   const [start, setStart] = useState(false);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const [pagecount, setPagecount] = useState(1);
//   const userme = localStorage.getItem("userid");
//   const [prediction, setPrediction] = useState(null);
//   const [scoreborder, setscoreborder] = useState(true);
//   const [marks, setmarks] = useState(0);
//   const addspeechMutation = AddSpeechResults(); // This is the hook that triggers the mutation
//   const userid = localStorage.getItem("userid"); // Get user ID from localStorage
//   const { word } = useParams();
//   const location = useLocation(); // Get the state
//   const isActive = location.state?.isActive || false;
//     const [testautio, settestautio] = useState(true);
//   //   const { data: getallword, isLoading, error } = findword(id);
//   const {
//     data: getresults,
//     isLoading: losdresultd,
//     error: errorresults,
//   } = Allresults(userid);

//   const {
//     data: getlastresults,
//     isLoading: loadlastresultd,
//     error: errorlastresults,
//   } = lastresults(userid);

//   const {
//     data: getallword,
//     isLoading,
//     error,
//   } = AllAddWord(pagecount, 1, userme);
//     const [audioURL, setAudioURL] = useState(null);

//   // 🎙 Start Recording
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream, {
//         mimeType: "audio/webm",
//       });

//       audioChunksRef.current = [];

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         console.log("Data available, size:", event.data.size);
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = async () => {
//         console.log("Recording stopped, processing audio...");
//         const audioBlob = new Blob(audioChunksRef.current, {
//           type: "audio/webm",
//         });
//             setAudioURL(URL.createObjectURL(audioBlob));
//         try {
//           const wavBlob = await convertToWav(audioBlob);
//           console.log("WAV conversion completed, size:", wavBlob.size);
//           setAudioBlob(wavBlob);
//         } catch (error) {
//           console.error("Error converting to WAV:", error);
//         }
//       };

//       mediaRecorderRef.current.start();
//       setRecording(true);
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//     }
//   };

//   // ⏹ Stop Recording
//   const stopRecording = () => {
//     if (mediaRecorderRef.current && recording) {
//       setTimeout(() => {
//         mediaRecorderRef.current.stop();
//         mediaRecorderRef.current.stream
//           .getTracks()
//           .forEach((track) => track.stop());
//         setRecording(false);
//         console.log("Recording stopped successfully.");
//           const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" }); // Blob from recorded data
//           convertToWav(audioBlob); 
//       }, 500); // ⏳ Delay ensures all data is processed
//     }
//   };

//   // 🎵 Convert Audio to WAV
//   const convertToWav = async (blob) => {
//     const arrayBuffer = await blob.arrayBuffer();
//     const audioBuffer = await new AudioContext().decodeAudioData(arrayBuffer);
    
//     return encodeWAV(audioBuffer);
//   };

//   const convertToWavdownlad = async (blob) => {
//     const arrayBuffer = await blob.arrayBuffer();
//     const audioBuffer = await new AudioContext().decodeAudioData(arrayBuffer);
//     const wavBlob = await encodeWAV(audioBuffer); // Encode to WAV

//     // Create a URL for the WAV Blob
//     const audioUrl = URL.createObjectURL(wavBlob);
//     setAudioUrl(audioUrl); // Set the downloadable URL
//   };
//   // 📤 Upload Audio File
//   const uploadAudio = async () => {
 

//     const formData = new FormData();
//     formData.append("file", audioBlob, "audio.wav");

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:5000/audio/predict",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       setPrediction(response.data);
//       setmarks(response.data.confidence);
//       setTaskCompleted(true);
//       await addresulis(response.data);
//       console.log("✅ Upload success:", response.data);
//     } catch (error) {
//       console.error("❌ Error uploading file:", error);
//     }
//   };
//   const addresulis = (data) => {
//     if (!data?.confidence || !data?.cluster) {
//       alert("❌ Missing required fields: confidence or cluster");
//       return;
//     }

//     const response = {
//       confidence: data.confidence,
//       cluster: data.cluster,
//       userid: userid, // Ensure `userid` is defined
//     };
//     console.log("dadadadaddadad ", response);
//     addspeechMutation.mutate(response);
//   };

//   const [lastResult, setLastResult] = useState(null);
//   const [currentResult, setCurrentResult] = useState(null);

//   useEffect(() => {
//     if (getresults?.length > 0) {
//       // Assuming the last result is the first element, you can adjust as needed
//       const last = getresults[getresults.length - 2]; // Get the second-to-last item (Last row)
//       const current = getresults[getresults.length - 1]; // Get the most recent item (Current row)

//       setLastResult(last);
//       setCurrentResult(current);
//     }
//   }, [getresults]);

// const nextWord = () => {
//   setAudioURL(null);
//   setStart(true);
//   setscoreborder(true);
//   setCompleted(true);
//   setTaskCompleted(false);
//   setmarks(null);
//   setPrediction(null);

//   if (pagecount < getallword?.data?.totalCount) {
//     setPagecount((prev) => prev + 1);
//   }

//   if (pagecount + 1 === getallword?.data?.totalCount) {
//     setTaskCompleted(true);
//   }
// };

// //   const nextWord = () => {
// //     setAudioURL(null); // Reset audio URL
// //     setStart(true)
// //     setscoreborder(true)
// //      setStart(true);
// //     setCompleted(true);
// //     setTaskCompleted(false);
// // setmarks(null);
// // setPrediction(null);
// //     // Increment page count or set it to the total count if completed
// //     if (pagecount < getallword.data.totalCount) {
// //       setPagecount(pagecount + 1);
// //     }

// //     // If pagecount matches the totalCount, mark the task as completed
// //     if (pagecount + 1 === getallword.data.totalCount) {
// //       setTaskCompleted(true);
// //     }
// //   };
//   let starCount = 0;
//   if (marks >= 2) {
//     starCount = 2;
//   } else if (marks >= 3) {
//     starCount = 3;
//   } else if (marks >= 4) {
//     starCount = 4;
//   } else if (marks >= 5) {
//     starCount = 5;
//   }

//   const stars = Array.from({ length: 5 }, (_, index) => (
//     <span
//       key={index}
//       className={`mr-2 text-yellow-500 text-4xl ${
//         index < starCount ? "★" : "☆"
//       }`}
//     >
//       {index < starCount ? "★" : "☆"}
//     </span>
//   ));

//   //   const nextWord = () => {
//   //     setCompleted(true);
//   //     setPagecount(pagecount + 1);
//   //     if (getallword.data.totalCount == pagecount) {
//   //      setTaskCompleted(true)
//   //     }
//   //   };
//   console.log("🔥 Prediction:", getresults?.data);
//     const spechword = (textword) => {
//       const utterance = new SpeechSynthesisUtterance(textword);
//       window.speechSynthesis.speak(utterance);
//     };

//     const  testprediction = () =>{
//       settestautio(false)
//     }

//      const [isPlaying, setIsPlaying] = useState(false);
//      const audioRef = useState(null);

//      const togglePlay = () => {
//        if (audioRef.current) {
//          if (isPlaying) {
//            audioRef.current.pause();
//          } else {
//            audioRef.current.play();
//          }
//          setIsPlaying(!isPlaying);
//        }
//      };

//   return (
//     <div
//       className="
//       bg-cover bg-no-repeat bg-center w-ful
//       justify-center items-center text-center p-6"
//       style={{
//         backgroundImage: `url(${bg1})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         zIndex: -1,
//         height: "900px",
//       }}
//     >
//       <div className="py-10 px-11">
//         <div className="flex justify-between">
//           <img src={sun} alt="sun" className="h-48" />
//           {start ? (
//             scoreborder && (
//               <div className="flex flex-wrap justify-center space-x-4">
//                 {testautio ? (
//                   <>
//                     {getallword?.data?.wordses?.map((word) => (
//                       <div
//                         key={word._id}
//                         className="text-center space-y-4 p-4 rounded-2xl shadow-xl bg-gradient-to-br from-yellow-100 to-blue-100"
//                       >
//                         <img
//                           src={word.imagewordUrl}
//                           alt={word.wordAdd}
//                           className="lg:h-[500px] lg:w-[700px] rounded-xl border-8 border-white shadow-md"
//                         />
//                         {isActive && (
//                           <h1
//                             className="font-extrabold text-[90px] text-center text-pink-500 hover:text-green-500 active:text-orange-500 transition-all cursor-pointer drop-shadow-lg"
//                             onClick={() => spechword(word.wordAdd)}
//                           >
//                             {word.wordAdd}
//                           </h1>
//                         )}
//                       </div>
//                     ))}
//                   </>
//                 ) : (
//                   <>
//                     {/* {audioURL && (
//                       <audio controls src={audioURL} className="mt-3 w-full" />
//                     )} */}

//                     {audioURL && (
//                       <div className="flex items-center gap-4 p-4 bg-blue-100 rounded-2xl shadow-lg w-full max-w-md mx-auto">
//                         <button
//                           onClick={togglePlay}
//                           className="p-4 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition"
//                         >
//                           {isPlaying ? <Pause size={28} /> : <Play size={28} />}
//                         </button>
//                         <audio
//                           ref={audioRef}
//                           src={audioURL}
//                           onEnded={() => setIsPlaying(false)}
//                         />
//                         <p className="text-lg font-semibold text-gray-700">
//                           Tap to Play!
//                         </p>
//                       </div>
//                     )}
//                     <button
//                       onClick={() => {
//                         uploadAudio();
//                       }}
//                       className="bg-gradient-to-r from-green-400 to-yellow-400 text-white text-2xl font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-400 hover:to-purple-400 h-[100px] active:scale-95 transition-all"
//                     >
//                       🎉 Complete ✅
//                     </button>
//                   </>
//                 )}
//               </div>
//             )
//           ) : (
//             <StartingPage
//               setstart={() => {
//                 startRecording();
//                 setStart(true);
//               }}
//             />
//           )}
//           {start && scoreborder && (
//             <>
//               {taskCompleted ? (
//                 <button
//                   onClick={() => {
//                     stopRecording();
//                     setscoreborder(false);
//                     setmarks(true);
//                   }}
//                   className="bg-gradient-to-r from-green-400 to-yellow-400 text-white text-2xl font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-400 hover:to-purple-400 h-[100px] active:scale-95 transition-all"
//                 >
//                   🎉 Complete ✅
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => {
//                     //nextWord();
//                     stopRecording();
//                     testprediction();
//                     ///startRecording();
//                   }}
//                   className="bg-gradient-to-r from-yellow-400 to-pink-400 text-white text-2xl font-bold py-3 px-8 h-[100px] rounded-full shadow-lg hover:from-green-400 hover:to-blue-400 active:scale-95 transition-all"
//                 >
//                   🚀 Next 🎈
//                 </button>
//               )}
//             </>
//           )}
//         </div>

//         {marks && (
//           <div className=" flex justify-center flex-col">
//             <div className=" flex justify-center">
//               <button
//                 onClick={() => {
//                   nextWord();
//                    setStart(true);
//                 }}
//                 className='"bg-[#F18F02] bg-orange-500 font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 text-white px-5 mt-14 max-w-28 max-h-12 '
//               >
//                 Complete
//               </button>
//             </div>
//             <div>
//               <div className=" grid grid-cols-2 gap-6">
//                 <div className=" flex justify-center">
//                   {prediction && (
//                     <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-pink-100 rounded-2xl shadow-2xl w-[450px] h-[300px]">
//                       <h2 className="text-2xl font-bold text-pink-600">
//                         🎈 Prediction Result 🎈
//                       </h2>
//                       <p className="text-lg font-semibold text-blue-700 mt-2">
//                         Confidence:{" "}
//                         <span className="text-orange-500">
//                           {prediction.confidence}
//                         </span>
//                       </p>
//                       <p className="text-lg font-semibold text-blue-700">
//                         Cluster:{" "}
//                         <span className="text-green-500">
//                           {prediction.cluster}
//                         </span>
//                       </p>
//                       <div className="flex mt-4 text-yellow-500 text-3xl">
//                         {stars}
//                       </div>
//                     </div>
//                   )}
//                 </div>{" "}
//                 <div className=" flex flex-col justify-center ">
//                   <div className=" text-center"></div>
//                   <div className=" flex justify-center ">
//                     {getlastresults.data && (
//                       <div className="bg-gradient-to-br from-blue-100 to-pink-100">
//                         <div className=" shadow-2xl text-center  w-[450px] h-[250px] py-16">
//                           <h2 className="text-2xl font-bold text-pink-600">
//                             🎈Last Results Prediction Result 🎈
//                           </h2>
//                           <p className="text-lg font-semibold text-blue-700 mt-2">
//                             Confidence:{" "}
//                             <span className="text-orange-500">
//                               {getlastresults.data.confidence}
//                             </span>
//                           </p>
//                           <p className="text-lg font-semibold text-blue-700">
//                             Cluster:{" "}
//                             <span className="text-green-500">
//                               {getlastresults.data.cluster}
//                             </span>
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               {audioUrl && (
//                 <div className="flex justify-center mt-10">
//                   <a
//                     href={audioUrl}
//                     download="recorded-audio.wav"
//                     className="bg-gradient-to-r from-green-400 to-yellow-400 text-white text-2xl font-bold py-3 px-8 rounded-full shadow-lg"
//                   >
//                     Download Audio
//                   </a>
//                 </div>
//               )}
//               {/* <div class="overflow-x-auto">
//                 <table className="w-full border-collapse bg-white rounded-xl shadow-md overflow-hidden">
//                   <thead className="bg-gradient-to-r from-blue-300 to-purple-400 text-white">
//                     <tr>
//                       <th className="border border-gray-300 px-6 py-3 text-left text-lg font-bold">
//                         Cluster
//                       </th>
//                       <th className="border border-gray-300 px-6 py-3 text-left text-lg font-bold">
//                         Confidence
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {getresults?.data?.length > 0 ? (
//                       getresults?.data?.map((user) => (
//                         <tr
//                           key={user._id}
//                           className="hover:bg-yellow-200 transition-all duration-300"
//                         >
//                           <td className="border border-gray-300 px-6 py-3 text-lg text-center text-blue-600 font-semibold">
//                             {user.cluster == 1
//                               ? "To Much Low "
//                               : user.cluster == 2
//                               ? "Low"
//                               : user.cluster == 3
//                               ? "Medium"
//                               : user.cluster == 4
//                               ? "High"
//                               : "To Much High"}
//                           </td>
//                           <td className="border border-gray-300 px-6 py-3 text-lg text-center text-green-600 font-semibold">
//                             {user.confidence}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="2"
//                           className="border border-gray-300 px-6 py-3 text-center text-gray-500 text-lg animate-pulse"
//                         >
//                           🚀 No results found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div> */}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllWordList;


import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { encodeWAV } from "./wavEncoder";
import sun from "../../../assets/source.gif";
import { useParams, useLocation } from "react-router-dom";
import StartingPage from "../utile/StartingPage";
import {
  AddSpeechResults,
  AllAddWord,
  Allresults,
  lastresults,
} from "../../../Api/vocabularyApi";
import LineChart from "./linechar";
import { Play, Pause } from "lucide-react";
import bg1 from "../../../../public/images/bg3.jpg";

const AllWordList = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
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
  const addspeechMutation = AddSpeechResults();
  const userid = localStorage.getItem("userid");
  const { word } = useParams();
  const location = useLocation();
  const isActive = location.state?.isActive || false;
  const [testautio, settestautio] = useState(true);
  const [audioURL, setAudioURL] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

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

  // Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        setAudioURL(URL.createObjectURL(audioBlob));
        try {
          const wavBlob = await convertToWav(audioBlob);
          setAudioBlob(wavBlob);
        } catch (error) {
          console.error("Error converting to WAV:", error);
        }
      };

      mediaRecorderRef.current.start(1000); // Collect data every 1s
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setRecording(false);
    }
  };

  // Convert Audio to WAV
  const convertToWav = async (blob) => {
    const arrayBuffer = await blob.arrayBuffer();
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return encodeWAV(audioBuffer);
  };

  // Upload Audio File
  const uploadAudio = async () => {
    if (!audioBlob) {
      console.error("No audio blob to upload");
      return;
    }

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
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const addresulis = (data) => {
    if (!data?.confidence || !data?.cluster) {
      console.error("Missing required fields: confidence or cluster");
      return;
    }

    const response = {
      confidence: data.confidence,
      cluster: data.cluster,
      userid: userid,
    };
    addspeechMutation.mutate(response);
  };

  const [lastResult, setLastResult] = useState(null);
  const [currentResult, setCurrentResult] = useState(null);

  useEffect(() => {
    if (getresults?.length > 0) {
      const last = getresults[getresults.length - 2];
      const current = getresults[getresults.length - 1];
      setLastResult(last);
      setCurrentResult(current);
    }
  }, [getresults]);

  const nextWord = () => {
    setAudioURL(null);
    setStart(true);
    setscoreborder(true);
    setCompleted(true);
    setTaskCompleted(false);
    setmarks(null);
    setPrediction(null);
    settestautio(true);
   startRecording();
    if (pagecount < getallword?.data?.totalCount) {
      setPagecount((prev) => prev + 1);
    }

    if (pagecount + 1 === getallword?.data?.totalCount) {
      setTaskCompleted(true);
    }
  };

  const spechword = (textword) => {
    const utterance = new SpeechSynthesisUtterance(textword);
    window.speechSynthesis.speak(utterance);
  };

  const testprediction = () => {
    settestautio(false);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Calculate star rating
  let starCount = 0;
  if (marks >= 0.8) {
    starCount = 5;
  } else if (marks >= 0.6) {
    starCount = 4;
  } else if (marks >= 0.4) {
    starCount = 3;
  } else if (marks >= 0.2) {
    starCount = 2;
  } else if (marks > 0) {
    starCount = 1;
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

  return (
    <div
      className="bg-cover bg-no-repeat bg-center w-full justify-center items-center text-center p-6"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
        minHeight: "100vh",
      }}
    >
      <div className="py-10 px-11">
        <div className="flex justify-between">
          <img src={sun} alt="sun" className="h-48" />

          {start ? (
            scoreborder && (
              <div className="flex flex-wrap justify-center space-x-4">
                {testautio ? (
                  <>
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
                    ))}
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    {audioURL && (
                      <div className="flex items-center gap-4 p-4 bg-blue-100 rounded-2xl shadow-lg w-full max-w-md">
                        <button
                          onClick={togglePlay}
                          className="p-4 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition"
                        >
                          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                        </button>
                        <audio
                          ref={audioRef}
                          src={audioURL}
                          onEnded={() => setIsPlaying(false)}
                        />
                        <p className="text-lg font-semibold text-gray-700">
                          {isPlaying ? "Playing..." : "Tap to Play"}
                        </p>
                      </div>
                    )}
                    <button
                      onClick={uploadAudio}
                      className="bg-gradient-to-r from-green-400 to-yellow-400 text-white text-2xl font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-400 hover:to-purple-400 h-[100px] active:scale-95 transition-all"
                    >
                      🎉 Complete ✅
                    </button>
                  </div>
                )}
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
                    stopRecording();
                    setscoreborder(false);
                  }}
                  className="bg-gradient-to-r from-green-400 to-yellow-400 text-white text-2xl font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-400 hover:to-purple-400 h-[100px] active:scale-95 transition-all"
                >
                  🎉 Complete ✅
                </button>
              ) : (
                <button
                  onClick={() => {
                    stopRecording();
                    testprediction();
                  }}
                  className="bg-gradient-to-r from-yellow-400 to-pink-400 text-white text-2xl font-bold py-3 px-8 h-[100px] rounded-full shadow-lg hover:from-green-400 hover:to-blue-400 active:scale-95 transition-all"
                >
                  🚀 Next 🎈
                </button>
              )}
            </>
          )}
        </div>

        {marks && (
          <div className="flex justify-center flex-col">
            <div className="flex justify-center">
              <button
                onClick={nextWord}
                className="bg-orange-500 font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 text-white px-5 mt-14 max-w-28 max-h-12"
              >
                Next
              </button>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex justify-center">
                  {prediction && (
                    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-pink-100 rounded-2xl shadow-2xl w-full max-w-md">
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
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex justify-center">
                    {getlastresults?.data && (
                      <div className="bg-gradient-to-br from-blue-100 to-pink-100 rounded-2xl shadow-2xl w-full max-w-md">
                        <div className="text-center p-6">
                          <h2 className="text-2xl font-bold text-pink-600">
                            🎈 Last Results 🎈
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
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {audioUrl && (
                <div className="flex justify-center mt-10">
                  <a
                    href={audioUrl}
                    download="recorded-audio.wav"
                    className="bg-gradient-to-r from-green-400 to-yellow-400 text-white text-2xl font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-400 hover:to-purple-400 transition-all"
                  >
                    Download Audio
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllWordList;