import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MarsRovers.css";
import BackHomeButton from "../components/BackHomeButton";

const MarsRovers = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/mars")
      .then((res) => {
        setPhotos(res.data.photos.slice(0, 20)); // Limit to 20 photos
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load Mars rover photos.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-text">Loading Mars Rover Photos...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="mars-container">
      <h2>🚀 Mars Rover Photos</h2>
      <div className="mars-grid">
        {photos.map((photo) => (
          <div className="mars-card" key={photo.id}>
            <img src={photo.img_src} alt={photo.id} className="mars-image" />
            <div className="mars-overlay">
              <p><strong>Rover:</strong> {photo.rover.name}</p>
              <p><strong>Camera:</strong> {photo.camera.full_name}</p>
              <small>{photo.earth_date}</small>
            </div>
          </div>
        ))}
      </div>
      <BackHomeButton />
    </div>
  );
};

export default MarsRovers;
