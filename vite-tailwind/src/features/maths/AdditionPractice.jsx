import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import SmileImage from '../../../src/assets/smile.jpg';
import useProgressStore from '../maths/store/progressStore';
import "./PracticeAnimations.css";
import plusAudio from '../maths/sounds/plus.mp3';
import whatIstheAnswerAudio from '../maths/sounds/wht_answer.mp3';

import num0 from "../../assets/numbers/0.png";
import num1 from "../../assets/numbers/1.png";
import num2 from "../../assets/numbers/2.png";
import num3 from "../../assets/numbers/3.png";
import num4 from "../../assets/numbers/4.png";
import num5 from "../../assets/numbers/5.png";

import sound1 from "../maths/sounds/1.mp3";
import sound2 from "../maths/sounds/2.mp3";
import sound3 from "../maths/sounds/3.mp3";
import sound4 from "../maths/sounds/4.mp3";
import sound5 from "../maths/sounds/5.mp3";
import sound6 from "../maths/sounds/6.mp3";
import sound7 from "../maths/sounds/7.mp3";
import sound8 from "../maths/sounds/8.mp3";
import sound9 from "../maths/sounds/9.mp3";
import backgroundImg from "../../../public/images/practiceBg2.jpg"

const numberImages = { 
    0: num0, 
    1: num1, 
    2: num2, 
    3: num3, 
    4: num4, 
    5: num5 
};

const numberSounds = {
    1: sound1,
    2: sound2,
    3: sound3,
    4: sound4,
    5: sound5,
    6: sound6,
    7: sound7,
    8: sound8,
    9: sound9,
};

const playSound = (number) => {
    const audio = new Audio(numberSounds[number]);
    audio.play().catch((error) => console.log("Audio play error:", error));
};

const tasks = [
    { num1: 1, num2: 4, answer: 5 },
    { num1: 2, num2: 3, answer: 5 }
];

const AdditionPractice = () => {
    const [currentTask, setCurrentTask] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [finalPrediction, setFinalPrediction] = useState("");
    const [isChecking, setIsChecking] = useState(false);

    const addProgress = useProgressStore((state) => state.addProgress);

    const startPractice = () => {
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        console.log(`[startPractice] Generated randomTask: ${JSON.stringify(randomTask)}`);
        setCurrentTask(randomTask);
        setFinalPrediction("");
        setIsCapturing(true);
        setIsChecking(false);

        const playAudioSequence = () => {
            const firstNumberAudio = new Audio(numberSounds[randomTask.num1]);
            const plusAudioFile = new Audio(plusAudio);
            const secondNumberAudio = new Audio(numberSounds[randomTask.num2]);
            const whatIsTheAnswerAudioFile = new Audio(whatIstheAnswerAudio);

            // Play first number
            firstNumberAudio.play().catch((error) => console.log("First number audio error:", error));

            // When first number ends, play "plus"
            firstNumberAudio.onended = () => {
                plusAudioFile.play().catch((error) => console.log("Plus audio error:", error));
            };

            // When "plus" ends, play second number
            plusAudioFile.onended = () => {
                secondNumberAudio.play().catch((error) => console.log("Second number audio error:", error));
            };

            // When second number ends, play "what is the answer" and start countdown
            secondNumberAudio.onended = () => {
                whatIsTheAnswerAudioFile.play().catch((error) => console.log("What is the answer audio error:", error));
                whatIsTheAnswerAudioFile.onended = () => {
                    // Start countdown after all audios have played
                    let count = 5;
                    setCountdown(count);
                    const countdownInterval = setInterval(() => {
                        count -= 1;
                        setCountdown(count);
                        if (count === 0) {
                            clearInterval(countdownInterval);
                            console.log("[startPractice] Countdown complete, waiting for user input");
                            setTimeout(() => {
                                setIsChecking(true);
                            }, 3000);
                        }
                    }, 1000);
                };
            };
        };

        // Start the audio sequence
        playAudioSequence();
    };

    const checkResult = async (targetTask) => {
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

            const targetAnswer = targetTask.answer;
            const isCorrect = userPrediction === targetAnswer && confidence >= 0.8;
            console.log(`[checkResult] Comparison result: ${isCorrect} (Target: ${targetAnswer}, User: ${userPrediction}, Conf: ${confidence})`);
            if (isCorrect) {
                addProgress("AdditionPractice", 1);
                showSuccessAlert();
            } else {
                addProgress("AdditionPractice", 0);
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
        if (isChecking && currentTask !== null) {
            checkResult(currentTask);
        }
    }, [isChecking, currentTask]);

    return (
         <div 
                        className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
                        style={{ backgroundImage: `url(${backgroundImg})` }}
                    >
            <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-10">
                <div className="flex flex-col items-center lg:w-1/2 rounded-2xl  p-8 transform transition-all">
                    <div className="text-center mb-1 mt-10 ">
                        <h2 className="text-4xl font-bold text-indigo-700 drop-shadow-md">+ Addition Practice</h2>
                        <p className="text-lg text-gray-600 mt-2">Show the sum with your fingers!</p>
                    </div>

                    <button 
    onClick={startPractice} 
    disabled={isCapturing}
    className="w-[200px] px-8 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-center rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
>
     Start Practice
</button>


                    {currentTask && (
                        <div className="mt-2 animate-bounce-in">
                            <div className="flex justify-center items-center gap-6">
                                <img 
                                    src={numberImages[currentTask.num1]} 
                                    alt={`Number ${currentTask.num1}`} 
                                    className="w-[160px] h-[150px]  object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                                    onClick={() => playSound(currentTask.num1)}
                                />
                                <span className="text-3xl font-bold text-gray-700">+</span>
                                <img 
                                    src={numberImages[currentTask.num2]} 
                                    alt={`Number ${currentTask.num2}`} 
                                    className="w-[160px] h-[150px]  object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                                    onClick={() => playSound(currentTask.num2)}
                                />
                                <span className="text-3xl font-bold text-gray-700">= ?</span>
                            </div>
                        </div>
                    )}

                    {countdown !== null && countdown > 0 && (
                        <div className="mt-6 text-2xl font-semibold text-indigo-600 animate-pulse">
                            Starting in: {countdown}s
                        </div>
                    )}

                   
                </div>

                <div className="lg:w-1/2 flex justify-center mt-[100px] mr-[70px]">
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

export default AdditionPractice;