import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function HoursChart({ projects, timeLogs, darkMode }) {

  const labels = projects.map((project) => project.title);

  const hours = projects.map((project) => {

    return timeLogs
      .filter((log) => log.project_id === project.id)
      .reduce((sum, log) => sum + log.hours, 0);

  });

  const data = {
    labels,
    datasets: [
      {
        label: "Hours Worked",
        data: hours,
        backgroundColor: "#8b5cf6",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? "white" : "black",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "white" : "black",
        },
      },
      y: {
        ticks: {
          color: darkMode ? "white" : "black",
        },
      },
    },
  };

  return (
    <div
      style={{
        background: darkMode ? "#1e293b" : "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: darkMode ? "white" : "black" }}>
        Hours Per Project
      </h2>

      <Bar data={data} options={options} />
    </div>
  );
}

export default HoursChart;