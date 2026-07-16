import { useState, useEffect } from "react";
import axios from "axios";

function Milestones({darkMode}) {
  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const [projects, setProjects] = useState([]);
  const [milestones, setMilestones] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const projectRes = await axios.get(
        "https://laxmi-freelancer-backend.onrender.com/projects"
      );

      const milestoneRes = await axios.get(
        "https://laxmi-freelancer-backend.onrender.com/milestones"
      );
      console.log("Projects received:", projectRes.data);
      setProjects(projectRes.data);
      console.log("Milestones received:", milestoneRes.data);
      setMilestones(milestoneRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://laxmi-freelancer-backend.onrender.com/create-milestone",
        {
          project_id: projectId,
          title,
          status,
        }
      );

      alert("Milestone Created Successfully");

      setProjectId("");
      setTitle("");
      setStatus("");

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (milestone) => {
    setEditingId(milestone.id);
    setEditTitle(milestone.title);
    setEditStatus(milestone.status);
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `https://laxmi-freelancer-backend.onrender.com/update-milestone/${id}`,
        {
          title: editTitle,
          status: editStatus,
        }
      );

      alert("Milestone Updated Successfully");

      setMilestones(
        milestones.map((milestone) =>
          milestone.id === id
            ? response.data.milestone
            : milestone
        )
      );

      setEditingId(null);
    } catch (error) {
      console.log(error);
    }
  };

const getProjectName = (id) => {
  console.log("Projects:", projects);
  console.log("Searching for project id:", id);

  const project = projects.find(
    (project) => Number(project.id) === Number(id)
  );

  console.log("Found Project:", project);

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
      <h1>Milestones</h1>

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
        <h2>Add New Milestone</h2>

        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          style={{
            display: "block",
            marginBottom: "15px",
            padding: "10px",
            width: "320px",
            borderRadius: "8px",
          }}
        >
          <option value="">Select Project</option>

          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Milestone Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Create Milestone</button>
      </form>

      <hr />

      <h2>All Milestones ({milestones.length})</h2>

      {milestones.map((milestone) => (
        <div
          key={milestone.id}
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
          {editingId === milestone.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <br />
              <br />

              <input
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
              />

              <br />
              <br />

              <button onClick={() => handleSave(milestone.id)}>
                Save
              </button>

              <button
                onClick={() => setEditingId(null)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3
                style={{
                  color: darkMode ? "#cbd5e1" : "#555",
                  fontSize: "22px",
                  marginBottom: "10px",
                }}
              >
                🎯 {milestone.title}
              </h3>

              <p>📁 {getProjectName(milestone.project_id)}</p>

              <p>
                Status:
                <span
                  style={{
                    marginLeft: "5px",
                    fontWeight: "bold",
                    color:
                      milestone.status === "Completed"
                        ? "green"
                        : milestone.status === "In Progress"
                        ? "blue"
                        : "orange",
                  }}
                >
                  {milestone.status}
                </span>
              </p>

              <button onClick={() => handleEdit(milestone)}>
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Milestones;