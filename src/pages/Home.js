import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleHostelClick = (gender) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      alert('Please login to view hostels!');
      navigate('/login');
      return;
    }
    navigate(`/hostel/${gender}`);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Verified Rooms Near Your College</h1>
          <p>Smart, secure, and student-friendly platform for room sharing and searching.</p>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature-card">
          <h3>Verified Listings</h3>
          <p>Only logged-in users can post rooms</p>
        </div>
        <div className="feature-card">
          <h3>Smart Search</h3>
          <p>Search by location, rent & room type</p>
        </div>
        <div className="feature-card">
          <h3>Direct Contact</h3>
          <p>Contact room owner directly</p>
        </div>
      </section>

      {/* Hostel Section */}
      <section className="hostel-section" style={{ padding: '40px 20px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>🏨 Find Your Perfect Hostel</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <button
            className="btn-primary"
            onClick={() => handleHostelClick('Boys')}
            style={{
              padding: '15px 30px',
              fontSize: '1.1rem',
              minWidth: '200px',
              cursor: 'pointer'
            }}
          >
            👨 Boys Hostel
          </button>
          <button
            className="btn-primary"
            onClick={() => handleHostelClick('Girls')}
            style={{
              padding: '15px 30px',
              fontSize: '1.1rem',
              minWidth: '200px',
              cursor: 'pointer'
            }}
          >
            👩 Girls Hostel
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 Student Room Finder | Designed for Students</p>
      </footer>
    </div>
  );
};

export default Home;