import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchApod = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://nasa-final.onrender.com/api/apod')
        console.log("APOD Response:", response.data);


        setApod(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load today\'s astronomy picture');
        console.error('APOD fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApod();
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setError('Failed to load image');
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading today's cosmic wonder...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error-container">
          <div className="error-icon">🚀</div>
          <h2>Houston, we have a problem!</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!apod) return null;

  return (
    <div className="home-container">
      <div className="content-wrapper">
        {/* Header Section */}
        <header className="apod-header">
          <div className="header-content">
            <h1 className="main-title">🌌 Astronomy Picture of the Day</h1>
            <div className="date-badge">
              {new Date(apod.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="apod-main">
          <div className="image-section">
            <div className="image-container">
              {!imageLoaded && (
                <div className="image-placeholder">
                  <div className="image-loading-spinner"></div>
                </div>
              )}
              
              {apod.media_type === 'image' ? (
                <img 
                  src={apod.url || apod.hdurl} 
                  alt={apod.title}
                  className={`apod-image ${imageLoaded ? 'loaded' : ''}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              ) : (
                <div className="video-container">
                  <iframe
                    src={apod.url}
                    title={apod.title}
                    className="apod-video"
                    allowFullScreen
                    onLoad={handleImageLoad}
                  />
                </div>
              )}
              
              {imageLoaded && (
                <div className="image-overlay">
                  <button className="fullscreen-btn" onClick={() => window.open(apod.hdurl || apod.url, '_blank')}>
                    🔍 View Full Resolution
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="content-section">
            <div className="title-section">
              <h2 className="apod-title">{apod.title}</h2>
              {apod.copyright && (
                <p className="copyright">📸 Credit: {apod.copyright}</p>
              )}
            </div>

            <div className="explanation-section">
              <div className="explanation-header">
                <h3>🔭 About Today's Image</h3>
              </div>
              <div className="explanation-content">
                <p className="explanation-text">{apod.explanation}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                className="action-btn primary"
                onClick={() => window.open(apod.hdurl || apod.url, '_blank')}
              >
                🖼️ High Resolution
              </button>
              <button 
                className="action-btn secondary"
                onClick={() => navigator.share ? navigator.share({
                  title: apod.title,
                  text: apod.explanation,
                  url: window.location.href
                }) : navigator.clipboard.writeText(window.location.href)}
              >
                📤 Share
              </button>
              <button 
                className="action-btn secondary"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = apod.hdurl || apod.url;
                  link.download = `APOD-${apod.date}-${apod.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`;
                  link.click();
                }}
              >
                💾 Download
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;