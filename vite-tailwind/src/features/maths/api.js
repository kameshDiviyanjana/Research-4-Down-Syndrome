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
        return response.data.prediction;
    } catch (error) {
        console.error("❌ Prediction error:", error.response?.data || error.message);
        return null;
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
