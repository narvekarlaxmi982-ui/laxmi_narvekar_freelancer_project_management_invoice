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

function RevenueChart({ invoices,projects,darkMode }) {

  const data = {
    labels: invoices.map((invoice) => {
  const project = projects.find(
    (p) => p.id === invoice.project_id
  );

  return project ? project.title : `Invoice ${invoice.id}`;
}),

    datasets: [
      {
        label: "Revenue (₹)",
        data: invoices.map((invoice) => invoice.total_amount),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Revenue Overview</h2>

      <Bar data={data} />
    </div>
  );
}

export default RevenueChart;