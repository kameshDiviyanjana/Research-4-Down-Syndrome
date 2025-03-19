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
    navigate("/next-task", { state: { difficultyLevel } });
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

      // Calculate match percentage
      const matchPercentage = calculateMatchPercentage(receivedPredictions);
      const level = getDifficultyLevel(matchPercentage);
      setDifficultyLevel(level);

      Swal.fire({
        title: `Results Processed!`,
        html: `<b>Match Percentage:</b> ${matchPercentage}% <br> <b>Difficulty Level:</b> ${level}`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        // timer: 5000,
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
      className="bg-[url(https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg)] bg-cover bg-no-repeat bg-center h-[700px] w-full overflow-y-auto "
    >
      {radamselect && (
        <>
          <h1 className="text-9xl font-bold  font-fontstle2 mb-4 text-center  mt-36">
            Playe The Game
          </h1>
          {/* <p>
        Randomly Mentioned Category:{" "}
        <strong>{randomCategory || "None selected yet"}</strong>
      </p> */}

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
      <div className="  flex flex-row justify-center gap-8">
        <div>
          {randomCategory && (
            <div style={{ marginTop: "20px" }}>
              <h3 className="text-4xl font-bold   mb-4 text-center  ">
                Start Learing: {randomCategory}
              </h3>
              <video
                src={categoryVideos[randomCategory]}
                controls
                // style={{
                //   width: "100%",
                //   maxWidth: "600px",
                //   borderRadius: "10px",
                //   marginTop: "10px",
                // }}
                className="w-full max-w-3xl rounded-xl mt-4"
              />
            </div>
          )}
        </div>
        <div>
          {randomCategory && (
            <div style={{ marginTop: "20px" }}>
              <h2>Live Camera Preview & Recording</h2>
              <div>
                {Playe && displayrecode ? (
                  <>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      onUserMedia={(stream) => setCameraStream(stream)}
                      mirrored={true}
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        borderRadius: "10px",
                        backgroundColor: "black",
                      }}
                    />
                    <div>
                      {recording ? (
                        <div>
                          <button
                            onClick={stopRecording}
                            style={{
                              marginTop: "10px",
                              padding: "10px",
                              backgroundColor: "red",
                              color: "white",
                            }}
                          >
                            Stop Recording ⏹️
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={startRecording}
                          style={{
                            marginTop: "10px",
                            padding: "10px",
                            backgroundColor: "green",
                            color: "white",
                          }}
                        >
                          Start Recording ⏺️
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={startrecodevedio}
                      style={{
                        marginTop: "10px",
                        padding: "10px",
                        backgroundColor: "green",
                        color: "white",
                      }}
                    >
                      Start
                    </button>
                  </>
                )}
              </div>

              {videoBlob ? (
                <div>
                  <h3>Recorded Video:</h3>
                  <video
                    src={URL.createObjectURL(videoBlob)}
                    controls
                    style={{ width: "100%", maxWidth: "600px" }}
                  />
                  <button
                    onClick={() => handleFileUpload(videoBlob)}
                    style={{ marginTop: "10px" }}
                  >
                    Upload Recorded Video
                  </button>
                </div>
              ) : (
                <>
                  {predictions.length > 0 && (
                    <div className="mt-5">
                      <h2 className="text-2xl font-bold mb-4">
                        Predictions Summary
                      </h2>
                      <table className="w-full mt-3 border-collapse shadow-md">
                        <thead>
                          <tr className="bg-gray-100 text-gray-700 font-bold text-left">
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
                                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } border-b border-gray-200`}
                              >
                                <td className="p-3">{category}</td>
                                <td className="p-3">{count}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>

                      <div className=" flex justify-center">
                        <button
                          onClick={handleRandomCategory}
                          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all mb-6 w-[400px] mt-10"
                          style={{ marginBottom: "10px" }}
                        >
                          Generate Random Category
                        </button>
                      </div>
                      {/* <button
                        onClick={handleNextTask}
                        className="mt-5 px-6 py-3 text-lg text-white bg-green-500 rounded-md hover:bg-green-600"
                      >
                        Go to Next Task
                      </button> */}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <br />
      {/* <input type="file" accept="video/*" onChange={handleFileChange} />
      <button
        onClick={() => handleFileUpload(selectedFile)}
        style={{ marginLeft: "10px" }}
      >
        Upload and Process Video
      </button>
      <p>{uploadStatus}</p> */}
      {/* Camera Recording Section */}

      {/* {predictions.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Predictions Summary</h2>
          <table border="1" style={{ width: "100%", marginTop: "10px" }}>
            <thead>
              <tr>
                <th>Category</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(categoryCounts).map(
                ([category, count], index) => (
                  <tr key={index}>
                    <td>{category}</td>
                    <td>{count}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <button
            onClick={handleNextTask}
            style={{ marginTop: "10px", padding: "10px", fontSize: "16px" }}
          >
            Go to Next Task
          </button>
        </div>
      )} */}
    </div>
  );
}

export default SystemPage;
