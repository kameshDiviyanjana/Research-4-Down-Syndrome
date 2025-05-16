import { useState, useRef, useEffect } from "react";
import { AddSpeechResults } from "../../../Api/vocabularyApi";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { encodeWAV } from "./wavEncoder";
import Swal from "sweetalert2";

// Function to pronounce the letter using Web Speech API
const speakWord = (text) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US"; // Set language
  utterance.rate = 0.8; // Speed (0.5 - 1 is ideal for kids)
  synth.speak(utterance);
};

const AlphabetLearning = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [spokenWord, setSpokenWord] = useState("");
  const [answerStatus, setAnswerStatus] = useState(""); // Track correctness
  const [audioBlob, setAudioBlob] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [marks, setmarks] = useState(0);
  const addspeechMutation = AddSpeechResults(); // This is the hook that triggers the mutation
  const [loads, setloads] = useState(false);
  const [recording, setRecording] = useState(false);
  const imageUrls = [
    {
      image:
        "https://thafd.bing.com/th/id/OIP.D_EbJnv6-dkqt1vEPvOHfAHaHa?rs=1&pid=ImgDetMain",
      word: "Apple",
    },
    {
      image:
        "https://thafd.bing.com/th/id/OIP.RbWGMw9CXJ0FbgutNcD2lAHaE-?rs=1&pid=ImgDetMain",
      word: "Apple",
    },
    {
      image:
        "https://thafd.bing.com/th/id/OIP.YwA6xGkFItqFcdN8eHm-aAHaHZ?rs=1&pid=ImgDetMain",
      word: "Apple",
    },
    {
      image:
        "https://cdn11.bigcommerce.com/s-pwhmqwfxog/product_images/uploaded_images/understanding-your-dog-s-body-language-1.jpg",
      word: "Apple",
    },
    {
      image:
        "https://th.bing.com/th/id/R.dbf9746c8e8f8fea5a9b7c51aeffb418?rik=7oWDTGumjgaVIg&riu=http%3a%2f%2fcdn.bgr.com%2f2015%2f06%2fegg.jpg&ehk=3r4QD35YynYXcVvp9FXwuZOR8LxgZJTeVYO2kG4xnrw%3d&risl=&pid=ImgRaw&r=0",
      word: "Apple",
    },
    {
      image:
        "https://thafd.bing.com/th/id/OIP.6ZIoKCZUEJT6TVcO5g-c2wHaHZ?rs=1&pid=ImgDetMain",
      word: "Apple",
    },

    // ... more images
  ];
  //  const [recording, setRecording] = useState(false);
  //  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null); // State to store the downloadable audio URL
  const [taskCompleted, setTaskCompleted] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const userme = localStorage.getItem("userid");
  //  const [prediction, setPrediction] = useState(null);
  //  const [marks, setmarks] = useState(0);
  //  const addspeechMutation = AddSpeechResults(); // This is the hook that triggers the mutation
  const userid = localStorage.getItem("userid"); // Get user ID from localStorage
  const { word } = useParams();
  const location = useLocation(); // Get the state
  const isActive = location.state?.isActive || false;
  //  const [message, setMessage] = useState("");
  const [restartpactices, setrestartpactices] = useState(false);
  const [finshed, setfinished] = useState(false);
  const [stop, setStop] = useState(false);
  const [satart, setstaret] = useState(true);
  //   const { data: getallword, isLoading, error } = findword(id);
  const [clarifyResults, setclarifyResults] = useState(true);
  //  const [loads, setloads] = useState(false);
  const [calculateWrog, setcalculateWrog] = useState(0);
  const [traingword, settraingword] = useState(false);
  // Speech Recognition to listen to user's input
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessage("⚠️ Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onstart = () => {
      setMessage("🎤 Listening...");
    };

    recognition.onresult = (event) => {
      const spokenLetter = event.results[0][0].transcript
        .toUpperCase()
        .trim()
        .replace(".", ""); // Clean input

      setSpokenWord(spokenLetter);
      console.log("Heard:", spokenLetter);

      // Check if the spoken letter matches the displayed letter
      if (spokenLetter === alphabet[currentIndex]) {
        setMessage(`✅ Correct! You said ${spokenLetter}.`);
        speakWord(` well done! You said ${spokenLetter}.`);
        setAnswerStatus("correct"); // Set to correct
      } else {
        setMessage(`❌ Wrong! You said ${spokenLetter}. Try again.`);
        setcalculateWrog((prev) => prev + 1);
        if (calculateWrog > 2) {
          settraingword(true);

          speakWord(
            `Oops! That wasn't quite right. Let's listen to the word sound again and try together. you can seen picter of the word. The letter sound is: ${alphabet[currentIndex]}, ${alphabet[currentIndex]}, ${alphabet[currentIndex]}. You can do it!`
          );
        } else {
          speakWord(
            `Oops! You spell Wrong. you said ${spokenLetter} .Let's try again together. The letter sound is: ${alphabet[currentIndex]}, ${alphabet[currentIndex]}, ${alphabet[currentIndex]}. You can do it!`
          );
        }

        setAnswerStatus("incorrect"); // Set to incorrect
      }
    };
  };
  console.log("calculateWrog", calculateWrog);
  // Move to the next letter or reset to 'A'
  const handleNextLetter = () => {
    setAnswerStatus(""); // Reset the answer status before moving to next letter
    setCurrentIndex((prevIndex) =>
      prevIndex < alphabet.length - 1 ? prevIndex + 1 : 0
    );
    setSpokenWord("");
  };

  // Determine the background color based on the answer status
  const getLetterBackgroundColor = () => {
    if (answerStatus === "correct") return "bg-green-500";
    if (answerStatus === "incorrect") return "bg-red-500";
    return "bg-blue-600"; // Default blue for initial state
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
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
        setAudioUrl(URL.createObjectURL(audioBlob)); // Save the URL for playback
        try {
          const wavBlob = await convertToWav(audioBlob);
          console.log("WAV conversion completed, size:", wavBlob.size);
          setAudioBlob(wavBlob); // Make sure this is correctly set
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

  // const startRecording = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //     });
  //     mediaRecorderRef.current = new MediaRecorder(stream, {
  //       mimeType: "audio/webm",
  //     });

  //     audioChunksRef.current = [];

  //     mediaRecorderRef.current.ondataavailable = (event) => {
  //       console.log("Data available, size:", event.data.size);
  //       if (event.data.size > 0) {
  //         audioChunksRef.current.push(event.data);
  //       }
  //     };

  //     mediaRecorderRef.current.onstop = async () => {
  //       console.log("Recording stopped, processing audio...");
  //       const audioBlob = new Blob(audioChunksRef.current, {
  //         type: "audio/webm",
  //       });
  //       setAudioURL(URL.createObjectURL(audioBlob));
  //       try {
  //         const wavBlob = await convertToWav(audioBlob);
  //         console.log("WAV conversion completed, size:", wavBlob.size);
  //         setAudioBlob(wavBlob);
  //       } catch (error) {
  //         console.error("Error converting to WAV:", error);
  //       }
  //     };

  //     mediaRecorderRef.current.start();
  //     setRecording(true);
  //   } catch (error) {
  //     console.error("Error accessing microphone:", error);
  //   }
  // };

  // ⏹ Stop Recording
//   const stopRecording = () => {
//     setfinished(true);
//     if (mediaRecorderRef.current && recording) {
//       setTimeout(() => {
//         mediaRecorderRef.current.stop();
//         mediaRecorderRef.current.stream
//           .getTracks()
//           .forEach((track) => track.stop());
//         setRecording(false);
//         console.log("Recording stopped successfully.");
//         const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" }); // Blob from recorded data
//         convertToWav(audioBlob);

// if (audioBlob) {
//   uploadAudio(); // Upload the audio after stopping
// }
//       }, 500); // ⏳ Delay ensures all data is processed
//     }
//   };

const stopRecording = () => {
  setfinished(true);
  if (mediaRecorderRef.current && recording) {
    setTimeout(() => {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setRecording(false);
      console.log("Recording stopped successfully.");

      const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" }); // Blob from recorded data
      convertToWav(audioBlob);

      if (audioBlob) {
        setAudioBlob(audioBlob); // ✅ Save the blob into state
      }
    }, 500); // ⏳ Delay ensures all data is processed
  }
};

useEffect(() => {
  if (audioBlob) {
    uploadAudio();
  }
}, [audioBlob]);


  const [hasSpoken, setHasSpoken] = useState(false);

  useEffect(() => {
    if (!hasSpoken) {
      help();
    }
    setHasSpoken(true);
  }, []);
  // 🎵 Convert Audio to WAV
  // const convertToWav = async (blob) => {
  //   const arrayBuffer = await blob.arrayBuffer();
  //   const audioBuffer = await new AudioContext().decodeAudioData(arrayBuffer);

  //   return encodeWAV(audioBuffer);
  // };
  const convertToWav = async (blob) => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const audioBuffer = await new AudioContext().decodeAudioData(arrayBuffer);

      return encodeWAV(audioBuffer); // Ensure this method is working
    } catch (error) {
      console.error("Error converting to WAV:", error);
      throw error;
    }
  };

  const LeaingCaneter = () => {
    navigate("/vocabulary/stage-two");
  };

  const uploadAudio = async () => {
    if (!audioBlob) {
      console.error("❌ No audio blob available!");
      return;
    }

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");
    setclarifyResults(false);

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

      // Show SweetAlert2 with dynamic result content
       Swal.fire({
         title: "Results Processed!",
         html: `
        <b>Cluster:</b> ${response?.data?.cluster ?? "N/A"} <br>
        <b>Confidence:</b> ${response?.data?.confidence ?? "N/A"}% <br>
      `,
         icon: "success",
         confirmButtonText: "OK",
         confirmButtonColor: "#28a745",
         timerProgressBar: true,
       });


      setTaskCompleted(true);
      await addresulis(response.data);
      console.log("✅ Upload success:", response.data);
      setloads(true);
    } catch (error) {
      console.error("❌ Error uploading file:", error);
    }
  };
 const ii = ()=>{
  console.log("🚀 ~ file: Alphabet -learing.jsx:232 ~ ii ~ ii:", audioBlob)
     Swal.fire({
       title: "Results Processed!",
       html: `
        <b>Cluster:</b> <br>
        <b>Confidence:</b>  <br>
      `,
       icon: "success",
       confirmButtonText: "OK",
       confirmButtonColor: "#28a745",
       timerProgressBar: true,
     });
 }
  // const uploadAudio = async () => {
  //   if (!audioBlob) {
  //     console.error("❌ No audio blob available!");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", audioBlob, "audio.wav");
  //   setclarifyResults(false);

  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:5000/audio/predict",
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );
  //     setPrediction(response.data);
  //     setmarks(response.data.confidence);

  //    Swal.fire({
  //      title: `Results Processed!`,
  //      html: `
  //       <b>Cluster:</b> ${response.data.cluster} <br>
  //       <b>Confidence:</b> ${response.data.confidence}% <br>
  //     `,
  //      icon: "success",
  //      confirmButtonText: "OK",
  //      confirmButtonColor: levelColor,
  //      timerProgressBar: true,
  //      customClass: {
  //        popup: "level-popup",
  //        confirmButton: "level-confirm-button",
  //      },
  //    });

  //     setTaskCompleted(true);
  //     await addresulis(response.data);
  //     console.log("✅ Upload success:", response.data);
  //     setloads(true);
  //     setAudioBlob(null); // Clear the audio blob after upload
  //   } catch (error) {
  //     console.error("❌ Error uploading file:", error);
  //   }
  // };

  // // 📤 Upload Audio File
  // const uploadAudio = async () => {
  //   const formData = new FormData();
  //   formData.append("file", audioBlob, "audio.wav");
  //   setclarifyResults(false);
  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:5000/audio/predict",
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );
  //     setPrediction(response.data);
  //     setmarks(response.data.confidence);
  //     setTaskCompleted(true);
  //     await addresulis(response.data);
  //     console.log("✅ Upload success:", response.data);
  //     setloads(true);
  //   } catch (error) {
  //     console.error("❌ Error uploading file:", error);
  //   }
  // };
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
    addspeechMutation.mutate(response);
  };

  const help = () => {
    speakWord(
      "Welcome to the Alphabet Learning Center! Let's start with the letter. If you need help, click on the letter to hear it again."
    );
    // speakWord(
    //   "This is the letter A. A is for apple. Let's say it louder!"
    // );
  };

  return (
    <div
      className="bg-[url('https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg')] 
                 bg-cover bg-no-repeat bg-center w-full h-screen flex flex-col 
                 items-center justify-center text-center p-6"
    >
      {/* Display Letter with Dynamic Background */}
      <div className=" flex flex-row gap-3">
        {traingword ? (
          <div>
            <img
              src={imageUrls[currentIndex].image}
              alt="dog"
              className="h-[300px] w-[300px] rounded-full"
              onClick={() =>
                speakWord(
                  ` this is ${alphabet[currentIndex]} for ${imageUrls[currentIndex].word} , let say louder`
                )
              }
            />
            <h1 className="text-5xl font-bold text-pink-500 px-6 py-3 rounded-2xl font-[Comic_Sans_MS]">
              <span className="text-9xl text-red-600">
                {imageUrls[currentIndex].word.charAt(0).toUpperCase()}
              </span>
              {imageUrls[currentIndex].word.slice(1)}
            </h1>
          </div>
        ) : (
          <>
            <div
              className={`text-9xl font-extrabold text-white px-12 py-8 
                   h-[250px] w-[250px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px] 
                   rounded-3xl shadow-lg border-4 border-white animate-bounce flex 
                   items-center justify-center bg-blue-600 `}
              onClick={() => speakWord(alphabet[currentIndex])} // Speak when clicked
            >
              {alphabet[currentIndex]}
            </div>

            <div
              className={`text-9xl font-extrabold text-white px-12 py-8 
             h-[250px] w-[250px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px] 
             rounded-3xl shadow-lg border-4 border-white animate-bounce flex 
             items-center justify-center flex-col ${getLetterBackgroundColor()}`} // Ensured flex-col for vertical layout
            >
              {/* Heading for the letter */}
              <h1 className="text-4xl font-bold text-white mb-6">
                Spoke Letter
              </h1>

              {/* Display Spoken Letter with Dynamic Background */}
              <div className="text-7xl font-extrabold">{spokenWord}</div>
            </div>
          </>
        )}
      </div>

      {/* Message Display */}
      <p className="mt-4 text-2xl font-semibold text-white">{message}</p>

      {/* Button to Show Next Letter */}
      <button
        onClick={handleNextLetter}
        className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white 
                   font-bold text-2xl px-8 py-4 rounded-full shadow-xl 
                   hover:scale-105 active:scale-95 transition-all duration-300 border-4 border-white"
      >
        🎵 Next Letter ➡️
      </button>

      {/* Button for Voice Input */}
      <button
        onClick={() => {
          handleVoiceInput();
          startRecording();
        }}
        className="mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white 
                   font-bold text-2xl px-8 py-4 rounded-full shadow-xl 
                   hover:scale-105 active:scale-95 transition-all duration-300 border-4 border-white"
      >
        🎤 Listen to Me
      </button>

      <div className=" flex">
        {/* <button
          onClick={stopRecording}
          className="mt-8 bg-gradient-to-r  from-pink-500 to-orange-500 text-white 
                   font-bold text-2xl px-8 py-4 rounded-full shadow-xl 
                   hover:scale-105 active:scale-95 transition-all duration-300 border-4 border-white"
        >
          🎵Stop➡️
        </button> */}

        <button
          onClick={() => {
           
            stopRecording();
          //  uploadAudio();
          }}
          className="mt-8 bg-gradient-to-r  from-pink-500 to-orange-500 text-white 
                   font-bold text-2xl px-8 py-4 rounded-full shadow-xl 
                   hover:scale-105 active:scale-95 transition-all duration-300 border-4 border-white"
        >
          🎵 Test speech ➡️
        </button>
      </div>
    </div>
  );
};

export default AlphabetLearning;
