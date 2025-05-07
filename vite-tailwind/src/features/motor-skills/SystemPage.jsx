import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useRef, useEffect } from "react";
function SystemPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [randomCategory, setRandomCategory] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [Playe, setplaye] = useState(false);
  const [radamselect, setradamselect] = useState(true);
  const [displayrecode, setdisplayrecode] = useState(true);
  const categories = ["catch", "walk", "jump"];
  const categoryVideos = {
    catch: "/videos/catch.mp4",
    walk: "/videos/walk.mp4",
    jump: "/videos/jump.mp4",
  };

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
  };

  const handleNextTask = () => {
    navigate("/grossmotor/next-task", { state: { difficultyLevel } });
  };

  const handleRandomCategory = () => {
    const randomIndex = Math.floor(Math.random() * categories.length);
    setRandomCategory(categories[randomIndex]);
    setPredictions([]);
    setradamselect(false);
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      Swal.fire(
        "Warning!",
        "Please select or record a video first!",
        "warning"
      );
      return;
    }

    if (!randomCategory) {
      Swal.fire(
        "Warning!",
        "Please generate a random category first!",
        "warning"
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadStatus("Uploading and processing...");
      const response = await axios.post(
        "http://127.0.0.1:5000/video/upload",
        formData
      );

      const { predictions: receivedPredictions, video_url } = response.data;
      setPredictions(receivedPredictions);
      setVideoURL(video_url);
      setUploadStatus("Processing complete!");

      const matchPercentage = calculateMatchPercentage(receivedPredictions);
      const level = getDifficultyLevel(matchPercentage);
      setDifficultyLevel(level);

      Swal.fire({
        title: `Results Processed!`,
        html: `<b>Match Percentage:</b> ${matchPercentage}% <br> <b>Difficulty Level:</b> ${level}`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        timerProgressBar: true,
      });
      setVideoBlob(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Failed to process video.");
      Swal.fire("Error!", "Failed to process video.", "error");
    }
  };

  const calculateMatchPercentage = (predictionsList) => {
    if (predictionsList.length === 0) return 0;
    const matchCount = predictionsList.filter(
      (item) => item.prediction === randomCategory
    ).length;
    return ((matchCount / predictionsList.length) * 100).toFixed(2);
  };

  const getDifficultyLevel = (percentage) => {
    if (percentage <= 50) {
      return "Easy";
    } else if (percentage <= 80) {
      return "Medium";
    } else {
      return "Hard";
    }
  };

  const calculateCategoryCounts = () => {
    return predictions.reduce((acc, item) => {
      acc[item.prediction] = (acc[item.prediction] || 0) + 1;
      return acc;
    }, {});
  };

  const startRecording = async () => {
    if (!cameraStream) {
      Swal.fire(
        "Error!",
        "Camera is not available! Please check your webcam settings.",
        "error"
      );
      return;
    }

    setRecording(true);
    setVideoBlob(null);

    try {
      mediaRecorderRef.current = new MediaRecorder(cameraStream);
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
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Failed to start recording:", error);
      Swal.fire("Error!", "Failed to start recording. Try again.", "error");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      setRecording(false);
      setdisplayrecode(false);
      mediaRecorderRef.current.stop();
    }
  };
  const startrecodevedio = () => {
    setplaye(true);
    setdisplayrecode(true);
    setVideoBlob(null);
    setPredictions([]);
  };
  const categoryCounts = calculateCategoryCounts();

  return (
    <div
      style={{ padding: "20px" }}
      className="bg-[url(https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg)] bg-cover bg-no-repeat bg-center h-[700px] w-full overflow-y-auto   "
    >
      {radamselect && (
        <>
          <h1 className="text-9xl font-bold  font-fontstle2 mb-4 text-center  mt-36">
            Playe The Game
          </h1>

          <div className=" flex justify-center">
            <button
              onClick={handleRandomCategory}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all mb-6 w-[400px] mt-10"
              style={{ marginBottom: "10px" }}
            >
              Generate Random Category
            </button>
          </div>
        </>
      )}
      <div
        className={`${
          randomCategory && "bg-white py-16 px-8  shadow-2xl  rounded-xl"
        }`}
      >
        <div className="  flex flex-row justify-center gap-8 ">
          <div>
            {randomCategory && (
              <div className="flex flex-col items-center mt-6">
                <h3 className="text-4xl font-extrabold text-pink-500 mb-4 animate-bounce">
                  Start Learning: {randomCategory}
                </h3>
                <div className="relative">
                  <video
                    src={categoryVideos[randomCategory]}
                    controls
                    className="w-full max-w-3xl rounded-3xl shadow-lg border-4 border-blue-400 hover:border-yellow-400 transition-all duration-500"
                  />
                  
                  <div className="absolute top-0 left-0 w-full h-full animate-pulse"></div>
                </div>
              </div>

              
            )}
          </div>
          <div>
            {randomCategory && (
              <div className="flex flex-col items-center mt-6 bg-gradient-to-b from-blue-100 to-white p-6 rounded-xl shadow-lg">
                <h2 className="text-4xl font-extrabold text-blue-600 mb-4">
                  Live Camera Preview & Recording 🎥
                </h2>

                <div className="w-full flex flex-col items-center">
                  {Playe && displayrecode ? (
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
                          <button
                            onClick={stopRecording}
                            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-all"
                          >
                            Stop Recording ⏹️
                          </button>
                        ) : (
                          <button
                            onClick={startRecording}
                            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all"
                          >
                            Start Recording ⏺️
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div >
                        <div className="flex flex-col items-center gap-4 mt-5 p-5 bg-blue-50 rounded-xl shadow-lg">
                          <label className="cursor-pointer bg-yellow-400 text-white font-bold px-5 py-3 rounded-full shadow-md hover:bg-yellow-500 transition-all duration-300 ease-in-out">
                            📂 Select Video
                            <input
                              type="file"
                              accept="video/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>

                          <button
                            onClick={() => handleFileUpload(selectedFile)}
                            className="bg-green-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                          >
                            🚀 Upload & Process Video 🎬
                          </button>

                          <p className="text-blue-600 font-semibold">
                            {uploadStatus}
                          </p>
                        </div>
                        <div className="  flex justify-center mt-9">
                          <button
                            onClick={startrecodevedio}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                          >
                            Start recode🚀
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {videoBlob ? (
                  <div className="mt-6 w-full max-w-md">
                    <h3 className="text-2xl font-semibold text-blue-600">
                      Recorded Video 🎬
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
                      Upload Recorded Video ⏫
                    </button>
                  </div>
                ) : (
                  <>
                    {predictions.length > 0 && (
                      <div className="mt-6 w-full">
                        <h2 className="text-2xl font-bold text-blue-700 mb-4">
                          Predictions Summary 📊
                        </h2>
                        <table className="w-full border-collapse shadow-md bg-white rounded-lg overflow-hidden">
                          <thead className="bg-blue-200 text-blue-900">
                            <tr>
                              <th className="p-3">Category</th>
                              <th className="p-3">Count</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(categoryCounts).map(
                              ([category, count], index) => (
                                <tr
                                  key={index}
                                  className={`${
                                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                  } text-center border-b border-gray-200`}
                                >
                                  <td className="p-3">{category}</td>
                                  <td className="p-3">{count}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>

                        <div className="flex justify-center mt-6">
                          <button
                            onClick={handleRandomCategory}
                            className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition-all"
                          >
                            Generate Random Category 🎲
                          </button>
                          
                          <button
                            onClick={handleNextTask}
                            className="mt-4 px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg hover:from-orange-500 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
                          >
                            🚀 Go to Next Task 🎉
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              
            )}
          </div>
        </div>
      </div>
      <br />

    </div>
  );
}

export default SystemPage;
