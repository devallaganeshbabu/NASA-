// src/pages/NeoWs.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "./NeoWs.css";
import BackHomeButton from "../components/BackHomeButton";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./NeoWs.css"; // <-- custom styles
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const NeoWs = () => {
  const [neos, setNeos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());

  const fetchNEOs = (selectedDate) => {
    setLoading(true);
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    axios
      .get(`/api/neo?date=${formattedDate}`)
      .then((res) => {
        const neoData = res.data.near_earth_objects[formattedDate] || [];
        setNeos(neoData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNEOs(date);
  }, [date]);

  if (loading) return <p className="loading-text">Loading Near Earth Objects...</p>;

  const labels = neos.map((n) => n.name);
  const diameters = neos.map((n) =>
    parseFloat(n.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2))
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Max Diameter (km)",
        data: diameters,
        backgroundColor: "rgba(102, 252, 241, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="neo-container">
      <h2>🌍 Near Earth Objects (NEOs)</h2>

      <div className="neo-date-picker">
        <label>Select Date: </label>
        <DatePicker selected={date} onChange={(d) => setDate(d)} maxDate={new Date()} />
      </div>

      <div className="neo-chart">
        <Bar data={chartData} options={options} />
      </div>

      <h3 className="neo-subtitle">Detected Objects</h3>
      <div className="neo-grid">
        {neos.map((neo, idx) => (
          <div key={idx} className="neo-card">
            <h4>{neo.name}</h4>
            <p><strong>Hazardous:</strong> {neo.is_potentially_hazardous_asteroid ? "Yes" : "No"}</p>
            <p><strong>Diameter (km):</strong> {diameters[idx]}</p>
            <p><strong>Speed (km/h):</strong> {parseFloat(neo.close_approach_data[0]?.relative_velocity?.kilometers_per_hour).toFixed(2)}</p>
            <p><strong>Miss Distance (km):</strong> {parseFloat(neo.close_approach_data[0]?.miss_distance?.kilometers).toLocaleString()}</p>
          </div>
        ))}
      </div>
       <BackHomeButton />

    </div>
  );
  

};

export default NeoWs;
