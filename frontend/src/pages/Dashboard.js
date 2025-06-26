import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({ userName = "Explorer" }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nasaFact, setNasaFact] = useState("");

  const nasaFacts = [
    "NASA was established on July 29, 1958",
    "The International Space Station orbits Earth every 90 minutes",
    "Mars has the largest volcano in our solar system - Olympus Mons",
    "One day on Venus equals 243 Earth days",
    "NASA's Voyager 1 is the farthest human-made object from Earth",
    "Saturn's moon Titan has lakes of liquid methane",
    "Jupiter has at least 79 known moons"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Set random NASA fact
    setNasaFact(nasaFacts[Math.floor(Math.random() * nasaFacts.length)]);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/login");
  };

  // Enhanced mouse trail effect
  const handleMouseMove = (e) => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    
    // Random color for trail
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffa726'];
    trail.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
      if (document.body.contains(trail)) {
        document.body.removeChild(trail);
      }
    }, 1000);
  };

  const dashboardItems = [
    {
      title: "Astronomy Picture of the Day",
      icon: "🌟",
      path: "/apod",
      description: "Discover today's featured cosmic image",
      color: "#ff6b6b"
    },
    {
      title: "Mars Rover Images",
      icon: "🔴",
      path: "/mars",
      description: "Latest photos from Mars exploration",
      color: "#ff8c42"
    },
    {
      title: "Near Earth Objects",
      icon: "☄️",
      path: "/neo",
      description: "Track asteroids approaching Earth",
      color: "#4ecdc4"
    },
    {
      title: "Earth Imagery",
      icon: "🌍",
      path: "/epic",
      description: "View Earth from space",
      color: "#45b7d1"
    },
    {
      title: "NASA Media Library",
      icon: "📚",
      path: "/library",
      description: "Explore NASA's image collection",
      color: "#96ceb4"
    }
  ];

  return (
    <div className="dashboard-container" onMouseMove={handleMouseMove}>
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-top">
          <div className="time-display">
            <div className="current-time">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="current-date">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
          
          
        </div>

        <div className="main-title-section">
          <h1 className="nasa-heading">🚀 NASA Explorer</h1>
          <h2 className="welcome-text">Welcome back, {userName}!</h2>
          <p className="mission-statement">
            Your gateway to the cosmos - Explore, Discover, Wonder
          </p>
        </div>

        <div className="nasa-fact">
          <div className="fact-label">🔭 Space Fact of the Day</div>
          <div className="fact-content">{nasaFact}</div>
        </div>
      </header>

      {/* Navigation Grid */}
      <main className="dashboard-main">
        <div className="nav-grid">
          {dashboardItems.map((item, index) => (
            <Link 
              key={index}
              to={item.path} 
              className="nav-card"
              style={{'--card-color': item.color}}
            >
              <div className="card-icon">{item.icon}</div>
              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
              </div>
              <div className="card-arrow">→</div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <p>Powered by NASA APIs • Built for Space Enthusiasts</p>
          <div className="social-links">
            <a href="https://nasa.gov" target="_blank" rel="noopener noreferrer">
              NASA Official Site
            </a>
            <span>•</span>
            <a href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer">
              NASA API
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;