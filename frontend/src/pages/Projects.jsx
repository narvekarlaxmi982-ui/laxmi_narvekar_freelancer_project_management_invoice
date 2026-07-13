
import { useEffect, useState } from "react";
import axios from "axios";

function Projects({darkMode}) {
  const [projects, setProjects] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  // GET PROJECTS
  useEffect(() => {
  axios
    .get("http://127.0.0.1:5000/projects")
    .then((response) => {
      console.log("Projects received:", response.data);
      setProjects(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);
// ADD PROJECT
const handleAddProject = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/create-project",
      {
        title: title,
        description: description,
        status: status,
      }
    );

    alert("Project Added Successfully");

    setProjects([...projects, response.data.project]);

    setTitle("");
    setDescription("");
    setStatus("Pending");

  } catch (error) {
    console.log(error);
  }
};
  // DELETE PROJECT

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:5000/delete-project/${id}`
      );

      alert("Project Deleted Successfully");

      setProjects(
        projects.filter((project) => project.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT PROJECT
  const handleEdit = (project) => {
    setEditingId(project.id);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setEditStatus(project.status);
  };

  // SAVE PROJECT
  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/update-project/${id}`,
        {
          title: editTitle,
          description: editDescription,
          status: editStatus,
        }
      );

      alert("Project Updated Successfully");

      setProjects(
        projects.map((project) =>
          project.id === id
            ? response.data.project
            : project
        )
      );

      setEditingId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
  style={{
    padding: "20px",
    backgroundColor: darkMode ? "#0f172a" : "#f8fafc",
    minHeight: "100vh",
    color: darkMode ? "white" : "black",
    transition: "0.3s",
  }}
>
      <h1>Projects ({projects.length})</h1>
      <div
  style={{
    backgroundColor: darkMode ? "#1e293b" : "white",
    color: darkMode ? "white" : "black",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  }}
>
  <h2>Add New Project</h2>

  <input
    type="text"
    placeholder="Project Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "8px",
    }}
  />

  <textarea
    placeholder="Project Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "8px",
      height: "80px",
    }}
  />

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "8px",
    }}
  >
    <option>Pending</option>
    <option>In Progress</option>
    <option>Completed</option>
  </select>

 <button
  onClick={handleAddProject}
  style={{
    backgroundColor: darkMode ? "#1e293b" : "white",
    color: darkMode ? "white" : "black",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Add Project
</button>
</div>

      {projects.map((project) => (
        <div
  key={project.id}
  style={{
    backgroundColor: darkMode ? "#1e293b" : "white",
    color: darkMode ? "white" : "black",
    borderRadius: "15px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "0.3s",
    cursor: "pointer",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
  }}
>
          {editingId === project.id ? (
            <>
               <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{
                  display: "block",
                  marginBottom: "10px",
                  padding: "8px",
                  width: "300px",
                  }}
               />
             
              <textarea
                value={editDescription}
                onChange={(e) =>
                  setEditDescription(e.target.value)
                }
                style={{
                  display: "block",
                  marginBottom: "10px",
                  padding: "8px",
                  width: "300px",
                  height: "80px",
                     }}
              />   
               <select
                 value={editStatus}
                 onChange={(e) => setEditStatus(e.target.value)}
                 style={{
                 display: "block",
                 marginBottom: "10px",
                 padding: "8px",
                 width: "320px",
                }}
              >
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>

               
            </>
          ) : (
            <>
              <h3
                style={{
                fontSize: "24px",
                color: darkMode ? "white" : "#1e293b",
                  }}
              >
               {project.title}
              </h3>
             <p
                 style={{
                  color: darkMode ? "#cbd5e1" : "#555",
                  marginBottom: "10px",
                   }}
              >
              {project.description}
            </p>
             <p>
            Status:
              <span
                  style={{
                  color:
                  project.status === "Completed"
                    ? "green"
                    : project.status === "In Progress"
                    ? "blue"
                    : "orange",
                fontWeight: "bold",
                marginLeft: "5px",
                     }}
                >
             {project.status}
              </span>
            </p>
            </>
          )}

          <div>
            {editingId === project.id ? (
              <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    handleSave(project.id);
  }}
  style={{
    backgroundColor: "blue",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  }}
>
  Save
</button>
            ) : (
              <button
              type="button"
                onClick={(e) =>{
                  e.stopPropagation();
                   handleEdit(project)}}
                style={{
                  backgroundColor: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Edit
              </button>
            )}

            <button
            type="button"
              onClick={(e) =>{
                e.stopPropagation();
                handleDelete(project.id)
              }}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;
