import React, { useEffect, useState, useCallback } from "react";
import { fetchProgressData } from './services/progressService';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

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

    const { data, error } = await fetchProgressData(userId, token);
    console.log("Full API response:", data);

    if (error) {
      console.error("Failed to fetch progress:", error);
      setError(error);
      setLoading(false);
    } else {
      console.log("Fetched progress:", data);
      setProgress(data);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Filter progress for skillType: "Maths"
  const mathProgress = progress.filter((entry) => entry.skillType === "Maths");

  // Prepare data for line chart
  const prepareLineChartData = () => {
    if (mathProgress.length === 0) {
      return { labels: [], scores: [], dates: [] };
    }

    // Sort progress by updatedAt to ensure chronological order
    const sortedProgress = [...mathProgress].sort(
      (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
    );

    // Extract labels (dates), cumulative scores, and formatted dates
    const labels = sortedProgress.map((entry) =>
      new Date(entry.updatedAt).toISOString().split('T')[0]
    );
    // Calculate cumulative score
    let cumulativeScore = 0;
    const scores = sortedProgress.map((entry) => {
      cumulativeScore += entry.score; // Add score (1 or -1)
      return Math.min(100, Math.max(0, cumulativeScore)); // Clamp to 0–100
    });
    const dates = labels; // Same as labels for tooltips

    console.log("Labels (dates):", labels);
    console.log("Cumulative scores:", scores);
    console.log("Dates array:", dates);
    return { labels, scores, dates };
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

  const { labels, scores, dates } = prepareLineChartData();
  const progressData = calculateProgress();

  // Line chart data
  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Cumulative Maths Score",
        data: scores,
        borderColor: "rgba(59, 130, 246, 1)", // Tailwind blue-500
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: false,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
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
        labels: {
          font: { size: 14, family: "'Inter', sans-serif" },
          color: "#1f2937", // Tailwind gray-800
        },
      },
      title: {
        display: true,
        text: "Maths Progress Over Time",
        font: { size: 18, family: "'Inter', sans-serif", weight: "bold" },
        color: "#1f2937", // Tailwind gray-800
      },
      tooltip: {
        backgroundColor: "#1f2937", // Tailwind gray-800
        titleFont: { family: "'Inter', sans-serif" },
        bodyFont: { family: "'Inter', sans-serif" },
        callbacks: {
          label: (context) => `Score: ${context.raw}`,
          title: (tooltipItems) => {
            console.log("TooltipItems:", tooltipItems);
            if (tooltipItems.length > 0 && dates[tooltipItems[0].dataIndex]) {
              return `Date: ${dates[tooltipItems[0].dataIndex]}`;
            }
            return "Date: N/A";
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Cumulative Score",
          font: { size: 14, family: "'Inter', sans-serif" },
          color: "#1f2937", // Tailwind gray-800
        },
        grid: { color: "#e5e7eb" }, // Tailwind gray-200
      },
      x: {
        title: {
          display: true,
          text: "Date",
          font: { size: 14, family: "'Inter', sans-serif" },
          color: "#1f2937", // Tailwind gray-800
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          maxTicksLimit: 10,
          font: { size: 12, family: "'Inter', sans-serif" },
          color: "#4b5563", // Tailwind gray-600
        },
        grid: { display: false },
      },
    },
  };

  // Define four colors for sub-skills
  const subSkillColors = [
    {
      background: "rgba(59, 130, 246, 0.8)", // Tailwind blue-500
      border: "rgba(59, 130, 246, 1)",
      hoverBackground: "rgba(37, 99, 235, 0.8)", // Tailwind blue-600
      hoverBorder: "rgba(37, 99, 235, 1)",
    },
    {
      background: "rgba(20, 184, 166, 0.8)", // Tailwind teal-500
      border: "rgba(20, 184, 166, 1)",
      hoverBackground: "rgba(13, 148, 136, 0.8)", // Tailwind teal-600
      hoverBorder: "rgba(13, 148, 136, 1)",
    },
    {
      background: "rgba(139, 92, 246, 0.8)", // Tailwind purple-500
      border: "rgba(139, 92, 246, 1)",
      hoverBackground: "rgba(124, 58, 237, 0.8)", // Tailwind purple-600
      hoverBorder: "rgba(124, 58, 237, 1)",
    },
    {
      background: "rgba(249, 115, 22, 0.8)", // Tailwind orange-500
      border: "rgba(249, 115, 22, 1)",
      hoverBackground: "rgba(234, 88, 12, 0.8)", // Tailwind orange-600
      hoverBorder: "rgba(234, 88, 12, 1)",
    },
  ];

  // Bar chart data for Skill Breakdown
  const barChartData = {
    labels: Object.keys(progressData),
    datasets: [
      {
        label: "Sub-Skill Completion",
        data: Object.values(progressData).map((data) => data.completion),
        backgroundColor: Object.keys(progressData).map((_, index) => subSkillColors[index % 4].background),
        borderColor: Object.keys(progressData).map((_, index) => subSkillColors[index % 4].border),
        borderWidth: 1,
        hoverBackgroundColor: Object.keys(progressData).map((_, index) => subSkillColors[index % 4].hoverBackground),
        hoverBorderColor: Object.keys(progressData).map((_, index) => subSkillColors[index % 4].hoverBorder),
      },
    ],
  };

  // Bar chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14, family: "'Inter', sans-serif" },
          color: "#1f2937", // Tailwind gray-800
        },
      },
      title: {
        display: true,
        text: "Skill Breakdown",
        font: { size: 18, family: "'Inter', sans-serif", weight: "bold" },
        color: "#1f2937", // Tailwind gray-800
      },
      tooltip: {
        backgroundColor: "#1f2937", // Tailwind gray-800
        titleFont: { family: "'Inter', sans-serif" },
        bodyFont: { family: "'Inter', sans-serif" },
        callbacks: {
          label: (context) => `Completion: ${context.raw}%`,
          title: (context) => {
            console.log("Bar TooltipItems:", context);
            if (context.length > 0) {
              return `Sub-Skill: ${context[0].label}`;
            }
            return "Sub-Skill: N/A";
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Completion (%)",
          font: { size: 14, family: "'Inter', sans-serif" },
          color: "#1f2937", // Tailwind gray-800
        },
        grid: { color: "#e5e7eb" }, // Tailwind gray-200
      },
      x: {
        title: {
          display: true,
          text: "Sub-Skill",
          font: { size: 14, family: "'Inter', sans-serif" },
          color: "#1f2937", // Tailwind gray-800
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: { size: 12, family: "'Inter', sans-serif" },
          color: "#4b5563", // Tailwind gray-600
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
              Maths Progress Dashboard
            </span>
          </h1>
          <p className="mt-3 text-lg text-gray-600 font-medium">
            Track your progress and master your Maths skills!
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          {/* Error or Loading State */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center animate-fade-in">
              Error: {error}. Please check your authentication and try again.
            </div>
          )}
          {loading && (
            <div className="mb-6 p-4 bg-blue-100 text-blue-700 rounded-lg text-center animate-pulse">
              Loading progress...
            </div>
          )}

          {/* Line Chart Section */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Progress Over Time
          </h2>
          <div className="h-96 bg-gray-50 rounded-lg p-4 mb-12 transition-all duration-300 hover:bg-gray-100">
            {!loading && mathProgress.length === 0 && !error ? (
              <p className="text-gray-600 text-center text-lg font-medium">
                No Maths progress recorded yet! Start practicing to see your progress.
              </p>
            ) : (
              <Line data={lineChartData} options={lineChartOptions} />
            )}
          </div>

          {/* Skill Breakdown Bar Chart */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Skill Breakdown
          </h2>
          <div className="h-96 bg-gray-50 rounded-lg p-4 transition-all duration-300 hover:bg-gray-100 animate-fade-in">
            {!loading && Object.keys(progressData).length === 0 && !error ? (
              <p className="text-gray-600 text-center text-lg font-medium">
                No activity-specific progress recorded yet!
              </p>
            ) : (
              <Bar data={barChartData} options={barChartOptions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;