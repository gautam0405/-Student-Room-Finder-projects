import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Verified Rooms Near Your College</h1>
          <p>Smart, secure, and student-friendly platform for room sharing and searching.</p>
          <button className="btn-primary">Explore Now</button>
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

      {/* Footer */}
      <footer>
        <p>© 2026 Student Room Finder | Designed for Students</p>
      </footer>
    </div>
  );
};

export default Home;