import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import { predictGesture } from "./api";
import SmileImage from '../../../src/assets/smile.jpg';
import useProgressStore from '../maths/store/progressStore'; // Adjust the path as needed
import "./PracticeAnimations.css"; // Added for animations

// Import number images
import num0 from "../../assets/numbers/0.png";
import num1 from "../../assets/numbers/1.png";
import num2 from "../../assets/numbers/2.png";
import num3 from "../../assets/numbers/3.png";
import num4 from "../../assets/numbers/4.png";
import num5 from "../../assets/numbers/5.png";
import num6 from "../../assets/numbers/6.png";
import num7 from "../../assets/numbers/7.png";
import num8 from "../../assets/numbers/8.png";
import num9 from "../../assets/numbers/9.png";

const numberImages = { 0: num0, 1: num1, 2: num2, 3: num3, 4: num4, 5: num5, 6: num6, 7: num7, 8: num8, 9: num9 };

const playSound = (number) => {
  const audio = new Audio(`/sounds/${number}.mp3`);
  audio.play().catch((error) => console.log("Audio play error:", error));
};

const sequences = [
  { sequence: [2, 3, 4, "?"], answer: 5 },
  { sequence: [2, "?", 6, 8, 10], answer: 4 },
  { sequence: [3, 4, "?"], answer: 5 },
];

const SequencePractice = () => {
  const webcamRef = useRef(null);
  const [selectedSequence, setSelectedSequence] = useState(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [finalPrediction, setFinalPrediction] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // Zustand store hook
  const addProgress = useProgressStore((state) => state.addProgress);

  const startPractice = () => {
    const randomIndex = Math.floor(Math.random() * sequences.length);
    const targetSequence = sequences[randomIndex];
    console.log(`[startPractice] Generated targetSequence: ${JSON.stringify(targetSequence)}`);
    setSelectedSequence(targetSequence);
    setCapturedImages([]);
    setFinalPrediction("");
    setCountdown(5);
    setIsCapturing(true);

    let count = 5;
    const countdownInterval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        clearInterval(countdownInterval);
        console.log("[startPractice] Countdown complete, starting captureImages");
        captureImages(targetSequence);
      }
    }, 1000);
  };

  const captureImages = (targetSequence) => {
    let images = [];
    let count = 0;
    console.log("[captureImages] Starting image capture");
    console.log(`[captureImages] Target sequence: ${JSON.stringify(targetSequence)}`);
    const captureInterval = setInterval(() => {
      if (count < 5) {
        const imageSrc = webcamRef.current.getScreenshot();
        images.push(imageSrc);
        setCapturedImages((prev) => [...prev, imageSrc]);
        count++;
        console.log(`[captureImages] Captured image ${count}/5`);
      } else {
        clearInterval(captureInterval);
        console.log("[captureImages] All images captured, processing predictions");
        processPredictions(images, targetSequence);
      }
    }, 1000);
  };

  const processPredictions = async (images, targetSequence) => {
    console.log("[processPredictions] Starting prediction processing");
    console.log(`[processPredictions] Target sequence: ${JSON.stringify(targetSequence)}`);
    let predictions = [];
    for (let i = 0; i < images.length; i++) {
      const blob = await fetch(images[i]).then((res) => res.blob());
      const file = new File([blob], `captured_image_${i}.jpg`, { type: "image/jpeg" });
      const result = await predictGesture(file);
      predictions.push(result);
      console.log(`[processPredictions] Prediction ${i + 1}: ${result}`);
    }

    const finalPred = getMostFrequentPrediction(predictions);
    console.log(`[processPredictions] Final prediction calculated: ${finalPred}`);
    setFinalPrediction(finalPred);
    setIsCapturing(false);

    const targetAnswer = targetSequence.answer;
    const isCorrect = String(finalPred) === String(targetAnswer);

    if (targetSequence !== null) {
      if (isCorrect) {
        addProgress("SequencePractice", 1); // Correct answer
        showSuccessAlert();
      } else {
        addProgress("SequencePractice", 0); // Incorrect answer
        showFailureAlert();
      }
    }
  };

  const getMostFrequentPrediction = (predictions) => {
    const counts = {};
    predictions.forEach((pred) => {
      counts[pred] = (counts[pred] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b), null) || "0";
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "🎉 Correct Answer!",
      text: "✅ Well Done!",
      icon: "success",
      imageUrl: SmileImage,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Smile image',
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const showFailureAlert = () => {
    Swal.fire({
      title: "❌ Incorrect!",
      text: "Try Again!",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-row p-6 gap-6">
      {/* Left Side: Sequence and Results */}
      <div className="w-2/3 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
          <h2 className="text-4xl font-bold text-indigo-700 drop-shadow-md">✨ Sequence Practice</h2>
          <p className="text-lg text-gray-600 mt-2">Show the missing number with your fingers!</p>
        </div>

        {/* Number Sequence Display */}
        {selectedSequence && (
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-700 text-center">Sequence:</h3>
            <div className="flex justify-center items-center gap-8 mt-4 animate-bounce-in">
              {selectedSequence.sequence.map((num, index) =>
                num === "?" ? (
                  <div 
                    key={index} 
                    className="w-36 h-36 flex items-center justify-center bg-gradient-to-r from-red-300 to-orange-400 rounded-lg text-6xl font-extrabold text-white shadow-lg"
                  >
                    ?
                  </div>
                ) : (
                  <img
                    key={index}
                    src={numberImages[num]}
                    alt={`Number ${num}`}
                    className="w-40 h-40 object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                    onClick={() => playSound(num)}
                  />
                )
              )}
            </div>
          </div>
        )}

        {/* Countdown */}
        {countdown !== null && countdown > 0 && (
          <div className="mt-6 text-2xl font-semibold text-indigo-600 animate-pulse">
            Starting in: {countdown}s
          </div>
        )}

        {/* Captured Images Count */}
        {capturedImages.length > 0 && (
          <div className="mt-6 text-lg text-gray-700">
            Captured {capturedImages.length}/5 Images
          </div>
        )}

        {/* Final Prediction */}
        {finalPrediction && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-purple-700 text-center">
              Prediction: <span className="text-indigo-600">{finalPrediction}</span>
            </h2>
          </div>
        )}
      </div>

      {/* Right Side: Webcam and Button */}
      <div className="w-1/3 flex flex-col items-end">
        {/* Webcam */}
        <Webcam 
          audio={false} 
          ref={webcamRef} 
          screenshotFormat="image/jpeg" 
          className="w-full max-w-xl rounded-2xl shadow-xl border-4 border-indigo-200 transform transition-all hover:border-indigo-400 mb-8"
        />

        {/* Start Practice Button */}
        <button 
          onClick={startPractice}
          disabled={isCapturing}
          className="w-full max-w-md px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          📸 Start Practice
        </button>
      </div>
    </div>
  );
};

export default SequencePractice;