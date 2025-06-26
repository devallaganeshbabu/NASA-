import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formElement = document.querySelector(".auth-form");

    try {
      const res = await axios.post("https://nasa-final.onrender.com/api/login", form);
      const name = res.data.user?.name || "User";

      localStorage.setItem("userName", name);
      setUser(name);

      // Add success animation
      formElement?.classList.add("success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      setLoading(false);

      // Shake animation on error
      formElement?.classList.add("shake");
      setTimeout(() => {
        formElement?.classList.remove("shake");
      }, 600);
    }
  };

  return (
    <div className="auth-container">
      <div className="stars-bg"></div>
      <div className="cosmic-particles"></div>

      <div className="auth-wrapper">
        <div className="floating-elements">
          <div className="planet planet-1"></div>
          <div className="planet planet-2"></div>
          <div className="satellite"></div>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-header">
            <div className="nasa-logo">
              <div className="logo-ring"></div>
              <div className="logo-center">🚀</div>
            </div>
            <h1 className="nasa-title">NASA Explorer</h1>
            <h2 className="auth-subtitle">Welcome Back, Astronaut</h2>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span> {error}
            </div>
          )}

          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="form-input"
              />
              <div className="input-icon">📧</div>
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="form-input"
              />
              <div className="input-icon">🔒</div>
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Launching...
              </>
            ) : (
              <>
                <span>Login</span>
                <div className="button-glow"></div>
              </>
            )}
          </button>

          <div className="auth-footer">
            <button
  type="button"
  className="signup-redirect-button"
  onClick={() => navigate("/signup")}
>
  Signup
</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
