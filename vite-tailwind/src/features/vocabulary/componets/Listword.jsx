import React, { useState, useEffect } from "react";
import bush from "../../../assets/bush-clipart-animated-6.png";
import sun from "../../../assets/source.gif";
import { AllAddWord } from "../../../Api/vocabularyApi";
import StartingPage from "../utile/StartingPage";

function Listword() {
  const [pagecount, setPagecount] = useState(1);
  const userme = localStorage.getItem("userid");
  const [completed, setCompleted] = useState(false);
  const [satart, setstart] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [result, setResult] = useState("");
  const [recordings, setRecordings] = useState([]); // List to store recordings
  // Fetching words data
  const {
    data: getallword,
    isLoading,
    error,
  } = AllAddWord(pagecount, 1, userme);

  // Text-to-speech function
  const spechword = (textword) => {
    const word = new SpeechSynthesisUtterance(textword);
    window.speechSynthesis.speak(word);
  };

  // Pagination Handlers
  // const nextWord = () => {
  //   setPagecount((prev) => getallword?.data?.totalCount >prev && prev + 1);
  // };
  const nextWord = () => {
    setPagecount((prev) => {
      // Ensure the next page doesn't exceed the total count of pages
      if (prev < getallword?.data?.totalPages) {
        return prev + 1;
      } else {
        setCompleted;
      }
      return prev; // Return the same page count if it's already the last page
    });
  };

  const prevWord = () => {
    setPagecount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Loader and error handling
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading words! Please try again later.</div>;
  }

  const startPactices = () => {
    setstart(false);
    startRecording()
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    let chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(blob);

      // Add the new recording to the list
      setRecordings((prevRecordings) => [
        ...prevRecordings,
        { blob, audioUrl, name: `Recording-${Date.now()}` },
      ]);

      chunks = [];
    };

    setMediaRecorder(recorder);
    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const analyzeAudio = async (recording) => {
    const formData = new FormData();
    formData.append("audio", recording.blob, `${recording.name}.webm`);

    try {
      // Send audio to the backend for analysis
      const response = await axios.post("", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data.result);
    } catch (error) {
      console.error("Error analyzing audio:", error);
    }
  };

  const deleteRecording = (index) => {
    setRecordings((prevRecordings) =>
      prevRecordings.filter((_, i) => i !== index)
    );
  };

  

  return (
    <div className="bg-[url(https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg)] bg-cover bg-no-repeat bg-center lg:h-[700px] w-full">
      <div className="py-10 px-11">
        <div className="flex justify-between">
          {/* Left Images */}
          <div className="mb-0">
            <div>
              <img src={sun} alt="sun" className="h-48 max-lg:hidden" />
            </div>
            <div className="mt-80">
              <img src={bush} alt="bush" className="h-48 max-lg:hidden" />
            </div>
          </div>

          {/* Word Cards */}

          {satart ? (
            <StartingPage setstart={startPactices} />
          ) : (
            <div className=" lg:flex justify-between w-full">
              <div>
                <button onClick={prevWord} className=" max-lg:hidden">
                  Previous
                </button>
              </div>
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
              <div>
                {completed ? (
                  <button className=" max-lg:hidden">Complet</button>
                ) : (
                  <button onClick={nextWord} className=" max-lg:hidden">
                    Next
                  </button>
                )}
              </div>
              <div className=" hidden max-lg:block">
                <button onClick={nextWord} className="  bg-orange-400  ">
                  Next
                </button>
                <button onClick={prevWord} className=" ">
                  Previous
                </button>
              </div>
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
