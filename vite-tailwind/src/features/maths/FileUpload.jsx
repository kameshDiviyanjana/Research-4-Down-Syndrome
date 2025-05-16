import React, { useState } from "react";
import { predictGesture } from "./api";

const FileUpload = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prediction, setPrediction] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Display image preview
        }
    };

    const handleUpload = async () => {
        if (!image) {
            alert("Please select an image first!");
            return;
        }

        setPrediction("⏳ Processing...");
        const result = await predictGesture(image);
        setPrediction(result || "No prediction available");
    };

    return (
        <div className="upload-container">
            <h1>🤖 Hand Gesture Recognition</h1>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && <img src={preview} alt="Preview" className="preview-image" />}
            <button onClick={handleUpload}>📤 Predict</button>
            {prediction && <h2>Prediction: {prediction}</h2>}
        </div>
    );
};

export default FileUpload;
