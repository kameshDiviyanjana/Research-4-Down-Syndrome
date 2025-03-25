import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import SmileImage from '../../../src/assets/smile.jpg';
import useProgressStore from '../maths/store/progressStore';
import "./PracticeAnimations.css";

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

const numberImages = { 
    0: num0, 
    1: num1, 
    2: num2, 
    3: num3, 
    4: num4, 
    5: num5,
    6: num6,
    7: num7,
    8: num8,
    9: num9
};

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
    const [selectedSequence, setSelectedSequence] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [finalPrediction, setFinalPrediction] = useState("");
    const [isChecking, setIsChecking] = useState(false);

    const addProgress = useProgressStore((state) => state.addProgress);

    const startPractice = () => {
        const randomIndex = Math.floor(Math.random() * sequences.length);
        const targetSequence = sequences[randomIndex];
        console.log(`[startPractice] Generated targetSequence: ${JSON.stringify(targetSequence)}`);
        setSelectedSequence(targetSequence);
        setFinalPrediction("");
        setCountdown(5);
        setIsCapturing(true);
        setIsChecking(false);

        let count = 5;
        const countdownInterval = setInterval(() => {
            count -= 1;
            setCountdown(count);
            if (count === 0) {
                clearInterval(countdownInterval);
                console.log("[startPractice] Countdown complete, waiting for user input");
                setTimeout(() => {
                    setIsChecking(true);
                }, 3000); // Wait 3 seconds after countdown before checking
            }
        }, 1000);
    };

    const checkResult = async (targetSequence) => {
        console.log("[checkResult] Fetching finger count from API");
        try {
            const response = await fetch("http://localhost:5000/finger_counting/count");
            const data = await response.json();
            const userPrediction = data.finger_count;
            const confidence = data.confidence;
            console.log(`[checkResult] Fetched finger count: ${userPrediction}, Confidence: ${confidence}`);

            setFinalPrediction(userPrediction);
            setIsCapturing(false);
            setIsChecking(false);

            const targetAnswer = targetSequence.answer;
            const isCorrect = userPrediction === targetAnswer && confidence >= 0.8; // Require 80% confidence
            console.log(`[checkResult] Comparison result: ${isCorrect} (Target: ${targetAnswer}, User: ${userPrediction}, Conf: ${confidence})`);
            if (isCorrect) {
                addProgress("SequencePractice", 1);
                showSuccessAlert();
            } else {
                addProgress("SequencePractice", 0);
                showFailureAlert(confidence);
            }
        } catch (error) {
            console.error("[checkResult] Error fetching finger count:", error);
            setIsCapturing(false);
            setIsChecking(false);
            Swal.fire({
                title: "Error",
                text: "Failed to fetch finger count. Please try again.",
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
            });
        }
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

    const showFailureAlert = (confidence) => {
        console.log("[showFailureAlert] Displaying failure alert");
        let message = "Try Again!";
        if (confidence < 0.8) {
            message += " (Hold your hand steady for a higher confidence score)";
        }
        Swal.fire({
            title: "❌ Incorrect!",
            text: message,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
        });
    };

    useEffect(() => {
        if (isChecking && selectedSequence !== null) {
            checkResult(selectedSequence);
        }
    }, [isChecking, selectedSequence]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
            <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-10">
                <div className="flex flex-col items-center lg:w-1/2 bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105">
                    <div className="text-center mb-6 animate-fade-in">
                        <h2 className="text-4xl font-bold text-indigo-700 drop-shadow-md">✨ Sequence Practice</h2>
                        <p className="text-lg text-gray-600 mt-2">Show the missing number with your fingers!</p>
                    </div>

                    <button 
                        onClick={startPractice} 
                        disabled={isCapturing}
                        className="w-full px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                        📸 Start Practice
                    </button>

                    {selectedSequence && (
                        <div className="mt-8 animate-bounce-in">
                            <div className="flex justify-center items-center gap-8">
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
                                            className="w-36 h-36 object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                                            onClick={() => playSound(num)}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {countdown !== null && countdown > 0 && (
                        <div className="mt-6 text-2xl font-semibold text-indigo-600 animate-pulse">
                            Starting in: {countdown}s
                        </div>
                    )}

                    {finalPrediction !== "" && (
                        <div className="mt-8 animate-fade-in">
                            <h2 className="text-2xl font-bold text-purple-700">
                                You showed: <span className="text-indigo-600">{finalPrediction}</span>
                            </h2>
                        </div>
                    )}
                </div>

                <div className="lg:w-1/2 flex justify-center">
                    <img 
                        src="http://localhost:5000/finger_counting/feed" 
                        alt="Finger counting feed" 
                        className="w-full max-w-2xl rounded-2xl shadow-xl border-4 border-indigo-200 transform transition-all hover:border-indigo-400"
                    />
                </div>
            </div>
        </div>
    );
};

export default SequencePractice;