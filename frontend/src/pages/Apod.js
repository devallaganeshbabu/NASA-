import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Apod.css";
import BackHomeButton from "../components/BackHomeButton";

const Apod = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/apod")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load APOD data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-text">Loading Astronomy Picture...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="apod-container">
      <h2>🌌 Astronomy Picture of the Day</h2>

      <div className="apod-content">
        <div className="apod-image-container">
          {data.media_type === "image" && (
            <img src={data.url} alt={data.title} className="apod-image" />
          )}
        </div>
        <div className="apod-details">
          <h3>{data.title}</h3>
          <p><strong>Date:</strong> {data.date}</p>
          <p className="apod-explanation">{data.explanation}</p>
        </div>
      </div>

      <BackHomeButton />
    </div>
  );
};

export default Apod;
