// import React from "react";
// import CameraCapture from "./CameraCapture";

// const NumberPractice = () => {
//     return (
//         <div className="number-practice">
//             <h2>📝 Practice Numbers</h2>
//             <p>Show a number using your fingers, and the system will recognize it.</p>
//             <CameraCapture />
//         </div>
//     );
// };

// export default NumberPractice;


import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import { predictGesture } from "./api";
import "./PracticeAnimations.css";  // Import new CSS for animations

const NumberPractice = () => {
    const webcamRef = useRef(null);
    const [randomNumber, setRandomNumber] = useState(null);
    const [capturedImages, setCapturedImages] = useState([]);
    const [predictionResults, setPredictionResults] = useState([]);
    const [finalPrediction, setFinalPrediction] = useState("");
    const [countdown, setCountdown] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);

    // Function to generate a random number (0-5) and start practice
    const startPractice = () => {
        const newRandomNumber = Math.floor(Math.random() * 6); // Generate number between 0-5
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
                captureImages();
            }
        }, 1000);
    };

    // Function to capture 5 images over 5 seconds (1 per second)
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

    // Determine the most frequent prediction using majority voting
    const finalPred = getMostFrequentPrediction(predictions);
    setFinalPrediction(finalPred);
    setIsCapturing(false);

    // Compare the prediction with the random number shown (make sure randomNumber is not null)
    if (randomNumber !== null && finalPred === randomNumber.toString()) {
        showSuccessAlert(); // Show success animation & alert
    } else {
        showFailureAlert(); // Show failure animation & alert
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

    // Success Alert with animation
    const showSuccessAlert = () => {
        Swal.fire({
            title: "🎉 Well Done!",
            text: "✅ Practice Passed!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
            backdrop: `
                rgba(0, 255, 0, 0.4)
                url("/success.gif")
                left top
                no-repeat
            `,
        });

        document.body.classList.add("success-animation");
        setTimeout(() => {
            document.body.classList.remove("success-animation");
        }, 2000);
    };

    // Failure Alert with animation
    const showFailureAlert = () => {
        Swal.fire({
            title: "Complete",
            text: "Prediction was correct.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
            backdrop: `
                rgba(0, 255, 0, 0.4)
                url("/failure.gif")
                left top
                no-repeat
            `,
        });

        document.body.classList.add("failure-animation");
        setTimeout(() => {
            document.body.classList.remove("failure-animation");
        }, 2000);
    };

    return (
        <div className="number-practice">
            <h2>📝 Practice Numbers</h2>
            <p>Show the number using your fingers.</p>
            <Webcam 
                audio={false} 
                ref={webcamRef} 
                screenshotFormat="image/jpeg" 
                className="webcam-view" 
            />

            <button onClick={startPractice} disabled={isCapturing}>📸 Start Practice</button>

            {randomNumber !== null && <h2 className="random-number">Show this number: {randomNumber}</h2>}
            {countdown !== null && countdown > 0 && <h2>Starting in: {countdown}s</h2>}
            {capturedImages.length > 0 && <h3>Captured {capturedImages.length}/5 Images</h3>}

            {/* <div className="image-preview-container">
                {capturedImages.map((img, index) => (
                    <img key={index} src={img} alt={`Captured ${index}`} className="captured-image" />
                ))}
            </div> */}

            {finalPrediction && (
                <div>
                    <h2>Final Prediction: {finalPrediction}</h2>
                </div>
            )}
        </div>
    );
};

export default NumberPractice;
