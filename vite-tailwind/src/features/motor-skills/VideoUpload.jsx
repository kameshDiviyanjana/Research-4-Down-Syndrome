import React, { useState ,useRef} from "react";
import bush from "../../assets/bush-clipart-animated-6.png";
import sun from "../../assets/source.gif";
import StartingPage from "../vocabulary/utile/StartingPage";
import bg1 from "../../../public/images/bg3.jpg";

function VideoUpload() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [satart, setstart] = useState(true);
  const [randomCategory, setRandomCategory] = useState("");


  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedVideo(file);

      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
    } else {
      alert("Please select a valid video file.");
    }
  };
 const categoriesMap = {
   Easy: ["catch", "walk", "jump"],
   Medium: ["run", "throw"],
   Hard: ["dribble", "handstand", "kick_ball", "somersault"],
 };

 const categoryVideos = {
   catch: "/videos/catch.mp4",
   walk: "/videos/walk.mp4",
   jump: "/videos/jump.mp4",
   run: "/videos/run.mp4",
   throw: "/videos/throw.mp4",
   dribble: "/videos/dribble.mp4",
   handstand: "/videos/handstand.mp4",
   kick_ball: "/videos/kick_ball.mp4",
   somersault: "/videos/somersault.mp4",
 };
    const handleRandomCategory = () => {
      const randomIndex = Math.floor(Math.random() * categories.length);
      setRandomCategory(categories[randomIndex]);
    };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedVideo) {
      alert("No video selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedVideo);

    try {
      const response = await fetch("http://127.0.0.1:5002/video/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Video uploaded successfully!");
      } else {
        alert("Failed to upload video.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };
  
  const startPactices = () => {
    setstart(false);
  
  };
 const [compare, setcompare] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoURL, setRecordedVideoURL] = useState("");
  const videoRef = useRef(null); 
  const playbackRef = useRef(null); 
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      recordedChunks.current = [];
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedVideoURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing media devices.", error);
      alert("Unable to access your webcam.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    const tracks = videoRef.current?.srcObject?.getTracks();
    tracks?.forEach((track) => track.stop());
    setIsRecording(false);
    setcompare(true);
  };
  return (
    <div
      className="
      bg-cover bg-no-repeat bg-center w-ful
      justify-center items-center text-center p-6"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
        height: "900px",
      }}
    >
      <div className="video-upload">
        <div className=" flex justify-between">
          <div className="mb-0">
            <div>
              <img src={sun} alt="sun" className="h-48 max-lg:hidden" />
            </div>
            <div className="mt-80">
              <img src={bush} alt="bush" className="h-48 max-lg:hidden" />
            </div>
          </div>
          {satart ? (
            <StartingPage setstart={startPactices} />
          ) : (
            <div>
              <form onSubmit={handleFormSubmit}>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                />
                {videoPreview && (
                  <video
                    width="320"
                    height="240"
                    controls
                    src={videoPreview}
                  ></video>
                )}

                {videoPreview ? (
                  !isRecording ? (
                    <button
                      onClick={startRecording}
                      className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
                    >
                      Start Recording
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600"
                    >
                      Stop Recording
                    </button>
                  )
                ) : null}
              </form>
            </div>
          )}
          <div className="mb-0">
            {satart !== true && (
              <div className="video-recorder p-4">
                <h1 className="text-2xl font-semibold mb-4">
                  Live Video Recorder
                </h1>
                <div className="video-container mb-4 flex gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Live Feed:</h3>
                    <video
                      ref={videoRef}
                      width="320"
                      height="240"
                      className="rounded shadow-md"
                      muted
                    ></video>
                  </div>

                  {recordedVideoURL && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Recorded Playback:
                      </h3>
                      <video
                        ref={playbackRef}
                        width="320"
                        height="240"
                        controls
                        src={recordedVideoURL}
                        className="rounded shadow-md"
                      ></video>
                    </div>
                  )}
                </div>
                <div className="controls space-x-2">
                  {compare && <button type="submit">Upload Video</button>}
                </div>
              </div>
            )}
            <div className="mb-0  mt-44 ">
              <img src={bush} alt="bush" className="h-48 max-lg:hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoUpload;
