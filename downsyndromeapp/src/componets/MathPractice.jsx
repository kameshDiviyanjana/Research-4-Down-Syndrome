import React, { useState } from "react";
import axios from "axios";
import "./MathPractice.css";

function MathPractice() {
  const [problem, setProblem] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProblem = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/generate-problem");
      setProblem(response.data.problem);
      setCorrectAnswer(response.data.correct_answer);
      setFeedback(null);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error fetching problem:", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFeedback(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile || !problem || correctAnswer === null) {
      alert("Please generate a problem and upload your answer!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("problem", problem);
    formData.append("correct_answer", correctAnswer);

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/math-practice", formData);
      setFeedback(response.data.feedback);
    } catch (error) {
      console.error("Error during practice:", error);
      alert("An error occurred while checking the answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="math-practice-card">
      <h2>Math Practice</h2>
      <button className="animated-button" onClick={fetchProblem}>
        Get New Problem
      </button>
      {problem && <p className="problem-display">Problem: {problem}</p>}
      <input type="file" className="file-input" onChange={handleFileChange} />
      <button
        className={`animated-button ${loading ? "loading" : ""}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Checking..." : "Submit"}
      </button>
      {feedback && ( 
        <div className={`feedback-message ${feedback.includes("Correct") ? "success" : "error"}`}>
          {feedback}
        </div>
      )}
    </div>
  );
}

export default MathPractice;
