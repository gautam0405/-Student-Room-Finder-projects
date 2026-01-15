import React from 'react';
import { useLocation } from 'react-router-dom';
import './Room.css';

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="room-container">
      <div className="form-section glass">
        <h2>Search Results</h2>

        <div className="results">
          {results.length === 0 ? (
            <p>No rooms found matching your criteria.</p>
          ) : (
            results.map(room => (
              <div key={room.id} className="result-card">
                <h3>{room.location}</h3>
                <p><strong>Address:</strong> {room.address}</p>
                <p><strong>Rent:</strong> ₹{room.rent}</p>
                <p><strong>Type:</strong> {room.type}</p>
                <p><strong>Status:</strong> {room.status}</p>
                <button className="btn-primary">Contact Owner</button>
              </div>
            ))
          )}
        </div>

        <button
          className="btn-secondary"
          onClick={() => window.history.back()}
          style={{ marginTop: '20px' }}
        >
          Back to Search
        </button>
      </div>
    </div>
  );
};

export default SearchResults;