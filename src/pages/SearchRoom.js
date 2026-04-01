import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterButtons from '../components/FilterButtons';
import './Room.css';

const SearchRoom = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('room');
  const [roomFilters, setRoomFilters] = useState({
    location: '',
    maxRent: '',
    roomType: ''
  });

  const [hostelFilters, setHostelFilters] = useState({
    gender: '',
    location: '',
    maxRent: ''
  });

  const [pgFilters, setPgFilters] = useState({
    location: '',
    maxRent: '',
    roomType: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      alert('Please login to search rooms!');
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  // Room handlers
  const handleRoomChange = (e) => {
    setRoomFilters({
      ...roomFilters,
      [e.target.name]: e.target.value
    });
  };

  const handleRoomSearch = (e) => {
    e.preventDefault();
    
    const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const approvedRooms = allPosts.filter(post => post.status === 'approved' && post.accommodationType === 'Room');

    const filtered = approvedRooms.filter(room => {
      const matchesLocation = !roomFilters.location || room.location.toLowerCase().includes(roomFilters.location.toLowerCase());
      const matchesRent = !roomFilters.maxRent || parseInt(room.rent) <= parseInt(roomFilters.maxRent);
      const matchesType = !roomFilters.roomType || room.roomType.toLowerCase().replace(' ', '') === roomFilters.roomType.toLowerCase().replace(' ', '');
      return matchesLocation && matchesRent && matchesType;
    });

    navigate('/search-results', { state: { results: filtered, type: 'Room' } });
  };

  // Hostel handlers
  const handleHostelChange = (e) => {
    setHostelFilters({
      ...hostelFilters,
      [e.target.name]: e.target.value
    });
  };

  const handleHostelSearch = (e) => {
    e.preventDefault();
    
    if (!hostelFilters.gender) {
      alert('Please select Boys or Girls hostel!');
      return;
    }

    const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const approvedHostels = allPosts.filter(
      post => post.status === 'approved' && 
              post.accommodationType === 'Hostel' && 
              post.hostelGender === hostelFilters.gender
    );

    const filtered = approvedHostels.filter(hostel => {
      const matchesLocation = !hostelFilters.location || hostel.location.toLowerCase().includes(hostelFilters.location.toLowerCase());
      const matchesRent = !hostelFilters.maxRent || parseInt(hostel.rent) <= parseInt(hostelFilters.maxRent);
      return matchesLocation && matchesRent;
    });

    navigate('/search-results', { state: { results: filtered, type: 'Hostel', gender: hostelFilters.gender } });
  };

  // PG handlers
  const handlePgChange = (e) => {
    setPgFilters({
      ...pgFilters,
      [e.target.name]: e.target.value
    });
  };

  const handlePgSearch = (e) => {
    e.preventDefault();
    
    const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const approvedPgs = allPosts.filter(post => post.status === 'approved' && post.accommodationType === 'PG');

    const filtered = approvedPgs.filter(pg => {
      const matchesLocation = !pgFilters.location || pg.location.toLowerCase().includes(pgFilters.location.toLowerCase());
      const matchesRent = !pgFilters.maxRent || parseInt(pg.rent) <= parseInt(pgFilters.maxRent);
      const matchesType = !pgFilters.roomType || pg.roomType.toLowerCase().replace(' ', '') === pgFilters.roomType.toLowerCase().replace(' ', '');
      return matchesLocation && matchesRent && matchesType;
    });

    navigate('/search-results', { state: { results: filtered, type: 'PG' } });
  };

  return (
    <div>
      {/* Filter Buttons */}
      <FilterButtons onFilterChange={handleFilterChange} />

      <div className="room-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2.5rem', fontWeight: 'bold' }}>
          Find Your Perfect Accommodation
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          {/* Rooms Section */}
          {activeFilter === 'room' && (
            <div className="form-section glass" style={{ padding: '30px', borderRadius: '15px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', animation: 'slideIn 0.5s ease' }}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>🚪 Rooms</h2>
                <p style={{ color: '#999', fontSize: '0.95rem' }}>Find individual rooms & apartments</p>
              </div>
              
              <form onSubmit={handleRoomSearch}>
            <input
              type="text"
              name="location"
              placeholder="📍 Enter Location"
              value={roomFilters.location}
              onChange={handleRoomChange}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
            />
            <input
              type="number"
              name="maxRent"
              placeholder="💰 Max Rent (₹)"
              value={roomFilters.maxRent}
              onChange={handleRoomChange}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: '1rem'
              }}
            />
            <select 
              name="roomType" 
              value={roomFilters.roomType} 
              onChange={handleRoomChange}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '15px',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: '1rem'
              }}
            >
              <option value="">🏘️ Room Type</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="1bhk">1 BHK</option>
              <option value="2bhk">2 BHK</option>
              <option value="3bhk">3 BHK</option>
            </select>
            <button 
              type="submit" 
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Search Rooms →
            </button>
        </form>
</div>
)}   

