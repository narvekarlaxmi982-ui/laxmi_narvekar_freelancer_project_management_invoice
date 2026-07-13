import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function ProjectStatusChart({ projects }) {
  const statusCount = {
    Pending: 0,
    "In Progress": 0,
    Completed: 0,
  };

  projects.forEach((project) => {
    if (statusCount[project.status] !== undefined) {
      statusCount[project.status]++;
    }
  });

  const data = [
    { name: "Pending", value: statusCount.Pending },
    { name: "In Progress", value: statusCount["In Progress"] },
    { name: "Completed", value: statusCount.Completed },
  ];

  const COLORS = ["#f59e0b", "#3b82f6", "#22c55e"];

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Project Status</h2>

      <PieChart width={420} height={320}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default ProjectStatusChart;