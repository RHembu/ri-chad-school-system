import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [schoolId, setSchoolId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!schoolId || !username || !password) {
      setError("Please enter School ID, Username, and Password.");
      return;
    }

    try {
      setLoading(true);

      const result = await loginUser({
        schoolId: schoolId.trim(),
        username: username.trim(),
        password,
      });

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "100px auto",
        padding: "30px",
        background: "#ffffff",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Ri-Chad Login</h1>

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="School ID"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "10px" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;