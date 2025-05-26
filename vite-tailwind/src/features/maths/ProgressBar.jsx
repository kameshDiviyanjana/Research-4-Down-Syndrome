import React, { useEffect, useState, useCallback } from "react";
import { fetchProgressData } from "./services/progressService";
import { getLanguagePreference } from "../../services/languageService"; // Import language service
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

// Translations for English and Sinhala
const translations = {
  en: {
    title: "Maths Progress Dashboard",
    subtitle: "Track your progress and master your Maths skills!",
    errorMessage: "Error: User not authenticated. Please log in.",
    loadingMessage: "Loading progress...",
    noProgressMessage: "No Maths progress recorded yet! Start practicing to see your progress.",
    noSubSkillMessage: "No activity-specific progress recorded yet!",
    lineChartTitle: "Maths Progress Over Time",
    lineChartYLabel: "Cumulative Score",
    lineChartXLabel: "Date",
    barChartTitle: "Skill Breakdown",
    barChartYLabel: "Completion (%)",
    barChartXLabel: "Sub-Skill",
    lineChartTooltipLabel: "Score",
    barChartTooltipLabel: "Completion",
  },
  si: {
    title: "දරුවාගේ ගණිත ප්‍රගතිය",
    subtitle: "ඔබේ ප්‍රගතිය ලුහුබඳින්න සහ ඔබේ ගණිත කුසලතා ප්‍රගුණ කරන්!",
    errorMessage: "දෝෂය: පරිශීලකයා සත්‍යාපනය වී නැත. කරුණාකර ලොග් වන්න.",
    loadingMessage: "ප්‍රගතිය පූරණය වෙමින්...",
    noProgressMessage: "තවම ගණිත ප්‍රගතිය වාර්තා වී නැත! ඔබේ ප්‍රගතිය බැලීමට පුහුණුවීම ආරම්භ කරන්න.",
    noSubSkillMessage: "තවම ක්‍රියාකාරකම්-විශේෂිත ප්‍රගතිය වාර්තා වී නැත!",
    lineChartTitle: "කාලයත් සමඟ ගණිත ප්‍රගතිය",
    lineChartYLabel: "සමුච්චිත ලකුණු",
    lineChartXLabel: "දිනය",
    barChartTitle: "කුසලතා ප්‍රදර්ශනය",
    barChartYLabel: "සම්පූර්ණත්වය (%)",
    barChartXLabel: "උප-කුසලතා",
    lineChartTooltipLabel: "ලකුණු",
    barChartTooltipLabel: "සම්පූර්ණත්වය",
  },
};

