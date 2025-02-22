// import React, { useState, useEffect, useRef } from "react";
// import bush from "../../../assets/bush-clipart-animated-6.png";
// import sun from "../../../assets/source.gif";
// import { AllAddWord } from "../../../Api/vocabularyApi";
// import StartingPage from  "../utile/StartingPage"
// import Vehicale from "../../../utile/Vehicale.json";
// import car from "../../../assets/car55.jpeg"; // Correct path
// import Motorcycle from "../../../assets/bike.jpeg"; // Correct path
// import Bicycle from "../../../assets/bicycle.jpeg";
// import Lory from "../../../assets/Lorry.avif";
// import Train from "../../../assets/train.jpeg";
// import Bus from "../../../assets/bus.jpeg";
// import Van from "../../../assets/van.jpeg";
// import { useNavigate } from "react-router-dom";

// const imageMapping = {
//   Car: car,
//   Motorcycle: Motorcycle,
//   Bicycle: Bicycle,
//   Van: Van,
//   Lory: Lory,
//   Train: Train,
//   Bus: Bus,
// };
// function DefaulteLsitWord() {
//   const [pagecount, setPagecount] = useState(1);
//   const userme = localStorage.getItem("userid");
//   const [completed, setCompleted] = useState(false);
//   const [start, setStart] = useState(true);
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioURL, setAudioURL] = useState(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);

//   // Fetching words data

//   // Text-to-speech function
//   const spechword = (textword) => {
//     const utterance = new SpeechSynthesisUtterance(textword);
//     window.speechSynthesis.speak(utterance);
//   };

//   // Pagination Handlers
//   const nextWord = () => {
//     if (pagecount < getallword?.data?.totalPages) {
//       setPagecount((prev) => prev + 1);
//     } else {
//       setCompleted(true);
//     }
//   };

//   const prevWord = () => {
//     setPagecount((prev) => (prev > 1 ? prev - 1 : 1));
//   };

//   // Audio Recording Handlers
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         audioChunksRef.current.push(event.data);
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, {
//           type: "audio/wav",
//         });
//         const audioURL = URL.createObjectURL(audioBlob);
//         setAudioURL(audioURL);
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };
//   const [taskcompleted, settaskcompleted] = useState(false);

//   const sendAudioToBackend = async () => {
//     try {
//       // Create an audio blob from recorded chunks
//       const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });

//       // Debug: Check the audio blob details
//       console.log("Audio Blob:", audioBlob);
//       console.log("Audio Blob size:", audioBlob.size);
//       console.log("Audio Blob type:", audioBlob.type);

//       // Ensure the blob is valid
//       if (audioBlob.size === 0) {
//         console.error("Audio Blob is empty. Cannot send to backend.");
//         return;
//       }

//       // Create FormData and append the blob
//       const formData = new FormData();
//       formData.append("file", audioBlob, "audio.wav");

//       // Optional: Add any metadata if required
//       //  formData.append("userId", "12345"); // Example metadata

//       // Debug: Log FormData content
//       for (let [key, value] of formData.entries()) {
//         if (value instanceof Blob) {
//           console.log(
//             `${key}: Blob - size: ${value.size}, type: ${value.type}`
//           );
//         } else {
//           console.log(`${key}: ${value}`);
//         }
//       }

//       // Send FormData to backend
//       const response = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         body: formData,
//       });

//       // Handle server response
//       if (response.ok) {
//         const result = await response.json();
//         console.log("Server response:", result);

//         // Example: Handle successful task completion
//         settaskcompleted(true);
//       } else {
//         // Capture and log the error response
//         const error = await response.json();
//         console.error("Error from server:", error.message || "Unknown error");
//       }
//     } catch (err) {
//       // Log any unexpected errors
//       console.error("Error sending audio:", err);
//     }
//   };
// //   if (isLoading) return <div>Loading...</div>;
// //   if (error) return <div>Error loading words! Please try again later.</div>;

//   const sgg = () => {
//     startRecording();
//     setStart(false);
//   };
//   return (
//     <div className="bg-[url(https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg)] bg-cover bg-no-repeat bg-center lg:h-[700px] w-full">
//       <div className="py-10 px-11">
//         <div className="flex justify-between">
//           {/* Left Images */}
//           <div className="mb-0">
//             <img src={sun} alt="sun" className="h-48 max-lg:hidden" />
//             <div className="mt-80">
//               <img src={bush} alt="bush" className="h-48 max-lg:hidden" />
//             </div>
//           </div>

