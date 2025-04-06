// import axios from "axios";

// export const predictGesture = async (imageFile) => {
//     const formData = new FormData();
//     formData.append("image", imageFile);

//     try {
//         console.log("📤 Sending image to backend...");
//         const response = await axios.post("http://localhost:8080/predict", formData, {
//             headers: { "Content-Type": "multipart/form-data" },
//         });
//         console.log("✅ Response from backend:", response.data);
//         return response.data.prediction;
//     } catch (error) {
//         console.error("❌ Prediction error:", error.response?.data || error.message);
//         return null;
//     }
// };

import axios from "axios";

export const predictGesture = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        console.log("📤 Sending image to backend...");
        const response = await axios.post("http://localhost:8005/predict-math", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("✅ Response from backend:", response.data);
        return { prediction: response.data.prediction, confidence: response.data.confidence };
    } catch (error) {
        console.error("❌ Prediction error:", error.response?.data || error.message);
        return { prediction: null, confidence: 0 };
    }
};

// New function to handle base64 image
export const predictFromBase64 = async (base64Image) => {
    const formData = new FormData();
    formData.append("image", base64Image);

    try {
        console.log("📤 Sending captured image to backend...");
        const response = await axios.post("http://localhost:8005/predict-math", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("✅ Response from backend:", response.data);
        return response.data.prediction;
    } catch (error) {
        console.error("❌ Prediction error:", error.response?.data || error.message);
        return null;
    }
};
export const countFingers = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        console.log("📤 Sending image to backend...");
        const response = await axios.post("http://localhost:5000/finger_counting/count", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("✅ Response from backend:", response.data);
        return { prediction: response.data.prediction, confidence: response.data.confidence };
    } catch (error) {
        console.error("❌ Prediction error:", error.response?.data || error.message);
        return { prediction: "0", confidence: 0 };  // Default to 0 on error
    }
};
