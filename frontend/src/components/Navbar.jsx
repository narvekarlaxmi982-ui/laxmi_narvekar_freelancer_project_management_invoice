import { Link } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: darkMode ? "#111827" : "#1e293b",
        color: "white",
        padding: "20px",
        position: "fixed",
        left: "0",
        top: "0",
        display: "flex",
        flexDirection: "column",
        transition: "0.3s ease",
        paddingBottom: "24px",
        overflowY: "auto",
      }}
    >
      <div>
        <h2 style={{ marginBottom: "30px" }}>
          Freelancer CRM
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Link
            to="/"
            style={{ color: "white", textDecoration: "none" }}
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/projects"
            style={{ color: "white", textDecoration: "none" }}
          >
            📁 Projects
          </Link>

          <Link
            to="/timelogs"
            style={{ color: "white", textDecoration: "none" }}
          >
            ⏱ Time Logs
          </Link>

          <Link
            to="/milestones"
            style={{ color: "white", textDecoration: "none" }}
          >
            🎯 Milestones
          </Link>

          <Link
            to="/invoice"
            style={{ color: "white", textDecoration: "none" }}
          >
            💰 Invoices
          </Link>
          <Link 
          to="/analytics"
         style={{color: "white", textDecoration: "none",}}
          >
        📊 Analytics  
        </Link>
        </div>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: "55px",
          cursor: "pointer",
          backgroundColor: darkMode ? "#facc15" : "#334155",
          color: darkMode ? "#000" : "#fff",
          fontWeight: "bold",
          transition: "0.3s",
          
        }}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}

export default Navbar;