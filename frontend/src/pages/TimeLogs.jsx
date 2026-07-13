import { useState, useEffect } from "react";
import axios from "axios";

function TimeLogs({darkMode}) {
  const [projectId, setProjectId] = useState("");
  const [hours, setHours] = useState("");
  const [workDescription, setWorkDescription] = useState("");

  const [timeLogs, setTimeLogs] = useState([]);
  const [editHours, setEditHours] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [projects, setProjects] = useState([]);

  // Fetch all logs
useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const projectRes = await axios.get("http://127.0.0.1:5000/projects");
    const timeLogRes = await axios.get("http://127.0.0.1:5000/time-logs");

    setProjects(projectRes.data);
    setTimeLogs(timeLogRes.data);

  } catch (error) {
    console.log(error);
  }
};

  // Add time log
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:5000/time-log", {
        project_id: projectId,
        hours: hours,
        work_description: workDescription,
      });

      alert("Time Log Added Successfully");

      setProjectId("");
      setHours("");
      setWorkDescription("");

      // Refresh logs
      const response = await axios.get(
        "http://127.0.0.1:5000/time-logs"
      );

      setTimeLogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [editingId, setEditingId] = useState(null);
  const getProjectName = (id) => {
  const project = projects.find(
    (project) => project.id === id
  );

  return project ? project.title : "Unknown Project";
};
  return (
    <div
  style={{
    padding: "20px",
    backgroundColor: darkMode ? "#0f172a" : "#f8fafc",
    color: darkMode ? "white" : "black",
    minHeight: "100vh",
    transition: "0.3s",
  }}
>
      <h1>Time Logs</h1>

      <form
  onSubmit={handleSubmit}
  style={{
    backgroundColor: darkMode ? "#1e293b" : "white",
    color: darkMode ? "white" : "black",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "30px",
    maxWidth: "500px",
  }}
>
  <h2>Add New Time Log</h2>
       <select
  value={projectId}
  onChange={(e) => setProjectId(e.target.value)}
  style={{
    display: "block",
    marginBottom: "10px",
    padding: "10px",
    width: "320px",
    borderRadius: "8px",
  }}
>
  <option value="">Select Project</option>

  {projects.map((project) => (
    <option
      key={project.id}
      value={project.id}
    >
      {project.title}
    </option>
  ))}
</select>

        <input
          type="number"
          placeholder="Hours Worked"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "10px",
            width: "300px",
          }}
        />

        <textarea
          placeholder="Work Description"
          value={workDescription}
          onChange={(e) => setWorkDescription(e.target.value)}
          style={{
            display: "block",
            marginBottom: "10px",
            width: "300px",
            height: "100px",
            padding: "10px",
          }}
        />

        <button
  type="submit"
  style={{
    backgroundColor: darkMode ? "#1e293b" : "white",
    color: darkMode ? "white" : "black",
    color: darkMode ? "#cbd5e1" : "#555",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  }}
>
  Add Time Log
</button>
      </form>

      <hr />

      <h2>All Time Logs ({timeLogs.length})</h2>

      {timeLogs.map((log) => (
        <div
          key={log.id}
          style={{
            backgroundColor: darkMode ? "#1e293b" : "white",
            color: darkMode ? "white" : "black",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "15px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            maxWidth: "500px",
          }}
        >
          <h3>📁 {getProjectName(log.project_id)}</h3>
          <p>⏱ Hours Worked: {log.hours}</p>
          <p>📝 {log.work_description}</p>
        </div>
      ))}
    </div>
  );
}

export default TimeLogs;