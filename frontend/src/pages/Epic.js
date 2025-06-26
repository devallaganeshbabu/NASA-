import React, { useEffect, useState } from "react";
import axios from "axios";
import BackHomeButton from "../components/BackHomeButton";
import "./Epic.css";

const Epic = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://nasa-final.onrender.com/api/epic")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data?.results || [];
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }
        setImages(data.slice(0, 30)); // limit to 30
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setError("Failed to load EPIC Earth images.");
        setLoading(false);
      });
  }, []);

  const getImageUrl = (img) => {
    const date = img.date.split(" ")[0].replaceAll("-", "/");
    return `https://epic.gsfc.nasa.gov/archive/natural/${date}/jpg/${img.image}.jpg`;
  };

  if (loading) return <p className="loading-text">Loading EPIC Earth images...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="epic-container">
      <h2>🌍 Earth Polychromatic Imaging Camera (EPIC)</h2>
      <div className="epic-grid">
        {images.map((img, idx) => (
          <div key={idx} className="epic-card">
            <img
              src={getImageUrl(img)}
              alt={img.caption}
              className="epic-image"
            />
            <div className="epic-overlay">
              <p>{img.caption}</p>
              <small>{img.date}</small>
            </div>
          </div>
        ))}
      </div>
      <BackHomeButton />
    </div>
  );
};

export default Epic;
