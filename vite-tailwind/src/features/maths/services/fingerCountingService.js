export const fetchFingerCount = async () => {
  try {
    const response = await fetch("http://localhost:5000/finger_counting/count");
    const data = await response.json();
    return {
      userPrediction: data.finger_count,
      confidence: data.confidence,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching finger count:", error);
    return {
      userPrediction: null,
      confidence: null,
      error: error.message || "Failed to fetch finger count",
    };
  }
};