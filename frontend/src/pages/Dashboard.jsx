import { useEffect, useState } from "react";
import axios from "axios";
function Dashboard({darkMode}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [projects, setProjects] = useState([]);
  const [timeLogs, setTimeLogs] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const projectRes = await axios.get("http://127.0.0.1:5000/projects");
    const timeLogRes = await axios.get("http://127.0.0.1:5000/time-logs");
    const milestoneRes = await axios.get("http://127.0.0.1:5000/milestones");
    const invoiceRes = await axios.get("http://127.0.0.1:5000/invoices");
    setProjects(projectRes.data);
    setTimeLogs(timeLogRes.data);
    setMilestones(milestoneRes.data);
    setInvoices(invoiceRes.data);
  } catch (error) {
    console.log(error);
  }
};
console.log("Invoices:", invoices);
console.log(
  "Revenue:",
  invoices.reduce((total, invoice) => total + invoice.total_amount, 0)
);
  return (
    <div
  style={{
    padding: "20px",
    backgroundColor: darkMode ? "#0f172a" : "#ffffff",
    minHeight: "100vh",
    color: darkMode ? "white" : "black",
    transition: "0.3s",
  }}
>
     <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <h1>Freelancer Project Management Dashboard</h1>

  <div>
    {user ? (
      <>
        <span
          style={{
            marginRight: "15px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          👋 Welcome, {user.name}
        </span>

        <button
          onClick={() => {
           localStorage.removeItem("user");
           window.location.href = "/";
          }}
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "red",
            color: "white",
          }}
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <button
          onClick={() => (window.location.href = "/login")}
          style={{
            marginRight: "10px",
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#2563eb",
            color: "white",
          }}
        >
          Login
        </button>

        <button
          onClick={() => (window.location.href = "/register")}
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#16a34a",
            color: "white",
          }}
        >
          Register
        </button>
      </>
    )}
  </div>
</div>

      <div
  style={{
    backgroundColor: darkMode ? "#1e293b" : "#f8fafc",
    color: darkMode ? "white" : "black",  
    transition: "0.3s",
    padding: "20px",
    borderRadius: "12px",
    marginTop: "20px",
    marginBottom: "20px",
  }}
>
 <h2>Freelancer Project Management Dashboard 🚀</h2>
  <p>
    Manage your projects, milestones, time logs and invoices from one dashboard.
  </p>
</div>

      <div
        style={{
         display: "grid",
         gridTemplateColumns: "repeat(2, 1fr)",
         gap: "20px",
         marginTop: "20px"
        }}
      >
        <div
          style={{
            backgroundColor: darkMode ? "#1e293b" : "#e0f2fe",
            color: darkMode ? "white" : "black",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
            boxShadow:"0px 4px 10px rgba(0,0,0,0.15)",
            transition: "0.3s",
            cursor: "pointer",
          }}
        >
          <h3>📁 Total Projects</h3>
          <p
  style={{
    fontSize: "32px",
    fontWeight: "bold",
    marginTop: "10px",
  }}
>
  {projects.length}
</p>
        </div>

        <div
          style={{
            backgroundColor: darkMode ? "#1e293b" : "#dcfce7",
            color: darkMode ? "white" : "black",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
            flex: "1",
            boxShadow:"0px 4px 10px rgba(0,0,0,0.15)",
            transition: "0.3s",
            cursor: "pointer",
          }}
        >
          <h3>⏱ Total Hours</h3>
          <p
  style={{
    fontSize: "32px",
    fontWeight: "bold",
    marginTop: "10px",
  }}
>
  {timeLogs.reduce(
    (total, log) => total + log.hours,
    0
  )}
</p>
        </div>

        <div
          style={{
            backgroundColor: darkMode ? "#1e293b" : "#fef3c7",
            color: darkMode ? "white" : "black",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
            boxShadow:"0px 4px 10px rgba(0,0,0,0.15)",
            transition: "0.3s",
            cursor: "pointer",
          }}
        >
          <h3>💰 Total Revenue</h3>
         <p
  style={{
    fontSize: "32px",
    fontWeight: "bold",
    marginTop: "10px",
  }}
>
  ₹
{
  invoices.reduce(
    (total, invoice) => total + invoice.total_amount,
    0
  )
}
</p>
        </div>
                <div
          style={{
            backgroundColor: darkMode ? "#1e293b" : "#f3e8ff",
            color: darkMode ? "white" : "black",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
            transition: "0.3s",
            cursor: "pointer",
          }}
        >
          <h3>🎯 Milestones</h3>

          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            {milestones.length}
          </p>
        </div>

      </div> {/* <-- CLOSE THE GRID HERE */}

      {/* Pie Chart */}

    </div>
  );
}      

export default Dashboard;