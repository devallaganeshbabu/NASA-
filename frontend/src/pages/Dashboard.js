import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css"; // optional CSS file for styles

const Dashboard = ({ userName = "Explorer" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally clear user session data here
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h1 className="nasa-heading">🚀 NASA App</h1>
      <h2>Welcome, {userName}!</h2>
      <p>Select a NASA data service:</p>

      <div className="nav-buttons">
        <Link to="/apod" className="btn">APOD</Link>
        <Link to="/mars" className="btn">Mars Rover</Link>
        <Link to="/neo" className="btn">NEO</Link>
        <Link to="/epic" className="btn">EPIC</Link>
        <Link to="/library" className="btn">NASA Library</Link>
      </div>

    </div>
  );
};

export default Dashboard;
