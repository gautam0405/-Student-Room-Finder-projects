import React, { useState } from 'react';
import './Room.css';

const PostRoom = () => {
  const [formData, setFormData] = useState({
    location: '',
    address: '',
    flatNumber: '',
    rent: '',
    deposit: '',
    roomType: '',
    availabilityDate: '',
    images: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate
    if (!formData.location || !formData.address || !formData.rent || !formData.roomType) {
      alert('Please fill required fields!');
      return;
    }
    alert('Room posted successfully!');
    // Submit logic here
  };

  return (
    <div className="room-container">
      <div className="form-section glass">
        <h2>Post Your Room</h2>
        <p>Fill in the details to list your room</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="location"
            placeholder="Location (e.g., Delhi, Mumbai)"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="flatNumber"
            placeholder="Flat Number"
            value={formData.flatNumber}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="rent"
            placeholder="Rent (₹)"
            value={formData.rent}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="deposit"
            placeholder="Deposit (₹)"
            value={formData.deposit}
            onChange={handleChange}
            required
          />
          <select name="roomType" value={formData.roomType} onChange={handleChange} required>
            <option value="">Select Room Type</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="1bhk">1 BHK</option>
            <option value="2bhk">2 BHK</option>
            <option value="3bhk">3 BHK</option>
          </select>
          <input
            type="date"
            name="availabilityDate"
            value={formData.availabilityDate}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-primary">Post Room</button>
        </form>
      </div>
    </div>
  );
};

export default PostRoom;