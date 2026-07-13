import { useState } from "react";
import axios from "axios";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:5000/create-project", {
        title,
        description,
        status: "Pending"
      });

      alert("Project Created Successfully!");

      setTitle("");
      setDescription("");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Project</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "10px",
            width: "300px"
          }}
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "10px",
            width: "300px",
            height: "100px"
          }}
        />

        <button type="submit">
          Create Project
        </button>
      </form>
    </div>
  );
}

export default CreateProject;