//           {/* Word Cards */}
//           {start ? (
//             <StartingPage setstart={sgg} />
//           ) : (
//             <div className="lg:flex justify-between w-full">
//               <button onClick={prevWord} className="max-lg:hidden">
//                 Previous
//               </button>
//               <div className="flex flex-wrap justify-center space-x-4">
//                 {Vehicale.Vehicale.map((word) => {
//                   const imagePath = imageMapping[word.word];
//                   const fallbackImage = "/path/to/default-image.jpg"; // Change this to an actual path if needed
//                   const finalImagePath = imagePath || fallbackImage;

//                   return (
//                     <div
//                       className="shadow-inner rounded-3xl p-4 grid lg:grid-cols-2 gap-4"
//                       key={word.id}
//                     >
//                       <div>
//                         <img
//                           src={finalImagePath}
//                           alt={word.word}
//                           className="h-[100px] rounded-lg"
//                         />
//                       </div>
//                       <div>
//                         <h1>{word.word}</h1>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//               {taskcompleted ? (
//                 <button
//                   className="max-lg:hidden"
//                   onClick={() => {
//                     // sendAudioToBackend();
//                     nextWord();
//                     startRecording();
//                     //stopRecording();
//                   }}
//                 >
//                   Next
//                 </button>
//               ) : (
//                 <button
//                   className="max-lg:hidden"
//                   onClick={() => {
//                     sendAudioToBackend();
//                     //  nextWord();
//                     stopRecording();
//                   }}
//                 >
//                   Complete
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Bottom Images */}
//           <div className="mb-0 mt-[490px]">
//             <img src={bush} alt="bush" className="h-48 max-lg:hidden" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DefaulteLsitWord;

import React, { useState } from "react";
import bush from "../../../assets/bush-clipart-animated-6.png";
import sun from "../../../assets/source.gif";
import Vehicale from "../../../utile/Vehicale.json";
import car from "../../../assets/car55.jpeg";
import Motorcycle from "../../../assets/bike.jpeg";
import Bicycle from "../../../assets/bicycle.jpeg";
import Lory from "../../../assets/Lorry.avif";
import Train from "../../../assets/train.jpeg";
import Bus from "../../../assets/bus.jpeg";
import Van from "../../../assets/van.jpeg";

const imageMapping = {
  Car: car,
  Motorcycle: Motorcycle,
  Bicycle: Bicycle,
  Van: Van,
  Lory: Lory,
  Train: Train,
  Bus: Bus,
};

function DefaulteLsitWord() {
  const [pagecount, setPagecount] = useState(0);
  const totalVehicles = Vehicale.Vehicale.length;

  const nextWord = () => setPagecount((prev) => (prev + 1) % totalVehicles);
  const prevWord = () =>
    setPagecount((prev) => (prev - 1 + totalVehicles) % totalVehicles);

  const currentVehicle = Vehicale.Vehicale[pagecount];
  const imagePath = imageMapping[currentVehicle?.word] || "/default.jpg";

  return (
    <div className="bg-[url('https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg')] bg-cover bg-no-repeat bg-center lg:h-[700px] w-full">
      <div className="py-12 px-8">
        {/* Sun & Bush Images */}
        <div className="flex justify-between items-start">
          <div>
            <img src={sun} alt="sun" className="h-32 hidden lg:block" />
            <img
              src={bush}
              alt="bush"
              className="h-24 hidden lg:block mt-[450px] "
            />
          </div>

          {/* Word Display Section */}
          <div className="flex flex-col items-center  w-full  mx-auto">
            {currentVehicle && (
              <div className=" shadow-lg rounded-2xl">
                <img
                  src={imagePath}
                  alt={currentVehicle.word}
                  className="h-[400px] w-auto object-cover rounded-lg"
                />
                <h1 className="text-3xl font-bold text-center mt-4">
                  {currentVehicle.word}
                </h1>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={prevWord}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 shadow-md"
              >
                Previous
              </button>
              <button
                onClick={nextWord}
                className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 shadow-md"
              >
                Next
              </button>
            </div>
          </div>

          {/* Bush Image */}
          <div className="mt-[570px] hidden lg:block ">
            <img src={bush} alt="bush" className="h-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaulteLsitWord;
