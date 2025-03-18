// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale
// );

// const LineChart = ({ lastResult, currentResult }) => {
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     // Prepare chart data
//     setChartData({
//       labels: ["Last Result", "Current Result"], // Labels for the x-axis
//       datasets: [
//         {
//           label: "Confidence",
//           data: [lastResult.confidence, currentResult.confidence], // Data for the y-axis (confidence values)
//           borderColor: "rgba(75, 192, 192, 1)", // Line color
//           backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color under the line
//           fill: true, // Fill the area under the line
//           tension: 0.4, // Smoothness of the line
//         },
//         {
//           label: "Cluster",
//           data: [lastResult.cluster, currentResult.cluster], // Data for the y-axis (cluster values)
//           borderColor: "rgba(255, 99, 132, 1)", // Line color for cluster
//           backgroundColor: "rgba(255, 99, 132, 0.2)", // Fill color for cluster
//           fill: true, // Fill the area under the line
//           tension: 0.4, // Smoothness of the line
//         },
//       ],
//     });
//   }, [lastResult, currentResult]);

//   return (
//     <div>
//       <h2 className="text-center">Last Result vs Current Result</h2>
//       <Line data={chartData} />
//     </div>
//   );
// };

// export default LineChart;

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const LineChart = ({ lastResult, currentResult }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Check if lastResult and currentResult are defined and have the necessary properties
    if (
      lastResult &&
      currentResult &&
      lastResult.confidence !== undefined &&
      currentResult.confidence !== undefined
    ) {
      setChartData({
        labels: ["Last Result", "Current Result"], // Labels for the x-axis
        datasets: [
          {
            label: "Confidence",
            data: [lastResult.confidence, currentResult.confidence], // Data for the y-axis (confidence values)
            borderColor: "rgba(75, 192, 192, 1)", // Line color
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color under the line
            fill: true, // Fill the area under the line
            tension: 0.4, // Smoothness of the line
          },
          {
            label: "Cluster",
            data: [lastResult.cluster, currentResult.cluster], // Data for the y-axis (cluster values)
            borderColor: "rgba(255, 99, 132, 1)", // Line color for cluster
            backgroundColor: "rgba(255, 99, 132, 0.2)", // Fill color for cluster
            fill: true, // Fill the area under the line
            tension: 0.4, // Smoothness of the line
          },
        ],
      });
    } else {
      console.warn("Invalid data for chart", { lastResult, currentResult });
    }
  }, [lastResult, currentResult]);

  return (
    <div>
      <h2 className="text-center">Last Result vs Current Result</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;