const ProgressBar = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en"); 

  // Memoized fetch function for progress data
  const fetchProgress = useCallback(async () => {
    const userId = localStorage.getItem("userid");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      setError(translations[language].errorMessage);
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
  }, [language]);

  // Fetch language preference and progress data
  useEffect(() => {
    const fetchLanguageAndProgress = async () => {
      const userId = localStorage.getItem("userid");
      try {
        const response = await getLanguagePreference(userId);
        console.log("Fetched language:", response.data.data.language);
        if (response.data.status === "success") {
          setLanguage(response.data.data.language || "en");
        }
      } catch (err) {
        console.error("Error fetching language:", err);
        if (err.response?.status === 404 || err.response?.status === 500) {
          setLanguage("en");
        }
      } finally {
        // Fetch progress after language is set
        fetchProgress();
      }
    };

    fetchLanguageAndProgress();
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
      new Date(entry.updatedAt).toISOString().split("T")[0]
    );
    let cumulativeScore = 0;
    const scores = sortedProgress.map((entry) => {
      cumulativeScore += entry.score; // Add score (1 or -1)
      return Math.min(100, Math.max(0, cumulativeScore));
    });
    const dates = labels; // Same as labels for tooltips

    console.log("Labels (dates):", labels);
    console.log("Cumulative scores:", scores);
    console.log("Dates array:", dates);
    return { labels, scores, dates };
  };

  // Calculate per-subSkill progress
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
        label: translations[language].lineChartTitle,
        data: scores,
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: false,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
      },
    ],
  };

  // Line chart options with translated labels
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14, family: "'Inter', sans-serif" },
          color: "#1f2937", 
        },
      },
      title: {
        display: true,
        text: translations[language].lineChartTitle,
        font: { size: 18, family: "'Inter', sans-serif", weight: "bold" },
        color: "#1f2937",
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleFont: { family: "'Inter', sans-serif" },
        bodyFont: { family: "'Inter', sans-serif" },
        callbacks: {
          label: (context) => `${translations[language].lineChartTooltipLabel}: ${context.raw}`,
          title: (tooltipItems) => {
            if (tooltipItems.length > 0 && dates[tooltipItems[0].dataIndex]) {
              return `${translations[language].lineChartXLabel}: ${dates[tooltipItems[0].dataIndex]}`;
            }
            return `${translations[language].lineChartXLabel}: N/A`;
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
          text: translations[language].lineChartYLabel,
          font: { size: 14, family: "'Inter', sans-serif" },
          color: "#1f2937",
        },
        grid: { color: "#e5e7eb" },
      },
      x: {
        title: {
          display: true,
          text: translations[language].lineChartXLabel,
          font: { size: 14, family: "'Inter', sans-serif" },
          color: "#1f2937",
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          maxTicksLimit: 10,
          font: { size: 12, family: "'Inter', sans-serif" },
          color: "#4b5563",
        },
        grid: { display: false },
      },
    },
  };

  // Bar chart data for Skill Breakdown
  const barChartData = {
    labels: Object.keys(progressData),
    datasets: [
      {
        label: translations[language].barChartTitle,
        data: Object.values(progressData).map((data) => data.completion),
        backgroundColor: Object.keys(progressData).map((_, index) => [
          "rgba(59, 130, 246, 0.8)", // blue-500
          "rgba(20, 184, 166, 0.8)", // teal-500
          "rgba(139, 92, 246, 0.8)", // purple-500
          "rgba(249, 115, 22, 0.8)", // orange-500
        ][index % 4]),
        borderColor: Object.keys(progressData).map((_, index) => [
          "rgba(59, 130, 246, 1)",
          "rgba(20, 184, 166, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(249, 115, 22, 1)",
        ][index % 4]),
        borderWidth: 1,
        hoverBackgroundColor: Object.keys(progressData).map((_, index) => [
          "rgba(37, 99, 235, 0.8)", // blue-600
          "rgba(13, 148, 136, 0.8)", // teal-600
          "rgba(124, 58, 237, 0.8)", // purple-600
          "rgba(234, 88, 12, 0.8)", // orange-600
        ][index % 4]),
        hoverBorderColor: Object.keys(progressData).map((_, index) => [
          "rgba(37, 99, 235, 1)",
          "rgba(13, 148, 136, 1)",
          "rgba(124, 58, 237, 1)",
          "rgba(234, 88, 12, 1)",
        ][index % 4]),
      },
    ],
  };

  // Bar chart options with translated labels
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14, family: "'Inter', sans-serif" },
          color: "#1f2937",
        },
      },
      title: {
        display: true,
        text: translations[language].barChartTitle,
        font: { size: 18, family: "'Inter', sans-serif", weight: "bold" },
        color: "#1f2937",
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleFont: { family: "'Inter', sans-serif" },
        bodyFont: { family: "'Inter', sans-serif" },
        callbacks: {
          label: (context) => `${translations[language].barChartTooltipLabel}: ${context.raw}%`,
          title: (context) => {
            if (context.length > 0) {
              return `${translations[language].barChartXLabel}: ${context[0].label}`;
            }
            return `${translations[language].barChartXLabel}: N/A`;
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
          text: translations[language].barChartYLabel,
          font: { size: 14, family: "'Inter', sans-serif" },
          color: "#1f2937",
        },
        grid: { color: "#e5e7eb" },
      },
      x: {
        title: {
          display: true,
          text: translations[language].barChartXLabel,
          font: { size: 14, family: "'Inter', sans-serif" },
          color: "#1f2937",
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: { size: 12, family: "'Inter', sans-serif" },
          color: "#4b5563",
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
              {translations[language].title}
            </span>
          </h1>
         
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          {/* Error or Loading State */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center animate-fade-in">
              {translations[language].errorMessage}
            </div>
          )}
          {loading && (
            <div className="mb-6 p-4 bg-blue-100 text-blue-700 rounded-lg text-center animate-pulse">
              {translations[language].loadingMessage}
            </div>
          )}

          {/* Line Chart Section */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {translations[language].lineChartTitle}
          </h2>
          <div className="h-96 bg-gray-50 rounded-lg p-4 mb-12 transition-all duration-300 hover:bg-gray-100">
            {!loading && mathProgress.length === 0 && !error ? (
              <p className="text-gray-600 text-center text-lg font-medium">
                {translations[language].noProgressMessage}
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
            {translations[language].barChartTitle}
          </h2>
          <div className="h-96 bg-gray-50 rounded-lg p-4 transition-all duration-300 hover:bg-gray-100 animate-fade-in">
            {!loading && Object.keys(progressData).length === 0 && !error ? (
              <p className="text-gray-600 text-center text-lg font-medium">
                {translations[language].noSubSkillMessage}
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