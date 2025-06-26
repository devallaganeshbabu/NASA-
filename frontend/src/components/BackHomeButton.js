import React from "react";
import { Link } from "react-router-dom";
import "./BackHomeButton.css";

const BackHomeButton = () => {
  return (
    <div className="back-home-wrapper">
      <Link to="/dashboard" className="back-home-btn">⬅ Back to Home</Link>
    </div>
  );
};

export default BackHomeButton;
