import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ProjectStatusChart({ projects=[] }) {

  const pending = projects.filter(
    p => p.status === "Pending"
  ).length;

  const progress = projects.filter(
    p => p.status === "In Progress"
  ).length;

  const completed = projects.filter(
    p => p.status === "Completed"
  ).length;

  const data = {
    labels: [
      "Pending",
      "In Progress",
      "Completed",
    ],
    datasets: [
      {
        data: [
          pending,
          progress,
          completed,
        ],
        backgroundColor: [
          "#f59e0b",
          "#3b82f6",
          "#22c55e",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        width: "400px",
      }}
    >
      <h2>Project Status</h2>

      <Pie data={data} />
    </div>
  );
}

export default ProjectStatusChart;