import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import TimeLogs from "./pages/TimeLogs";
import Milestones from "./pages/Milestones";
import Invoice from "./pages/Invoice";
import Analytics from "./pages/Analytics";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {

  const [darkMode, setDarkMode] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }

  }, []);

  useEffect(() => {

    if (darkMode) {

      document.body.classList.add("dark");

      localStorage.setItem("theme", "dark");

    } else {

      document.body.classList.remove("dark");

      localStorage.setItem("theme", "light");

    }

  }, [darkMode]);
  return (
    <>

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div
        style={{
          marginLeft: "240px",
          padding: "20px",
        }}
      >
        <Routes>
          <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
         <Route path="/" element={<Dashboard darkMode={darkMode} />} />
         <Route path="/projects" element={<Projects darkMode={darkMode} />} />
        <Route path="/timelogs" element={<TimeLogs darkMode={darkMode} />} />
        <Route path="/milestones" element={<Milestones darkMode={darkMode} />} />
        <Route path="/invoice" element={<Invoice darkMode={darkMode} />} />
        <Route path="/analytics"element={<Analytics darkMode={darkMode} />}/>
        </Routes>

      </div>

    </>
  );
}

export default App;