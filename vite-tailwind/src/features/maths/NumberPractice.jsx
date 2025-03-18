import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import { predictGesture } from "./api";
import SmileImage from '../../../src/assets/smile.jpg';
import useProgressStore from '../maths/store/progressStore'; // Adjust the path as needed
import "./PracticeAnimations.css"; // Assuming you want animations

// Import number images
import num0 from "../../assets/numbers/0.png";
import num1 from "../../assets/numbers/1.png";
import num2 from "../../assets/numbers/2.png";
import num3 from "../../assets/numbers/3.png";
import num4 from "../../assets/numbers/4.png";
import num5 from "../../assets/numbers/5.png";

// Number images map
const numberImages = { 0: num0, 1: num1, 2: num2, 3: num3, 4: num4, 5: num5 };

// Function to play sound
const playSound = (number) => {
    const audio = new Audio(`/sounds/${number}.mp3`);
    audio.play().catch((error) => console.log("Audio play error:", error));
};

const NumberPractice = () => {
    const webcamRef = useRef(null);
    const [randomNumber, setRandomNumber] = useState(null);
    const [capturedImages, setCapturedImages] = useState([]);
    const [predictionResults, setPredictionResults] = useState([]);
    const [finalPrediction, setFinalPrediction] = useState("");
    const [countdown, setCountdown] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);

    // Zustand store hook
    const addProgress = useProgressStore((state) => state.addProgress);

    const startPractice = () => {
        const newRandomNumber = Math.floor(Math.random() * 6);
        console.log(`[startPractice] Generated newRandomNumber: ${newRandomNumber}`);
        setRandomNumber(newRandomNumber);
        setCapturedImages([]);
        setPredictionResults([]);
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
                captureImages(newRandomNumber);
            }
        }, 1000);
    };

    const captureImages = (targetNumber) => {
        let images = [];
        let count = 0;
        console.log("[captureImages] Starting image capture");
        console.log(`[captureImages] Target number: ${targetNumber}`);
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
                processPredictions(images, targetNumber);
            }
        }, 1000);
    };

    const processPredictions = async (images, targetNumber) => {
        console.log("[processPredictions] Starting prediction processing");
        console.log(`[processPredictions] Target number: ${targetNumber}`);
        let predictions = [];
        
        for (let i = 0; i < images.length; i++) {
            const blob = await fetch(images[i]).then((res) => res.blob());
            const file = new File([blob], `captured_image_${i}.jpg`, { type: "image/jpeg" });
            const result = await predictGesture(file);
            predictions.push(result);
            setPredictionResults((prev) => [...prev, result]);
            console.log(`[processPredictions] Prediction ${i + 1}: ${result}`);
        }

        const finalPred = getMostFrequentPrediction(predictions);
        console.log(`[processPredictions] Final prediction calculated: ${finalPred}`);
        console.log(`[processPredictions] Type of finalPred: ${typeof finalPred}`);

        setFinalPrediction(finalPred);
        setIsCapturing(false);

        console.log(`[processPredictions] Comparing finalPred: ${finalPred} with targetNumber: ${targetNumber}`);
        const isCorrect = String(finalPred) === String(targetNumber);
        console.log(`[processPredictions] Comparison result (finalPred === targetNumber): ${isCorrect}`);
        console.log(`[processPredictions] String(finalPred): ${String(finalPred)}, String(targetNumber): ${String(targetNumber)}`);

        // Update progress based on correctness
        if (targetNumber !== null) {
            if (isCorrect) {
                console.log("[processPredictions] Prediction is correct, adding progress: NumberPractice, count: 1");
                addProgress("NumberPractice", 1); // Correct answer
                showSuccessAlert();
            } else {
                console.log("[processPredictions] Prediction is incorrect, adding progress: NumberPractice, count: 0");
                addProgress("NumberPractice", 0); // Incorrect answer
                showFailureAlert();
            }
        }
    };

    const getMostFrequentPrediction = (predictions) => {
        console.log("[getMostFrequentPrediction] Calculating most frequent prediction");
        console.log(`[getMostFrequentPrediction] All predictions: ${JSON.stringify(predictions)}`);
        const counts = {};
        predictions.forEach(pred => {
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
            timer: 2000
        });
    };

    const showFailureAlert = () => {
        console.log("[showFailureAlert] Displaying failure alert");
        Swal.fire({
            title: "❌ Incorrect!",
            text: "Try Again!",
            icon: "error",
            showConfirmButton: false,
            timer: 2000
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
            {/* Main Content Container */}
            <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-10">
                {/* Left Section: Task Display */}
                <div className="flex flex-col items-center lg:w-1/2 bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105">
                    <div className="text-center mb-6 animate-fade-in">
                        <h2 className="text-4xl font-bold text-indigo-700 drop-shadow-md">✨ Number Practice</h2>
                        <p className="text-lg text-gray-600 mt-2">Show the number with your fingers!</p>
                    </div>

                    <button 
                        onClick={startPractice} 
                        disabled={isCapturing}
                        className="w-full px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                        📸 Start Practice
                    </button>

                    {randomNumber !== null && (
                        <div className="mt-8 animate-bounce-in">
                            <img 
                                src={numberImages[randomNumber]} 
                                alt={`Show this number: ${randomNumber}`} 
                                className="w-36 h-36 object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                                onClick={() => playSound(randomNumber)}
                            />
                        </div>
                    )}

                    {countdown !== null && countdown > 0 && (
                        <div className="mt-6 text-2xl font-semibold text-indigo-600 animate-pulse">
                            Starting in: {countdown}s
                        </div>
                    )}

                    {capturedImages.length > 0 && (
                        <div className="mt-6 text-lg text-gray-700">
                            Captured {capturedImages.length}/5 Images
                        </div>
                    )}

                    {finalPrediction && (
                        <div className="mt-8 animate-fade-in">
                            <h2 className="text-2xl font-bold text-purple-700">
                                Prediction: <span className="text-indigo-600">{finalPrediction}</span>
                            </h2>
                        </div>
                    )}
                </div>

                {/* Right Section: Webcam */}
                <div className="lg:w-1/2 flex justify-center">
                    <Webcam 
                        audio={false} 
                        ref={webcamRef} 
                        screenshotFormat="image/jpeg" 
                        className="w-full max-w-2xl rounded-2xl shadow-xl border-4 border-indigo-200 transform transition-all hover:border-indigo-400"
                    />
                </div>
            </div>
        </div>
    );
};

export default NumberPractice;