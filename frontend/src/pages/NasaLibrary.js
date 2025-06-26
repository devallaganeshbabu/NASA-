// src/pages/NasaLibrary.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NasaLibrary.css";
import BackHomeButton from "../components/BackHomeButton";

const NasaLibrary = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("https://images-api.nasa.gov/search?q=space&media_type=image")
      .then(res => setItems(res.data.collection.items.slice(0, 20)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="library-container">
      <h2>🚀 NASA Image Library</h2>
      <div className="library-grid">
        {items.map((item, index) => {
          const img = item.links?.[0]?.href;
          const title = item.data?.[0]?.title;
          return img ? (
            <div key={index} className="library-card">
              <img src={img} alt={title} />
              <p>{title}</p>
            </div>
          ) : null;
        })}
      </div>
      <BackHomeButton />
    </div>
  );
};

export default NasaLibrary;
