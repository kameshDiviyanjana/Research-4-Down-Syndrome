// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import Swal from "sweetalert2";
// import { predictGesture } from "../api";
// import "./PracticeAnimations.css";

// const AdditionPractice = () => {
//     const webcamRef = useRef(null);
//     const [num1, setNum1] = useState(null);
//     const [num2, setNum2] = useState(null);
//     const [capturedImages, setCapturedImages] = useState([]);
//     const [predictionResults, setPredictionResults] = useState([]);
//     const [finalPrediction, setFinalPrediction] = useState("");
//     const [countdown, setCountdown] = useState(null);
//     const [isCapturing, setIsCapturing] = useState(false);

    
//     const startPractice = () => {
//         const newNum1 = Math.floor(Math.random() * 6);
//         const newNum2 = Math.floor(Math.random() * 6);
//         setNum1(newNum1);
//         setNum2(newNum2);
//         setCapturedImages([]);
//         setPredictionResults([]);
//         setFinalPrediction("");
//         setCountdown(5);
//         setIsCapturing(true);

//         let count = 5;
//         const countdownInterval = setInterval(() => {
//             count -= 1;
//             setCountdown(count);

//             if (count === 0) {
//                 clearInterval(countdownInterval);
//                 captureImages();
//             }
//         }, 1000);
//     };

   
//     const captureImages = () => {
//         let images = [];
//         let count = 0;
//         const captureInterval = setInterval(() => {
//             if (count < 5) {
//                 const imageSrc = webcamRef.current.getScreenshot();
//                 images.push(imageSrc);
//                 setCapturedImages((prev) => [...prev, imageSrc]);
//                 count++;
//             } else {
//                 clearInterval(captureInterval);
//                 processPredictions(images);
//             }
//         }, 1000);
//     };

    
//     const processPredictions = async (images) => {
//         let predictions = [];

//         for (let i = 0; i < images.length; i++) {
//             const blob = await fetch(images[i]).then((res) => res.blob());
//             const file = new File([blob], `captured_image_${i}.jpg`, { type: "image/jpeg" });

//             const result = await predictGesture(file);
//             predictions.push(result);
//             setPredictionResults((prev) => [...prev, result]);
//         }

        
//         const finalPred = getMostFrequentPrediction(predictions);
//         setFinalPrediction(finalPred);
//         setIsCapturing(false);

      
//         const correctAnswer = num1 + num2;
//         if (finalPred === correctAnswer.toString()) {
//             showSuccessAlert();
//         } else {
//             showFailureAlert();
//         }
//     };

  
//     const getMostFrequentPrediction = (predictions) => {
//         const counts = {};
//         predictions.forEach(pred => {
//             counts[pred] = (counts[pred] || 0) + 1;
//         });

//         return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b), null);
//     };

   
//     const showSuccessAlert = () => {
//         Swal.fire({
//             title: "🎉 Well Done!",
//             text: "✅ Practice Passed!",
//             icon: "success",
//             showConfirmButton: false,
//             timer: 2000,
//         });

//         document.body.classList.add("success-animation");
//         setTimeout(() => {
//             document.body.classList.remove("success-animation");
//         }, 2000);
//     };

   
//     const showFailureAlert = () => {
//         Swal.fire({
//             title: "❌ Try Again!",
//             text: "Incorrect answer.",
//             icon: "error",
//             showConfirmButton: false,
//             timer: 2000,
//         });

//         document.body.classList.add("failure-animation");
//         setTimeout(() => {
//             document.body.classList.remove("failure-animation");
//         }, 2000);
//     };

//     return (
//         <div className="addition-practice">
//             <h2>📝 Practice Addition</h2>
//             <p>Show the sum of the numbers using your fingers.</p>
//             <Webcam 
//                 audio={false} 
//                 ref={webcamRef} 
//                 screenshotFormat="image/jpeg" 
//                 className="webcam-view" 
//             />

//             <button onClick={startPractice} disabled={isCapturing}>📸 Start Practice</button>

//             {num1 !== null && num2 !== null && (
//                 <h2 className="addition-display">{num1} + {num2} = ?</h2>
//             )}

//             {countdown !== null && countdown > 0 && <h2>Starting in: {countdown}s</h2>}
//             {capturedImages.length > 0 && <h3>Captured {capturedImages.length}/5 Images</h3>}

