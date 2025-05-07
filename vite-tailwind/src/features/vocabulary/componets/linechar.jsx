

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

    if (
      lastResult &&
      currentResult &&
      lastResult.confidence !== undefined &&
      currentResult.confidence !== undefined
    ) {
      setChartData({
        labels: ["Last Result", "Current Result"], 
        datasets: [
          {
            label: "Confidence",
            data: [lastResult.confidence, currentResult.confidence], 
            borderColor: "rgba(75, 192, 192, 1)", 
            backgroundColor: "rgba(75, 192, 192, 0.2)", 
            fill: true, 
            tension: 0.4, 
          },
          {
            label: "Cluster",
            data: [lastResult.cluster, currentResult.cluster], 
            borderColor: "rgba(255, 99, 132, 1)", 
            backgroundColor: "rgba(255, 99, 132, 0.2)", 
            fill: true, 
            tension: 0.4, 
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

