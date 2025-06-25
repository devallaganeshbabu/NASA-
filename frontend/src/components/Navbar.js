// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ userName, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="brand">🚀 NASA App</div>

      {userName ? (
        <div className="nav-links">
          <Link to="/dashboard">Home</Link>
          <Link to="/apod">APOD</Link>
          <Link to="/mars">Mars</Link>
          <Link to="/neo">NEO</Link>
          <Link to="/epic">EPIC</Link>
          <span className="welcome">Welcome, {userName}!</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
