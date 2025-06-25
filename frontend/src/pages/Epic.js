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
      .get("/api/epic")
      .then((res) => {
        setImages(res.data.slice(0, 20)); // limit to 20
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
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
