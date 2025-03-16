import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { predictGesture } from "./api";

const CameraCapture = () => {
    const webcamRef = useRef(null);
    const [capturedImages, setCapturedImages] = useState([]);
    const [predictionResults, setPredictionResults] = useState([]);
    const [finalPrediction, setFinalPrediction] = useState("");
    const [countdown, setCountdown] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);

    // Function to determine the most common prediction using majority voting
    const getMostFrequentPrediction = (predictions) => {
        const counts = {};
        predictions.forEach(pred => {
            counts[pred] = (counts[pred] || 0) + 1;
        });

        return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b), null);
    };

    // Function to start countdown and capture process
    const startCaptureProcess = () => {
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

    // Function to capture 10 images over 10 seconds (1 per second)
    const captureImages = () => {
        let images = [];
        let count = 0;
        const captureInterval = setInterval(() => {
            if (count < 10) {
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
    };

    return (
        <div className="camera-container">
            <h1>📸 Capture Hand Gesture</h1>
            <Webcam 
                audio={false} 
                ref={webcamRef} 
                screenshotFormat="image/jpeg" 
                className="webcam-view" 
            />
            <button onClick={startCaptureProcess} disabled={isCapturing}>📸 Start Capture</button>

            {countdown !== null && countdown > 0 && <h2>Countdown: {countdown}s</h2>}
            {capturedImages.length > 0 && <h2>Captured {capturedImages.length}/10 Images</h2>}

            <div className="image-preview-container">
                {capturedImages.map((img, index) => (
                    <img key={index} src={img} alt={`Captured ${index}`} className="captured-image" />
                ))}
            </div>

            {predictionResults.length > 0 && (
                <div className="predictions">
                    <h3>Predictions:</h3>
                    {predictionResults.map((pred, index) => (
                        <p key={index}>Image {index + 1}: {pred}</p>
                    ))}
                </div>
            )}

            {finalPrediction && <h2>Final Prediction: {finalPrediction}</h2>}
        </div>
    );
};

export default CameraCapture;
