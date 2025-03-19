import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import { predictGesture } from "./api";
import SmileImage from '../../../src/assets/smile.jpg'
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
    console.log(`[processPredictions] Type of finalPred: ${typeof finalPred}`);

    setFinalPrediction(finalPred);
    setIsCapturing(false);

    const targetAnswer = targetSequence.answer;
    console.log(`[processPredictions] Comparing finalPred: ${finalPred} with targetAnswer: ${targetAnswer}`);
    const isCorrect = String(finalPred) === String(targetAnswer);
    console.log(`[processPredictions] Comparison result (finalPred === targetAnswer): ${isCorrect}`);
    console.log(`[processPredictions] String(finalPred): ${String(finalPred)}, String(targetAnswer): ${String(targetAnswer)}`);

    if (targetAnswer !== null && isCorrect) {
      console.log("[processPredictions] Prediction is correct, showing success alert");
      showSuccessAlert();
    } else {
      console.log("[processPredictions] Prediction is incorrect or targetAnswer is null, showing failure alert");
      console.log(`[processPredictions] Reason: targetAnswer=${targetAnswer}, isCorrect=${isCorrect}`);
      showFailureAlert();
    }
  };

  const getMostFrequentPrediction = (predictions) => {
    console.log("[getMostFrequentPrediction] Calculating most frequent prediction");
    console.log(`[getMostFrequentPrediction] All predictions: ${JSON.stringify(predictions)}`);
    const counts = {};
    predictions.forEach((pred) => {
      counts[pred] = (counts[pred] || 0) + 1;
      console.log(`[getMostFrequentPrediction] Count for ${pred}: ${counts[pred]}`);
    });
    const mostFrequent = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b), null) || "0";
    console.log(`[getMostFrequentPrediction] Most frequent prediction: ${mostFrequent}`);
    return mostFrequent;
  };

  const showSuccessAlert = () => {
    console.log("[showSuccessAlert] Displaying success alert");
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
    console.log("[showFailureAlert] Displaying failure alert");
    Swal.fire({
      title: "❌ Incorrect!",
      text: "Try Again!",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="flex flex-col items-center w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105">
        {/* Sequence Display at the Top */}
        {selectedSequence && (
          <div className="mt-4">
            <h3 className="text-xl font-medium text-gray-700">Sequence:</h3>
            <div className="flex justify-center items-center gap-6 mt-4 animate-bounce-in">
              {selectedSequence.sequence.map((num, index) =>
                num === "?" ? (
                  <div key={index} className="w-36 h-36 flex items-center justify-center bg-gray-200 rounded-lg text-3xl font-bold text-gray-600">
                    ?
                  </div>
                ) : (
                  <img
                    key={index}
                    src={numberImages[num]}
                    alt={`Number ${num}`}
                    className="w-36 h-36 object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                    onClick={() => playSound(num)}
                  />
                )
              )}
            </div>
          </div>
        )}

        {/* Webcam Below Sequence */}
        <Webcam 
          audio={false} 
          ref={webcamRef} 
          screenshotFormat="image/jpeg" 
          className="w-full max-w-xl rounded-2xl shadow-xl border-4 border-indigo-200 transform transition-all hover:border-indigo-400 mt-8"
        />

        {/* Header */}
        <div className="text-center mb-6 mt-8 animate-fade-in">
          <h2 className="text-4xl font-bold text-indigo-700 drop-shadow-md">✨ Sequence Practice</h2>
          <p className="text-lg text-gray-600 mt-2">Show the missing number with your fingers!</p>
        </div>

        {/* Button */}
        <button 
          onClick={startPractice}
          disabled={isCapturing}
          className="w-full px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          📸 Start Practice
        </button>

        {/* Countdown */}
        {countdown !== null && countdown > 0 && (
          <div className="mt-6 text-2xl font-semibold text-indigo-600 animate-pulse">
            Starting in: {countdown}s
          </div>
        )}

        {/* Captured Images */}
        {capturedImages.length > 0 && (
          <div className="mt-6 text-lg text-gray-700">
            Captured {capturedImages.length}/5 Images
          </div>
        )}

        {/* Final Prediction */}
        {finalPrediction && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-purple-700">
              Prediction: <span className="text-indigo-600">{finalPrediction}</span>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SequencePractice;