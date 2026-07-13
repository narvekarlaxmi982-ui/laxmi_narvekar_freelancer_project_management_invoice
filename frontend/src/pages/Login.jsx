import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const handleLogin = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/login",
      {
        email: email,
        password: password,
      }
    );

    alert(response.data.message);

    // Save logged-in user
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    // Redirect
    window.location.reload();

  } catch (error) {
    alert("Invalid Email or Password");
    console.log(error);
  }
};
  return (
    <div
      style={{
        width: "350px",
        margin: "100px auto",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        background: "white",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "8px",
        }}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      />

      <button
      
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
      <p style={{ textAlign: "center", marginTop: "15px" }}>
         Don't have an account?{" "}
        <a href="/register">Register</a>
    </p>
    </div>
  );
}

export default Login;