import { useEffect, useState } from "react";
import axios from "axios";

import ProjectStatusChart from "../components/ProjectStatusChart";
import RevenueChart from "../components/RevenueChart";
import HoursChart from "../components/HoursChart";
import MilestoneChart from "../components/MilestoneChart";

function Analytics({ darkMode }) {
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [timeLogs, setTimeLogs] = useState([]);
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://127.0.0.1:5000/invoices")
      .then((response) => setInvoices(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://127.0.0.1:5000/time-logs")
      .then((response) => setTimeLogs(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://127.0.0.1:5000/milestones")
      .then((response) => setMilestones(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: darkMode ? "#0f172a" : "#f8fafc",
        color: darkMode ? "white" : "black",
        minHeight: "100vh",
      }}
    >
      <h1>📊 Analytics Dashboard</h1>

      <p>
        View project insights, revenue reports and productivity statistics.
      </p>

      {/* Summary Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "30px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            background: darkMode ? "#1e293b" : "white",
            color: darkMode ? "white" : "black",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h3>💰 Revenue</h3>
          <h2>
            ₹
            {invoices.reduce(
              (sum, invoice) => sum + invoice.total_amount,
              0
            )}
          </h2>
        </div>

        <div
          style={{
            background: darkMode ? "#1e293b" : "white",
            color: darkMode ? "white" : "black",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h3>📁 Projects</h3>
          <h2>{projects.length}</h2>
        </div>

        <div
          style={{
            background: darkMode ? "#1e293b" : "white",
            color: darkMode ? "white" : "black",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h3>⏱ Hours Logged</h3>
          <h2>
            {timeLogs.reduce((sum, log) => sum + log.hours, 0)}
          </h2>
        </div>

        <div
          style={{
            background: darkMode ? "#1e293b" : "white",
            color: darkMode ? "white" : "black",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h3>🎯 Milestones</h3>
          <h2>{milestones.length}</h2>
        </div>
      </div>

      {/* Charts */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "30px",
        }}
      >
        <ProjectStatusChart projects={projects} />

        <RevenueChart
          invoices={invoices}
          projects={projects}
          darkMode={darkMode}
        />

        <HoursChart
          projects={projects}
          timeLogs={timeLogs}
          darkMode={darkMode}
        />

        <MilestoneChart
          milestones={milestones}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default Analytics;