import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Room.css';

const SearchRoom = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    location: '',
    maxRent: '',
    roomType: ''
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Dummy data
    const dummyRooms = [
      { id: 1, location: 'Delhi', address: 'Near ABC College', rent: 5000, type: 'Single', status: 'Available' },
      { id: 2, location: 'Mumbai', address: 'XYZ Area', rent: 7000, type: 'Double', status: 'Booked' },
      { id: 3, location: 'Pune', address: 'Near University', rent: 6000, type: '1 BHK', status: 'Available' },
      { id: 4, location: 'Delhi', address: 'Close to Campus', rent: 4500, type: '2 BHK', status: 'Available' },
      { id: 5, location: 'Bangalore', address: 'Tech Park Area', rent: 8000, type: '3 BHK', status: 'Available' },
      { id: 6, location: 'Chennai', address: 'Near IT Hub', rent: 5500, type: 'Single', status: 'Available' }
    ];

    const filtered = dummyRooms.filter(room => {
      const matchesLocation = !filters.location || room.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesRent = !filters.maxRent || room.rent <= parseInt(filters.maxRent);
      const matchesType = !filters.roomType || room.type.toLowerCase().replace(' ', '') === filters.roomType.toLowerCase();
      return matchesLocation && matchesRent && matchesType;
    });

    // Navigate to results page with filtered data
    navigate('/search-results', { state: { results: filtered } });
  };

  return (
    <div className="room-container">
      <div className="form-section glass">
        <h2>Search Rooms</h2>
        <form onSubmit={handleSearch}>
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
          <select name="roomType" value={filters.roomType} onChange={handleChange}>
            <option value="">Room Type</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="1bhk">1 BHK</option>
            <option value="2bhk">2 BHK</option>
            <option value="3bhk">3 BHK</option>
          </select>
          <button type="submit" className="btn-primary">Search</button>
        </form>
      </div>
    </div>
  );
};

export default SearchRoom;