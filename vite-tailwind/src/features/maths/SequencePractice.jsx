// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import Swal from "sweetalert2";
// import { predictGesture } from "../api";
// import "./PracticeAnimations.css";

// const sequences = [
//     { sequence: [1, 2, "?", 4], answer: 3 },
//     { sequence: [1, "?", 5, 7, 9], answer: 3 },
//     { sequence: [3, 4, "?"], answer: 5 },
  
// ];

// const SequencePractice = () => {
//     const webcamRef = useRef(null);
//     const [selectedSequence, setSelectedSequence] = useState(null);
//     const [capturedImages, setCapturedImages] = useState([]);
//     const [predictionResults, setPredictionResults] = useState([]);
//     const [finalPrediction, setFinalPrediction] = useState("");
//     const [countdown, setCountdown] = useState(null);
//     const [isCapturing, setIsCapturing] = useState(false);

//     // Function to select a random sequence and start practice
//     const startPractice = () => {
//         const randomIndex = Math.floor(Math.random() * sequences.length);
//         setSelectedSequence(sequences[randomIndex]);
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

       
//         if (finalPred === selectedSequence.answer.toString()) {
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
//         <div className="sequence-practice">
//             <h2>📝 Practice Number Sequences</h2>
//             <p>Show the missing number using hand gestures.</p>
//             <Webcam 
//                 audio={false} 
//                 ref={webcamRef} 
//                 screenshotFormat="image/jpeg" 
//                 className="webcam-view" 
//             />

//             <button onClick={startPractice} disabled={isCapturing}>📸 Start Practice</button>

//             {selectedSequence && (
//                 <h2 className="sequence-display">
//                     {selectedSequence.sequence.map((num, index) => (
//                         <span key={index} className={num === "?" ? "missing-number" : ""}>
//                             {num}
//                         </span>
//                     ))}
//                 </h2>
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

// export default SequencePractice;
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import { predictGesture } from "./api";
import "./PracticeAnimations.css";

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

// Number images map
const numberImages = {
    0: num0, 1: num1, 2: num2, 3: num3, 4: num4,
    5: num5, 6: num6, 7: num7, 8: num8, 9: num9
};

// Function to play sound
const playSound = (number) => {
    const audio = new Audio(`/sounds/${number}.mp3`);
    audio.play().catch((error) => console.log("Audio play error:", error));
};

// Number sequences with images
const sequences = [
    { sequence: [2, 3, 4,"?" ], answer: 5 },
    { sequence: [2, "?", 6, 8, 10], answer: 2 },
    { sequence: [3, 4, "?"], answer: 5 },
];

const SequencePractice = () => {
    const webcamRef = useRef(null);
    const [selectedSequence, setSelectedSequence] = useState(null);
    const [capturedImages, setCapturedImages] = useState([]);
    const [predictionResults, setPredictionResults] = useState([]);
    const [finalPrediction, setFinalPrediction] = useState("");
    const [countdown, setCountdown] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);

    // Function to select a random sequence and start practice
    const startPractice = () => {
        const randomIndex = Math.floor(Math.random() * sequences.length);
        setSelectedSequence(sequences[randomIndex]);
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

        // Compare the prediction with the correct missing number
        if (finalPred === selectedSequence.answer.toString()) {
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
            title: "🎉 Well Done!",
            text: "✅ Practice Passed!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
        });
    };

    // Failure Alert
    const showFailureAlert = () => {
        Swal.fire({
            title: "❌ Try Again!",
            text: "Incorrect answer.",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
        });
    };

    return (
        <div className="sequence-practice">
            <h2>📝 Practice Number Sequences</h2>
            <p>Show the missing number using hand gestures.</p>
            <Webcam 
                audio={false} 
                ref={webcamRef} 
                screenshotFormat="image/jpeg" 
                className="webcam-view" 
            />

            <button onClick={startPractice} disabled={isCapturing}>📸 Start Practice</button>

            {selectedSequence && (
                <div className="sequence-display">
                    {selectedSequence.sequence.map((num, index) => (
                        num === "?" ? 
                        <div key={index} className="missing-placeholder">?</div> :
                        <img 
                            key={index}
                            src={numberImages[num]} 
                            alt={`Number ${num}`} 
                            className="number-img" 
                            onClick={() => playSound(num)}
                        />
                    ))}
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

export default SequencePractice;
