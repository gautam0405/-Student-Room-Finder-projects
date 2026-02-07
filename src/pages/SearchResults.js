import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Room.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];
  const type = location.state?.type || 'Accommodation';
  const gender = location.state?.gender || '';

  const getTitle = () => {
    if (type === 'Hostel') {
      return `${gender} Hostels`;
    }
    return `${type}s`;
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
          {getTitle()} Found
        </h1>
        <p style={{ color: '#999', fontSize: '1.1rem' }}>
          {results.length} {type.toLowerCase()}(s) matching your search
        </p>
      </div>

      {results.length === 0 ? (
        <div 
          className="glass"
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            borderRadius: '15px',
            marginBottom: '30px'
          }}
        >
          <p style={{ fontSize: '1.2rem', color: '#aaa' }}>
            No {type.toLowerCase()}s found matching your criteria. 😔
          </p>
          <p style={{ color: '#777', marginTop: '10px' }}>
            Try adjusting your search filters
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px', marginBottom: '40px' }}>
          {results.map(item => (
            <div 
              key={item.id} 
              className="glass"
              style={{
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                hover: { transform: 'translateY(-5px)' }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,212,255,0.2)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ marginBottom: '15px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{item.location}</h2>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{
                    background: 'rgba(0,212,255,0.2)',
                    color: '#00d4ff',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }}>
                    {item.accommodationType}
                  </span>
                  {item.hostelGender && (
                    <span style={{
                      background: 'rgba(255,0,110,0.2)',
                      color: '#ff006e',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold'
                    }}>
                      {item.hostelGender} Hostel
                    </span>
                  )}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', marginBottom: '15px' }}>
                <p style={{ marginBottom: '10px' }}>
                  <span style={{ color: '#999' }}>📍</span> <span style={{ color: '#ccc' }}>{item.address}</span>
                </p>
                {item.flatNumber && (
                  <p style={{ marginBottom: '10px' }}>
                    <span style={{ color: '#999' }}>🏷️</span> <span style={{ color: '#ccc' }}>{item.flatNumber}</span>
                  </p>
                )}
                <p style={{ marginBottom: '10px', fontSize: '1.3rem', fontWeight: 'bold', color: '#00d4ff' }}>
                  ₹{item.rent}<span style={{ fontSize: '0.8rem', color: '#999' }}>/month</span>
                </p>
                <p style={{ marginBottom: '10px' }}>
                  <span style={{ color: '#999' }}>🛏️</span> <span style={{ color: '#ccc' }}>Room Type: {item.roomType}</span>
                </p>
                {item.deposit && (
                  <p style={{ marginBottom: '10px' }}>
                    <span style={{ color: '#999' }}>💰</span> <span style={{ color: '#ccc' }}>Deposit: ₹{item.deposit}</span>
                  </p>
                )}
              </div>

              {item.description && (
                <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '15px', lineHeight: '1.5' }}>
                  {item.description}
                </p>
              )}

              {item.amenities && (
                <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '15px' }}>
                  <span style={{ display: 'block', marginBottom: '5px', color: '#ddd' }}>🎁 Amenities:</span>
                  {item.amenities}
                </p>
              )}

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
                <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '15px' }}>
                  👤 <span style={{ color: '#ccc' }}>{item.postedBy}</span>
                </p>
                {item.contact && (
                  <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '15px' }}>
                    📞 <span style={{ color: '#ccc', fontFamily: 'monospace' }}>{item.contact}</span>
                  </p>
                )}
                <button 
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  📞 Contact {item.accommodationType === 'Hostel' ? 'Hostel' : 'Owner'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button
          className="btn-secondary"
          onClick={() => navigate(-1)}
          style={{
            padding: '12px 30px',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          ← Back to Search
        </button>
      </div>
    </div>
  );
};

export default SearchResults;