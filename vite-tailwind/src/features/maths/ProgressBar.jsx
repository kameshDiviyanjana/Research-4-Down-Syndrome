import React from "react";
import useProgressStore from "../maths/store/progressStore"; // Adjust path as needed
import { Line } from "react-chartjs-2"; // Import Line chart from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; // Import Chart.js components

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressBar = () => {
    const progress = useProgressStore((state) => state.progress); // Access progress array from Zustand store

    // Function to calculate overall progress
    const calculateOverallProgress = () => {
        if (progress.length === 0) return { labels: [], data: [], totalProgress: 0 };

        // Sort progress by timestamp to ensure chronological order
        const sortedProgress = [...progress].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        let cumulativeCorrect = 0;
        let cumulativeTotal = 0;
        const percentages = [];

        sortedProgress.forEach(({ count }) => {
            cumulativeTotal += 1;
            if (count === 1) {
                cumulativeCorrect += 1;
            }
            const percentage = cumulativeTotal > 0 ? Math.round((cumulativeCorrect / cumulativeTotal) * 100) : 0;
            percentages.push(percentage);
        });

        // Calculate total progress by summing percentages and dividing by 100
        const totalProgress = percentages.length > 0 
            ? Math.round(percentages.reduce((sum, val) => sum + val, 0) / 100)
            : 0;

        return {
            labels: percentages.length > 0 ? ["Overall"] : [], // Single label for the chart
            data: percentages.length > 0 ? [totalProgress] : [], // Single value for the chart
            totalProgress, // Store the computed value
        };
    };

    // Function to calculate per-activity progress (unchanged)
    const calculateProgress = () => {
        const progressData = {};
        const MAX_ATTEMPTS = 100; // Define a fixed total for scaling

        progress.forEach(({ practiceType, count }) => {
            if (!progressData[practiceType]) {
                progressData[practiceType] = { total: 0, correct: 0 };
            }
            progressData[practiceType].total += 1;
            if (count === 1) {
                progressData[practiceType].correct += 1;
            }
        });

        Object.keys(progressData).forEach((activity) => {
            const { correct } = progressData[activity];
            progressData[activity].completion = Math.min(100, Math.round((correct / MAX_ATTEMPTS) * 100));
        });

        return progressData;
    };

    const overallProgress = calculateOverallProgress();
    const progressData = calculateProgress();

    console.log("overallP", overallProgress);

    // Line chart data
    const lineChartData = {
        labels: overallProgress.labels, // Single label: "Overall"
        datasets: [
            {
                label: "Overall Progress",
                data: overallProgress.data, // Single value: totalProgress
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)", // Teal
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.1, // Slight curve (not very relevant with one point)
                pointRadius: 5, // Larger point for visibility
            },
        ],
    };

    // Line chart options
    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Allows custom height
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Overall Progress",
                font: {
                    size: 18,
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => `Overall Progress: ${context.raw}`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: Math.max(100, overallProgress.totalProgress), // Adjust max to fit value
                title: {
                    display: true,
                    text: "Progress",
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
            <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">📊 Child Progress</h2>

            {/* Line Chart Section */}
            <div className="mb-8 h-80">
                {progress.length === 0 ? (
                    <p className="text-gray-600 text-center">No progress recorded yet!</p>
                ) : (
                    <Line data={lineChartData} options={lineChartOptions} />
                )}
            </div>

            {/* Per-Activity Progress Bars */}
            {Object.keys(progressData).length === 0 ? (
                <p className="text-gray-600 text-center">No activity-specific progress recorded yet!</p>
            ) : (
                Object.keys(progressData).map((activity) => (
                    <div key={activity} className="mb-6">
                        <span className="block text-lg font-semibold text-indigo-600 uppercase mb-2">
                            {activity}
                        </span>
                        <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 text-white text-center text-sm font-medium transition-all duration-300 ease-in-out"
                                style={{ width: `${progressData[activity].completion}%` }}
                            >
                                {progressData[activity].completion}%
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                            Correct: {progressData[activity].correct} / Total: {progressData[activity].total}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProgressBar;