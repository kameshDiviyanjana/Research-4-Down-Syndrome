import React, { useEffect, useState, useCallback } from "react";
import { Line } from "react-chartjs-2"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; 

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressBar = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoized fetch function
  const fetchProgress = useCallback(async () => {
    const userId = localStorage.getItem("userid");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8005/api/progress/progress/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Full API response:", data);

      if (response.ok) {
        const progressData = data.data || []; // Adjusted to match API response key 'data'
        console.log("Fetched progress:", progressData);
        setProgress(progressData);
        setLoading(false);
      } else {
        console.error("Failed to fetch progress:", data.error || data.message);
        setError(data.error || "Failed to fetch progress");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
      setError(error.message || "Network error");
      setLoading(false);
    }
  }, []);

  // Fetch progress data on component mount
  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Filter progress for skillType: "Maths"
  const mathProgress = progress.filter((entry) => entry.skillType === "Maths");

  // Function to calculate overall progress for Maths
  const calculateOverallProgress = () => {
    if (mathProgress.length === 0) return { labels: [], data: [], totalProgress: 0 };

    // Sum all scores
    const rawTotalProgress = mathProgress.reduce((sum, entry) => sum + entry.score, 0);
    // Clamp the value to 0–100 for chart display
    const totalProgress = Math.min(100, Math.max(0, rawTotalProgress));

    return {
      labels: ["Overall Progress"], 
      data: [totalProgress], 
      totalProgress: rawTotalProgress, 
    };
  };

  // Function to calculate per-subSkill progress
  const calculateProgress = () => {
    const progressData = {};
    const MAX_ATTEMPTS = 100; 

    mathProgress.forEach(({ subSkill, score }) => {
      if (!progressData[subSkill]) {
        progressData[subSkill] = { total: 0, correct: 0 };
      }
      progressData[subSkill].total += 1;
      if (score === 1) {
        progressData[subSkill].correct += 1;
      }
    });

    Object.keys(progressData).forEach((subSkill) => {
      const { correct } = progressData[subSkill];
      progressData[subSkill].completion = Math.min(100, Math.round((correct / MAX_ATTEMPTS) * 100));
    });

    return progressData;
  };

  const overallProgress = calculateOverallProgress();
  const progressData = calculateProgress();


  // Line chart data
  const lineChartData = {
    labels: overallProgress.labels, 
    datasets: [
      {
        label: "Maths Progress",
        data: overallProgress.data, 
        borderColor: "rgba(75, 192, 192, 1)", 
        backgroundColor: "rgba(75, 192, 192, 0.2)", 
        fill: false,
        tension: 0, 
        pointRadius: 8, 
        pointHoverRadius: 10,
      },
    ],
  };

  // Line chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Overall Maths Progress",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `Total Score: ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        min: 0, // Set y-axis minimum to 0
        max: 100, // Set y-axis maximum to 100
        title: {
          display: true,
          text: "Total Score",
        },
      },
      x: {
        title: {
          display: true,
          text: "Category",
        },
      },
    },
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">📊 Maths Progress</h2>

      {/* Error or Loading State */}
      {error && (
        <p className="text-red-600 text-center mb-4">
          Error: {error}. Please check your authentication and try again.
        </p>
      )}
      {loading && (
        <p className="text-gray-600 text-center mb-4">Loading progress...</p>
      )}

      {/* Line Chart Section */}
      <div className="mb-8 h-80">
        {!loading && mathProgress.length === 0 && !error ? (
          <p className="text-gray-600 text-center">No Maths progress recorded yet!</p>
        ) : (
          <Line data={lineChartData} options={lineChartOptions} />
        )}
      </div>

      {/* Per-SubSkill Progress Bars */}
      {!loading && Object.keys(progressData).length === 0 && !error ? (
        <p className="text-gray-600 text-center">No activity-specific progress recorded yet!</p>
      ) : (
        Object.keys(progressData).map((subSkill) => (
          <div key={subSkill} className="mb-6">
            <span className="block text-lg font-semibold text-indigo-600 uppercase mb-2">
              {subSkill}
            </span>
            <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 text-white text-center text-sm font-medium transition-all duration-300 ease-in-out"
                style={{ width: `${progressData[subSkill].completion}%` }}
              >
                {progressData[subSkill].completion}%
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Correct: {progressData[subSkill].correct} / Total: {progressData[subSkill].total}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProgressBar;