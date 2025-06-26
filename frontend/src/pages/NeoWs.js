import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "./NeoWs.css";
import BackHomeButton from "../components/BackHomeButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [error, setError] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedNeo, setSelectedNeo] = useState(null);

  const fetchNEOs = (selectedDate) => {
    setLoading(true);
    setError("");
    const formattedDate = selectedDate.toISOString().slice(0, 10);

    axios
      .get(`https://nasa-final.onrender.com/api/neo?date=${formattedDate}`)
      .then((res) => {
  const rawData = res.data?.near_earth_objects ?? {};
  const availableDates = Object.keys(rawData);
  console.log("Available dates:", availableDates);

  let formattedDate = selectedDate.toISOString().slice(0, 10);
  console.log("Looking for date:", formattedDate);

  // If the selected date is unavailable, fallback to the latest available
  if (!availableDates.includes(formattedDate)) {
    formattedDate = availableDates.sort().reverse()[0]; // pick the latest
    console.warn(`Date ${formattedDate} not found. Falling back to ${formattedDate}`);
  }

  const neoData = rawData[formattedDate] ?? [];

  if (!Array.isArray(neoData)) {
    throw new Error("Unexpected data format");
  }

  setNeos(neoData);
  setLoading(false);
})
      .catch((err) => {
        console.error("NEO fetch error:", err);
        setError("Failed to load Near Earth Object data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNEOs(date);
  }, [date]);

  // Mouse trail effect for cosmic atmosphere
  const handleMouseMove = (e) => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail-neo';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffa726'];
    trail.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
      if (document.body.contains(trail)) {
        document.body.removeChild(trail);
      }
    }, 1000);
  };

  if (loading) {
    return (
      <div className="neo-container" onMouseMove={handleMouseMove}>
        <div className="cosmic-background">
          <div className="stars-layer"></div>
          <div className="nebula-layer"></div>
        </div>
        <div className="loading-section">
          <div className="asteroid-loader">
            <div className="asteroid">☄️</div>
            <div className="orbit-trail"></div>
          </div>
          <p className="loading-text">Scanning for Near Earth Objects...</p>
          <p className="loading-subtext">Analyzing cosmic trajectories</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="neo-container" onMouseMove={handleMouseMove}>
        <div className="cosmic-background">
          <div className="stars-layer"></div>
          <div className="nebula-layer"></div>
        </div>
        <div className="error-section">
          <div className="error-icon">🚨</div>
          <p className="error-title">Houston, We Have a Problem</p>
          <p className="error-text">{error}</p>
          <button 
            className="retry-button"
            onClick={() => fetchNEOs(date)}
          >
            🔄 Retry Scan
          </button>
        </div>
      </div>
    );
  }

  const labels = neos.map((n) => n.name.length > 15 ? n.name.substring(0, 15) + '...' : n.name);
  const diameters = neos.map((n) =>
    parseFloat(n?.estimated_diameter?.kilometers?.estimated_diameter_max ?? 0).toFixed(2)
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Max Diameter (km)",
        data: diameters,
        backgroundColor: "rgba(79, 172, 254, 0.8)",
        borderColor: "rgba(0, 242, 254, 1)",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: '#ffffff',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        titleColor: '#00f2fe',
        bodyColor: '#ffffff',
        borderColor: 'rgba(79, 172, 254, 0.5)',
        borderWidth: 1,
        cornerRadius: 12,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
          maxRotation: 45
        }
      }
    },
  };

  const getThreatLevel = (neo) => {
    if (neo.is_potentially_hazardous_asteroid) return 'high';
    const diameter = parseFloat(neo?.estimated_diameter?.kilometers?.estimated_diameter_max ?? 0);
    if (diameter > 1) return 'medium';
    return 'low';
  };

  const getThreatColor = (level) => {
    switch (level) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#ffa726';
      default: return '#4ecdc4';
    }
  };

  const getThreatIcon = (level) => {
    switch (level) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      default: return '✅';
    }
  };

  return (
    <div className="neo-container" onMouseMove={handleMouseMove}>
      {/* Cosmic Background */}
      <div className="cosmic-background">
        <div className="stars-layer"></div>
        <div className="nebula-layer"></div>
        <div className="asteroid-field"></div>
      </div>

      {/* Header Section */}
      <header className="neo-header">
        <div className="header-content">
          <h1 className="neo-title">
            <span className="title-icon">☄️</span>
            Near Earth Objects
            <span className="title-subtitle">Asteroid Tracking System</span>
          </h1>
          
          <div className="mission-stats">
            <div className="stat-item">
              <div className="stat-value">{neos.length}</div>
              <div className="stat-label">Objects Detected</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {neos.filter(n => n.is_potentially_hazardous_asteroid).length}
              </div>
              <div className="stat-label">Potentially Hazardous</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {Math.max(...diameters.map(d => parseFloat(d))).toFixed(2)}
              </div>
              <div className="stat-label">Largest (km)</div>
            </div>
          </div>
        </div>
      </header>

      {/* Date Picker Section */}
      <section className="neo-controls">
        <div className="date-picker-container">
          <label className="date-label">
            <span className="label-icon">📅</span>
            Mission Date
          </label>
          <div className="date-picker-wrapper">
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              maxDate={new Date()}
              className="cosmic-date-picker"
              dateFormat="MMMM d, yyyy"
            />
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="neo-analytics">
        <div className="chart-container">
          <h3 className="chart-title">
            <span className="chart-icon">📊</span>
            Asteroid Size Analysis
          </h3>
          <div className="chart-wrapper">
            <Bar data={chartData} options={options} />
          </div>
        </div>
      </section>

      {/* NEO Grid Section */}
      <section className="neo-data-section">
        <h3 className="section-title">
          <span className="section-icon">🔍</span>
          Detected Objects
          <span className="object-count">({neos.length} found)</span>
        </h3>
        
        <div className="neo-grid">
          {neos.map((neo, idx) => {
            const approach = neo.close_approach_data?.[0];
            const threatLevel = getThreatLevel(neo);
            
            return (
              <div 
                key={idx} 
                className={`neo-card threat-${threatLevel}`}
                onClick={() => setSelectedNeo(selectedNeo === idx ? null : idx)}
                style={{'--threat-color': getThreatColor(threatLevel)}}
              >
                <div className="card-header">
                  <div className="threat-indicator">
                    <span className="threat-icon">{getThreatIcon(threatLevel)}</span>
                    <span className="threat-level">{threatLevel.toUpperCase()}</span>
                  </div>
                  <div className="card-id">#{idx + 1}</div>
                </div>

                <h4 className="neo-name">{neo.name}</h4>
                
                <div className="neo-details">
                  <div className="detail-row">
                    <span className="detail-icon">⚠️</span>
                    <span className="detail-label">Threat Level:</span>
                    <span className={`detail-value threat-${threatLevel}`}>
                      {neo.is_potentially_hazardous_asteroid ? "HAZARDOUS" : "SAFE"}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-icon">📏</span>
                    <span className="detail-label">Diameter:</span>
                    <span className="detail-value">{diameters[idx]} km</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-icon">🚀</span>
                    <span className="detail-label">Velocity:</span>
                    <span className="detail-value">
                      {approach
                        ? parseFloat(approach.relative_velocity?.kilometers_per_hour ?? 0).toLocaleString()
                        : "N/A"} km/h
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-icon">📍</span>
                    <span className="detail-label">Miss Distance:</span>
                    <span className="detail-value">
                      {approach
                        ? parseFloat(approach.miss_distance?.kilometers ?? 0).toLocaleString()
                        : "N/A"} km
                    </span>
                  </div>
                </div>

                {selectedNeo === idx && (
                  <div className="neo-extended-info">
                    <div className="extended-detail">
                      <strong>Approach Date:</strong> {approach?.close_approach_date || "N/A"}
                    </div>
                    <div className="extended-detail">
                      <strong>Absolute Magnitude:</strong> {neo.absolute_magnitude_h || "N/A"}
                    </div>
                    <div className="extended-detail">
                      <strong>Min Diameter:</strong> {
                        parseFloat(neo?.estimated_diameter?.kilometers?.estimated_diameter_min ?? 0).toFixed(2)
                      } km
                    </div>
                  </div>
                )}

                <div className="card-footer">
                  <span className="expand-hint">
                    {selectedNeo === idx ? '▲ Less Info' : '▼ More Info'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <BackHomeButton />
    </div>
  );
};

export default NeoWs;