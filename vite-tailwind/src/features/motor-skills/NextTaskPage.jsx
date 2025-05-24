import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bg1 from "../../../public/images/bg3.jpg";


function NextTaskPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { difficultyLevel } = location.state || {};
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [randomCategory, setRandomCategory] = useState("");
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [displayRecord, setDisplayRecord] = useState(false);
  const [Playe, setplaye] = useState(false);

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const categoriesMap = {
    Easy: ["catch", "walk", "stand"],
    Medium: ["run", "throw"],
    Hard: ["dribble", "handstand", "kick-ball"],
  };

  const categoryVideos = {
    catch: "/videos/catch.mp4",
    walk: "/videos/walk.mp4",
    stand: "/videos/jump.mp4",
    run: "/videos/run.mp4",
    throw: "/videos/throw.mp4",
    dribble: "/videos/dribble.mp4",
    handstand: "/videos/handstand.mp4",
    kick_ball: "/videos/kick_ball.mp4",
    somersault: "/videos/somersault.mp4",
  };

  const categories = categoriesMap[difficultyLevel] || [];

  useEffect(() => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.srcObject
    ) {
      setCameraStream(webcamRef.current.video.srcObject);
    }
  }, [webcamRef]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setVideoBlob(null);
  };

  const handleRandomCategory = () => {
    if (categories.length === 0) {
      Swal.fire(
        "Error!",
        "No categories available for this difficulty level.",
        "error"
      );
      return;
    }
    const randomIndex = Math.floor(Math.random() * categories.length);
    setRandomCategory(categories[randomIndex]);
    setPredictions([]);
    setVideoBlob(null);
    setplaye(false)
    // setDisplayRecord(true);
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      Swal.fire({
        title: "අවවාදයයි!",
        text: "පළමුව වීඩියෝවක් තෝරන්න හෝ වාර්තා කරන්න!",
        icon: "error",
        confirmButtonText: "OK",
      }
      );
      return;
    }

    if (!randomCategory) {
      Swal.fire({
        title: "අවවාදයයි!",
        text: "පළමුව අහඹු ක්‍රියාවක් තෝරන්න!",
        icon: "error",
        confirmButtonText: "OK",
      }
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("actual_class", randomCategory);

    try {
      setUploadStatus("උඩුගත කරමින් සහ සැකසමින්...");
      const response = await axios.post(
        "http://127.0.0.1:5000/video/action/predict",
        formData
      );

      const { predictions: receivedPredictions } = response.data;
      setPredictions(receivedPredictions);
      setUploadStatus("සැකසීම අවසන්!");
      let message = response.data.message;
      let percentage = response.data.percentage;
      let level = response.data.level;
      let predicted_action = response.data.predicted_action;

      // Determine color based on level
      let levelColor;
      let levelIcon;
      if (level === "Easy") {
        levelColor = "#28a745";
        levelIcon = "👍";
      } else if (level === "Medium") {
        levelColor = "#ffc107";
        levelIcon = "✊";
      } else if (level === "Hard") {
        levelColor = "#dc3545";
        levelIcon = "💪";
      }

      if (level === "No level" || level === "No detection") {
        Swal.fire({
          title: `අයියෝ!...`,
          html: `<b>Match Percentage:</b> ${percentage}% <br><b>Message:</b> ${message}`,
          icon: "error",
          showDenyButton: true,
          denyButtonText: "අපි තව වරක් උත්සාහ කරමු!",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
          timerProgressBar: true,
        });
      } else {

         if (randomCategory != predicted_action) {
          Swal.fire({
            icon: "error",
            title: "අයියෝ!...",
            text: `ඔයා කළ දේ, අපි බලාපොරොත්තු වූ දේට වෙනස් වගේ!`,
            footer: "අපි තව වරක් උත්සාහ කරමු!",
             });
          
          } else {
            Swal.fire({
              title: `ප්‍ර‍තිඵල!`,
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: levelColor,
              timerProgressBar: true,
              customClass: {
                popup: "level-popup",
                confirmButton: "level-confirm-button",
              },
            });
          }
                     
                   
        
      }
      setVideoBlob(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Failed to process video.");
      Swal.fire({
        title: "වැරද්දක් වෙලා!",
        text: "වීඩියෝව සැකසීමට අසමත් වුනා. අපි තව වරක් උත්සාහ කරමු!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const calculateCategoryCounts = (predictionsList) => {
    return predictionsList.reduce((acc, item) => {
      acc[item.prediction] = (acc[item.prediction] || 0) + 1;
      return acc;
    }, {});
  };

  const startRecording = async () => {
    if (!cameraStream) {
      Swal.fire(
        "වැරද්දක් වෙලා!",
        "කැමරාව ලබාගත නොහැකිය! කරුණාකර ඔබේ වෙබ්කැමරා සැකසුම් පරීක්ෂා කරන්න",
        "error"
      );
      return;
    }

    setCountdown(5);
    setUploadStatus(`වීඩියෝ එක තත්පර 5න් පටන් ගනී...`);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        const newCount = prev - 1;
        if (newCount > 0) {
          setUploadStatus(`වීඩියෝ පටන් ගන්නේ තත්පර ${newCount}...`);
          return newCount;
        } else {
          clearInterval(countdownInterval);
          startActualRecording();
          return 0;
        }
      });
    }, 1000);
  };

  const startActualRecording = () => {
    setRecording(true);
    setVideoBlob(null);
    setUploadStatus("රෙකෝඩ් වෙමින් ...");

    try {
      mediaRecorderRef.current = new MediaRecorder(cameraStream, {
        mimeType: "video/webm",
      });
      let recordedChunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        setVideoBlob(blob);
        setSelectedFile(blob);
        setUploadStatus("රෙකෝඩ් වීම අවසන්! සැකසීමට යවමු.");
      };

      mediaRecorderRef.current.start(80);

      setTimeout(() => {
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state !== "inactive"
        ) {
          mediaRecorderRef.current.stop();
          setRecording(false);
          setDisplayRecord(false);
        }
      }, 8000);
    } catch (error) {
      console.error("Failed to start recording:", error);
      Swal.fire("වැරද්දක් වෙලා!", "රෙකෝඩ් කිරීමට අසමත් විය. අපි තව වරක් උත්සාහ කරමු!.", "error");
      setUploadStatus("");
      setRecording(false);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      setRecording(false);
      setDisplayRecord(false);
      mediaRecorderRef.current.stop();
    }
  };

  const startRecordingVideo = () => {
    setDisplayRecord(true);
    setplaye(false)
    setVideoBlob(null);
    setPredictions([]);
    setUploadStatus("");
  };

  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "100%", // Adjusted to full width on small screens
    maxWidth: "1000px", // Max width to 1000px
    transform: "translate(-50%, -50%)",
    padding: "20px", // Reduced padding for smaller screens
    zIndex: 1000,
  };

  const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .7)",
    zIndex: 1000,
  };

  return (
    <div
      // style={{ padding: "20px" }}
      className="
      bg-cover bg-no-repeat bg-center w-ful
      justify-center items-center text-center p-6"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
      }}
    >
      <div className="bg-white py-16 px-8 shadow-2xl rounded-xl">
        <div className="flex flex-row justify-center gap-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
               ඔයාගේ මට්ටම - {difficultyLevel} Level 🎯
            </h1>

            <button
              onClick={handleRandomCategory}
              className="mt-4 px-6 py-3 bg-yellow-400 text-white font-bold rounded-full shadow-md hover:bg-yellow-500 transition-all duration-300"
            >
              ක්‍රියාවක් ලබාගනිමු 🎲
            </button>

            {randomCategory && categoryVideos[randomCategory] && (
              <div className="mt-5">
                <h3 className="text-xl font-semibold text-blue-600">
                  📺 වීඩියෝ එකේ පෙන්වන විදියට කරමු: {randomCategory}
                </h3>
                <video
                  src={categoryVideos[randomCategory]}
                  controls
                  className="w-full max-w-lg rounded-lg shadow-md mt-3"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-4 mt-2 p-5 bg-blue-50 rounded-xl shadow-lg">
            <label className="cursor-pointer bg-yellow-400 text-white font-bold px-5 py-3 rounded-full shadow-md hover:bg-yellow-500 transition-all duration-300 ease-in-out">
              වීඩියෝ එකක් තෝරලා බලමු! 📂
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
           {selectedFile && (
            <div className="mt-10 flex flex-col items-center">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">
                ඔයා රෙකෝඩ් කරපු දේ 🎬 
              </h3>
              <video
                src={URL.createObjectURL(selectedFile)}
                controls
                className="w-full max-w-md rounded-3xl shadow-md"
              />
              <button
                onClick={() => handleFileUpload(selectedFile)}
                className="mt-6 bg-purple-500 text-white px-8 py-3 rounded-full shadow-md hover:bg-purple-700 transition-all"
              >
                 වීඩියෝ එක දාමු ⬆️
              </button>
            </div>
          )}
            <p className="text-blue-600 font-semibold">{uploadStatus}</p>
          </div>

          <div className="flex flex-col items-center bg-gradient-to-b from-blue-100 to-white p-6 rounded-xl shadow-lg">
            <h6 className="text-xl font-extrabold text-blue-600 mb-4">
              ලයිව් කැමරාවට 🎥
            </h6>

            <div className="w-full flex flex-col items-center">
              {displayRecord ? (
                <>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    onUserMedia={(stream) => setCameraStream(stream)}
                    mirrored={true}
                    className="w-full max-w-md rounded-xl border-4 border-blue-400 shadow-md"
                  />
                  <div className="mt-4">
                    {recording ? (
                      <div>
                        <button
                          onClick={stopRecording}
                          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-all"
                        >
                          රෙකෝඩ් වීම නවත්වන්න ⏹️
                        </button>
                        <p className="text-blue-600 font-semibold mt-2">
                          {uploadStatus}
                        </p>
                      </div>
                    ) : countdown > 0 ? (
                      <div>
                        <button
                          disabled
                          className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md cursor-not-allowed"
                        >
                          පටන් ගැනීමට තප්පර {countdown}...
                        </button>
                        <p className="text-blue-600 font-semibold mt-2">
                          {uploadStatus}
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={startRecording}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all"
                      >
                        රෙකෝඩ් කිරීම ආරම්භ කරමු  ⏺️
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center mt-9">
                    <button
                      onClick={startRecordingVideo}
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                    >
                      රෙකෝඩ් කිරීම ආරම්භ කරමු  ⏺️
                    </button>
                  </div>
                </>
              )}
            </div>

            {videoBlob && (
              <div className="mt-6 w-full max-w-md">
                <h3 className="text-2xl font-semibold text-blue-600">
                  ඔයා රෙකෝඩ් කරපු දේ 🎬
                </h3>
                <video
                  src={URL.createObjectURL(videoBlob)}
                  controls
                  className="w-full rounded-xl shadow-md mt-3"
                />
                <button
                  onClick={() => handleFileUpload(videoBlob)}
                  className="mt-4 bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-all"
                >
                  රෙකෝඩ් කරපු වීඩියෝ එක දාමු ⬆️
                </button>
              </div>
            )}

            

          </div>
        </div>
      </div>
    </div>
  );
}

export default NextTaskPage;
