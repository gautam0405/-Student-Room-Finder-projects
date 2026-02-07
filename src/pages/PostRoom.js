import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Room.css';

const PostRoom = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accommodationType: '',
    hostelGender: '',
    location: '',
    address: '',
    flatNumber: '',
    rent: '',
    deposit: '',
    roomType: '',
    availabilityDate: '',
    description: '',
    amenities: '',
    contact: '',
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
    let requiredFields = [formData.accommodationType, formData.location, formData.address, formData.rent, formData.roomType];
    
    // If hostel, also require hostelGender
    if (formData.accommodationType === 'Hostel') {
      requiredFields.push(formData.hostelGender);
    }
    
    if (requiredFields.some(field => !field)) {
      alert('Please fill required fields!');
      return;
    }

    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    // Create post object
    const newPost = {
      ...formData,
      postedBy: currentUser?.name || currentUser?.email || 'Anonymous',
      postedDate: new Date().toLocaleDateString(),
      status: 'pending',
      id: Date.now()
    };

    // Save to localStorage
    const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    existingPosts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(existingPosts));

    alert('Room posted successfully! Wait for agent approval.');
    
    // Reset form
    setFormData({
      accommodationType: '',
      hostelGender: '',
      location: '',
      address: '',
      flatNumber: '',
      rent: '',
      deposit: '',
      roomType: '',
      availabilityDate: '',
      description: '',
      amenities: '',
      contact: '',
      images: null
    });

    // Redirect to home
    navigate('/');
  };

  return (
    <div className="room-container">
      <div className="form-section glass">
        <h2>Post Your Room</h2>
        <p>Fill in the details to list your room</p>
        <form onSubmit={handleSubmit}>
          <select name="accommodationType" value={formData.accommodationType} onChange={handleChange} required>
            <option value="">Select Accommodation Type</option>
            <option value="Room">Room</option>
            <option value="Hostel">Hostel</option>
            <option value="PG">PG (Paying Guest)</option>
          </select>
          {formData.accommodationType === 'Hostel' && (
            <select name="hostelGender" value={formData.hostelGender} onChange={handleChange} required>
              <option value="">Select Hostel Type</option>
              <option value="Boys">Boys Hostel</option>
              <option value="Girls">Girls Hostel</option>
            </select>
          )}
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
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Room Description (Optional)"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            style={{ padding: '12px', borderRadius: '8px', border: 'none', fontSize: '0.95rem' }}
          />
          <textarea
            name="amenities"
            placeholder="Amenities (e.g., WiFi, AC, Kitchen - separate with comma)"
            value={formData.amenities}
            onChange={handleChange}
            rows="3"
            style={{ padding: '12px', borderRadius: '8px', border: 'none', fontSize: '0.95rem' }}
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