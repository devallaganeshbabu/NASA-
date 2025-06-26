// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ userName, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to end the mission?");
    if (confirmLogout) {
      localStorage.removeItem("userName");
      setUser(null);
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/dashboard", label: "Home", icon: "🏠", description: "Mission Control" },
    { path: "/apod", label: "APOD", icon: "🌟", description: "Astronomy Picture" },
    { path: "/mars", label: "Mars", icon: "🔴", description: "Red Planet Explorer" },
    { path: "/neo", label: "NEO", icon: "☄️", description: "Near Earth Objects" },
    { path: "/epic", label: "EPIC", icon: "🌍", description: "Earth Imagery" }
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <nav className="cosmic-navbar">
      <div className="navbar-bg-stars"></div>
      <div className="navbar-gradient"></div>

      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/dashboard" className="brand-link">
            <div className="brand-icon">🚀</div>
            <div className="brand-content">
              <div className="brand-title">NASA Explorer</div>
              <div className="brand-subtitle">Mission Control</div>
            </div>
          </Link>
        </div>

        <div className="navbar-time">
          <div className="time-value">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </div>
          <div className="time-label">Mission Time</div>
        </div>

        {userName && (
          <>
            {/* Desktop Navigation */}
            <div className="navbar-nav-desktop">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActivePath(item.path) ? "nav-item-active" : ""}`}
                  title={item.description}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {isActivePath(item.path) && <div className="nav-active-indicator"></div>}
                </Link>
              ))}
            </div>

            {/* User Info + Logout */}
            <div className="navbar-user">
              <div className="user-info">
                <div className="user-avatar">👨‍🚀</div>
                <div className="user-content">
                  <div className="user-greeting">Welcome back</div>
                  <div className="user-name">{userName}</div>
                </div>
              </div>
              <button onClick={handleLogout} className="logout-button">
                <span className="logout-icon">🚀</span>
                <span className="logout-text">Logout</span>
              </button>
            </div>

            {/* Mobile Navigation Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <div className={`hamburger ${isMenuOpen ? "hamburger-open" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>

            {/* Mobile Navigation Menu */}
            <div className={`navbar-nav-mobile ${isMenuOpen ? "mobile-nav-open" : ""}`}>
              <div className="mobile-nav-header">
                <div className="mobile-user-info">
                  <div className="mobile-user-avatar">👨‍🚀</div>
                  <div className="mobile-user-name">Commander {userName}</div>
                </div>
              </div>

              <div className="mobile-nav-items">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`mobile-nav-item ${isActivePath(item.path) ? "mobile-nav-item-active" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mobile-nav-icon">{item.icon}</span>
                    <div className="mobile-nav-content">
                      <div className="mobile-nav-label">{item.label}</div>
                      <div className="mobile-nav-description">{item.description}</div>
                    </div>
                    {isActivePath(item.path) && <div className="mobile-nav-indicator">●</div>}
                  </Link>
                ))}
              </div>

              <div className="mobile-nav-footer">
                <button onClick={handleLogout} className="mobile-logout-button">
                  <span className="mobile-logout-icon">🚀</span>
                  <span className="mobile-logout-text">Logout</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
              <div
                className="mobile-menu-overlay"
                onClick={() => setIsMenuOpen(false)}
              ></div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