{/* Hostels Section */}
       
        {activeFilter === 'hostel' && (
        <div className="form-section glass" style={{ padding: '30px', borderRadius: '15px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>🏨 Hostels</h2>
            <p style={{ color: '#999', fontSize: '0.95rem' }}>Boys & Girls hostel accommodations</p>
          </div>

          <form onSubmit={handleHostelSearch}>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontSize: '0.95rem', marginBottom: '10px', color: '#ddd' }}>Select Hostel Type:</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <label 
                  style={{
                    padding: '12px',
                    border: `2px solid ${hostelFilters.gender === 'Boys' ? '#00d4ff' : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '8px',
                    background: hostelFilters.gender === 'Boys' ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'center',
                    fontWeight: hostelFilters.gender === 'Boys' ? 'bold' : 'normal'
                  }}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="Boys"
                    checked={hostelFilters.gender === 'Boys'}
                    onChange={handleHostelChange}
                    style={{ display: 'none' }}
                  />
                  <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>👨</span>
                  <span>Boys</span>
                </label>
                <label 
                  style={{
                    padding: '12px',
                    border: `2px solid ${hostelFilters.gender === 'Girls' ? '#ff006e' : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '8px',
                    background: hostelFilters.gender === 'Girls' ? 'rgba(255,0,110,0.1)' : 'rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'center',
                    fontWeight: hostelFilters.gender === 'Girls' ? 'bold' : 'normal'
                  }}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="Girls"
                    checked={hostelFilters.gender === 'Girls'}
                    onChange={handleHostelChange}
                    style={{ display: 'none' }}
                  />
                  <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>👩</span>
                  <span>Girls</span>
                </label>
              </div>
            </div>

            <input
              type="text"
              name="location"
              placeholder="📍 Enter Location"
              value={hostelFilters.location}
              onChange={handleHostelChange}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: '1rem'
              }}
            />
            <input
              type="number"
              name="maxRent"
              placeholder="💰 Max Rent (₹)"
              value={hostelFilters.maxRent}
              onChange={handleHostelChange}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '15px',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: '1rem'
              }}
            />
            <button 
              type="submit" 
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Search Hostels →
            </button>
          </form>
        </div>
        )}

        {/* PG Section */}
        {activeFilter === 'pg' && (
        <div className="form-section glass" style={{ padding: '30px', borderRadius: '15px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>🏘️ PG</h2>
            <p style={{ color: '#999', fontSize: '0.95rem' }}>Paying guest accommodations</p>
          </div>

          <form onSubmit={handlePgSearch}>
            <input
              type="text"
              name="location"
              placeholder="📍 Enter Location"
              value={pgFilters.location}
              onChange={handlePgChange}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: '1rem'
              }}
            />
            <input
              type="number"
              name="maxRent"
              placeholder="💰 Max Rent (₹)"
              value={pgFilters.maxRent}
              onChange={handlePgChange}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: '1rem'
              }}
            />
            <select 
              name="roomType" 
              value={pgFilters.roomType} 
              onChange={handlePgChange}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '15px',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: '1rem'
              }}
            >
              <option value="">🏘️ Room Type</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="1bhk">1 BHK</option>
              <option value="2bhk">2 BHK</option>
              <option value="3bhk">3 BHK</option>
            </select>
            <button 
              type="submit" 
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Search PG →
            </button>
          </form>
        </div>
              )}
      </div>   
    </div>     
  </div>     
);

};

export default SearchRoom;