import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function MilestoneChart({ milestones, darkMode }) {

  const completed = milestones.filter(
    (m) => m.status === "Completed"
  ).length;

  const pending = milestones.filter(
    (m) => m.status !== "Completed"
  ).length;

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: [
          "#22c55e",
          "#f59e0b",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
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
      <h2
        style={{
          color: darkMode ? "white" : "black",
        }}
      >
        Milestone Status
      </h2>

      <Doughnut
        data={data}
        options={options}
      />
    </div>
  );
}

export default MilestoneChart;