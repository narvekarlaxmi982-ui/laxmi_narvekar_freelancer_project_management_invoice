import { useState, useEffect } from "react";
import axios from "axios";

function Invoice({ darkMode }) {
  const [projectId, setProjectId] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [clientName, setClientName] = useState("");
  const [projects, setProjects] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [pdfFile, setPdfFile] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleGenerateInvoice = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/generate-invoice",
        {
          project_id: projectId,
          hourly_rate: hourlyRate,
          client_name: clientName,
        }
      );

      alert("Invoice Generated Successfully");

      setTotalHours(response.data.invoice.total_hours);
      setTotalAmount(response.data.invoice.total_amount);
      setPdfFile(response.data.pdf_file);

    } catch (error) {
      console.log(error);
    }
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
      <h1>Invoice Generator</h1>

      <form
        onSubmit={handleGenerateInvoice}
        style={{
          backgroundColor: darkMode ? "#1e293b" : "white",
          color: darkMode ? "white" : "black",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          maxWidth: "500px",
          marginBottom: "30px",
        }}
      >
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          style={{
            width: "320px",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            backgroundColor: darkMode ? "#334155" : "white",
            color: darkMode ? "white" : "black",
            border: darkMode
              ? "1px solid #475569"
              : "1px solid #ccc",
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
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            marginBottom: "15px",
            display: "block",
            backgroundColor: darkMode ? "#334155" : "white",
            color: darkMode ? "white" : "black",
            border: darkMode
              ? "1px solid #475569"
              : "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <input
          type="number"
          placeholder="Hourly Rate (₹)"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            marginBottom: "15px",
            display: "block",
            backgroundColor: darkMode ? "#334155" : "white",
            color: darkMode ? "white" : "black",
            border: darkMode
              ? "1px solid #475569"
              : "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Generate Invoice
        </button>
      </form>

      {totalAmount > 0 && (
        <div
          style={{
            backgroundColor: darkMode ? "#1e293b" : "white",
            color: darkMode ? "white" : "black",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            maxWidth: "500px",
          }}
        >
          <h2>Invoice Summary</h2>

          <p>
            <strong>Client:</strong> {clientName}
          </p>

          <p>
            <strong>Project:</strong>{" "}
            {
              projects.find(
                (project) => project.id == projectId
              )?.title
            }
          </p>

          <p>
            <strong>Total Hours:</strong> {totalHours}
          </p>

          <p>
            <strong>Hourly Rate:</strong> ₹{hourlyRate}
          </p>

          <hr />

          <h2>Total Amount: ₹{totalAmount}</h2>

          <button
            onClick={() => {
              const filename = pdfFile.split("/").pop();

              window.open(
                `http://127.0.0.1:5000/download-invoice/${filename}`,
                "_blank"
              );
            }}
            style={{
              marginTop: "20px",
              backgroundColor: "#16a34a",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Download Invoice PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default Invoice;