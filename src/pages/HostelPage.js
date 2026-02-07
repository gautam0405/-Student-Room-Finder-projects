import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Room.css';

const HostelPage = () => {
  const navigate = useNavigate();
  const { gender } = useParams();
  const [hostels, setHostels] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    maxRent: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      alert('Please login to view hostels!');
      navigate('/login');
      return;
    }

    // Fetch hostels from localStorage
    const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const filteredHostels = allPosts.filter(
      post => post.status === 'approved' && 
              post.accommodationType === 'Hostel' && 
              post.hostelGender === gender
    );
    setHostels(filteredHostels);
  }, [navigate, gender]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = hostels.filter(hostel => {
      const matchesLocation = !filters.location || hostel.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesRent = !filters.maxRent || parseInt(hostel.rent) <= parseInt(filters.maxRent);
      return matchesLocation && matchesRent;
    });

    navigate('/hostel-results', { state: { results: filtered, gender } });
  };

  return (
    <div className="room-container">
      <div className="form-section glass">
        <h2>{gender === 'Boys' ? '👨 Boys Hostel' : '👩 Girls Hostel'}</h2>
        <p>Find the perfect {gender.toLowerCase()} hostel near your college</p>
        
        <div style={{ marginBottom: '30px' }}>
          <h3>Found {hostels.length} hostel(s)</h3>
        </div>

        <form onSubmit={handleSearch} style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
          <input
            type="text"
            name="location"
            placeholder="Enter Location"
            value={filters.location}
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxRent"
            placeholder="Max Rent (₹)"
            value={filters.maxRent}
            onChange={handleChange}
          />
          <button type="submit" className="btn-primary">Search</button>
        </form>

        <div className="results">
          {hostels.length === 0 ? (
            <p>No {gender.toLowerCase()} hostels available at the moment.</p>
          ) : (
            hostels.map(hostel => (
              <div key={hostel.id} className="result-card">
                <h3>{hostel.location}</h3>
                <p><strong>Hostel Type:</strong> {hostel.hostelGender} Hostel</p>
                <p><strong>Address:</strong> {hostel.address}</p>
                {hostel.flatNumber && <p><strong>Hostel Name:</strong> {hostel.flatNumber}</p>}
                <p><strong>Rent:</strong> ₹{hostel.rent}/month</p>
                {hostel.deposit && <p><strong>Deposit:</strong> ₹{hostel.deposit}</p>}
                {hostel.description && <p><strong>Description:</strong> {hostel.description}</p>}
                {hostel.amenities && <p><strong>Amenities:</strong> {hostel.amenities}</p>}
                {hostel.contact && <p><strong>Contact:</strong> {hostel.contact}</p>}
                <p><strong>Posted by:</strong> {hostel.postedBy}</p>
                <button className="btn-primary">Contact Hostel</button>
              </div>
            ))
          )}
        </div>

        <button
          className="btn-secondary"
          onClick={() => navigate('/')}
          style={{ marginTop: '20px' }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default HostelPage;
