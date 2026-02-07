import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Room.css';

const HostelResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];
  const gender = location.state?.gender || 'Boys';

  return (
    <div className="room-container">
      <div className="form-section glass">
        <h2>{gender === 'Boys' ? '👨 Boys Hostel Results' : '👩 Girls Hostel Results'}</h2>
        {results.length === 0 ? (
          <p>No hostels found matching your criteria.</p>
        ) : (
          <p style={{ marginBottom: '20px', color: '#666' }}>Found {results.length} hostel(s)</p>
        )}

        <div className="results">
          {results.length === 0 ? (
            <p>No hostels found matching your criteria.</p>
          ) : (
            results.map(hostel => (
              <div key={hostel.id} className="result-card">
                <h3>{hostel.location}</h3>
                <p><strong>Hostel Type:</strong> {gender} Hostel</p>
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
          onClick={() => navigate(-1)}
          style={{ marginTop: '20px' }}
        >
          Back to Search
        </button>
      </div>
    </div>
  );
};

export default HostelResults;