//             {finalPrediction && (
//                 <div>
//                     <h2>Final Prediction: {finalPrediction}</h2>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdditionPractice;

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import { predictGesture } from "./api";
import "./PracticeAnimations.css";

// Import number ima'
// import num0 from "../../assets";

import num0 from "../../assets/numbers/0.png";
import num1 from "../../assets/numbers/1.png";
import num2 from "../../assets/numbers/2.png";
import num3 from "../../assets/numbers/3.png";
import num4 from "../../assets/numbers/4.png";
import num5 from "../../assets/numbers/5.png";
import plus from "../../assets/numbers/plus.png";

// Number images map
const numberImages = { 0: num0, 1: num1, 2: num2, 3: num3, 4: num4, 5: num5, plus: plus };

// Function to play sound
const playSound = (number) => {
    const audio = new Audio(`/sounds/${number}.mp3`);
    audio.play().catch((error) => console.log("Audio play error:", error));
};

// Predefined addition tasks
const tasks = [
    { num1: 1, num2: 4, answer: 5 },
    { num1: 2, num2: 3, answer: 5 }
];

const AdditionPractice = () => {
    const webcamRef = useRef(null);
    const [currentTask, setCurrentTask] = useState(null);
    const [capturedImages, setCapturedImages] = useState([]);
    const [predictionResults, setPredictionResults] = useState([]);
    const [finalPrediction, setFinalPrediction] = useState("");
    const [countdown, setCountdown] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);

    // Function to select a predefined task and start practice
    const startPractice = () => {
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        setCurrentTask(randomTask);
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
                captureImages();
            }
        }, 1000);
    };

    // Function to capture 5 images over 5 seconds
    const captureImages = () => {
        let images = [];
        let count = 0;
        const captureInterval = setInterval(() => {
            if (count < 5) {
                const imageSrc = webcamRef.current.getScreenshot();
                images.push(imageSrc);
                setCapturedImages((prev) => [...prev, imageSrc]);
                count++;
            } else {
                clearInterval(captureInterval);
                processPredictions(images);
            }
        }, 1000);
    };

    // Function to send images for prediction
    const processPredictions = async (images) => {
        let predictions = [];

        for (let i = 0; i < images.length; i++) {
            const blob = await fetch(images[i]).then((res) => res.blob());
            const file = new File([blob], `captured_image_${i}.jpg`, { type: "image/jpeg" });

            const result = await predictGesture(file);
            predictions.push(result);
            setPredictionResults((prev) => [...prev, result]);
        }

        // Determine the final prediction using majority voting
        const finalPred = getMostFrequentPrediction(predictions);
        setFinalPrediction(finalPred);
        setIsCapturing(false);

        // Compare the prediction with the correct sum
        if (finalPred === currentTask.answer.toString()) {
            showSuccessAlert();
        } else {
            showFailureAlert();
        }
    };

    // Function to determine the most common prediction using majority voting
    const getMostFrequentPrediction = (predictions) => {
        const counts = {};
        predictions.forEach(pred => {
            counts[pred] = (counts[pred] || 0) + 1;
        });

        return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b), null);
    };

    // Success Alert
    const showSuccessAlert = () => {
        Swal.fire({
            title: "🎉 Correct Answer!",
            text: "✅ Well Done!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
        });
    };

    // Failure Alert
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
        <div className="addition-practice">
            <h2>📝 Practice Addition</h2>
            <p>Show the sum of the numbers using your fingers.</p>
            <Webcam 
                audio={false} 
                ref={webcamRef} 
                screenshotFormat="image/jpeg" 
                className="webcam-view" 
            />

            <button onClick={startPractice} disabled={isCapturing}>📸 Start Practice</button>

            {currentTask && (
                <div className="addition-display">
                    <img src={numberImages[currentTask.num1]} alt={`${currentTask.num1}`} className="number-img" onClick={() => playSound(currentTask.num1)} />
                    <span className="operator">+</span>
                    <img src={numberImages[currentTask.num2]} alt={`${currentTask.num2}`} className="number-img" onClick={() => playSound(currentTask.num2)} />
                    <span className="operator">= ?</span>
                </div>
            )}

            {countdown !== null && countdown > 0 && <h2>Starting in: {countdown}s</h2>}
            {capturedImages.length > 0 && <h3>Captured {capturedImages.length}/5 Images</h3>}

            {finalPrediction && (
                <div>
                    <h2>Final Prediction: {finalPrediction}</h2>
                </div>
            )}
        </div>
    );
};

export default AdditionPractice;
