import React, { useState, useRef } from 'react';
import './SearchBar.css';

/**
 * Modern Search Bar Component - Airbnb/Booking.com Style
 * A responsive search component for Room and Hostel Finder application
 * 
 * Features:
 * - Five-part search input (Location, Check-in, Check-out, Guests, Price Range)
 * - Responsive design (desktop, tablet, mobile)
 * - Airbnb/Booking.com inspired layout
 * - Smooth animations and transitions
 * - Loading and success states
 * - Keyboard shortcuts (Escape to clear)
 * 
 * @component
 * @example
 * const handleSearch = (filters) => {
 *   console.log('Search filters:', filters);
 *   // Navigate to results page or API call
 * };
 * 
 * return <SearchBar onSearch={handleSearch} />
 */

const SearchBar = ({ 
  onSearch = null, 
  defaultLocation = '', 
  defaultCheckin = '', 
  defaultCheckout = '', 
  defaultGuests = '',
  defaultPrice = '' 
}) => {
  const [location, setLocation] = useState(defaultLocation);
  const [checkin, setCheckin] = useState(defaultCheckin);
  const [checkout, setCheckout] = useState(defaultCheckout);
  const [guests, setGuests] = useState(defaultGuests);
  const [price, setPrice] = useState(defaultPrice);
  const [isLoading, setIsLoading] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const formRef = useRef(null);
  const searchBtnRef = useRef(null);

  const guestOptions = [
    { value: '', label: 'Select number' },
    { value: '1', label: '1 Guest' },
    { value: '2', label: '2 Guests' },
    { value: '3', label: '3 Guests' },
    { value: '4', label: '4 Guests' },
    { value: '5', label: '5 Guests' },
    { value: '6+', label: '6+ Guests' }
  ];

  const priceRanges = [
    { value: '', label: 'Select range' },
    { value: '0-500', label: '₹ 0 - 500' },
    { value: '500-1000', label: '₹ 500 - 1K' },
    { value: '1000-1500', label: '₹ 1K - 1.5K' },
    { value: '1500-2000', label: '₹ 1.5K - 2K' },
    { value: '2000-2500', label: '₹ 2K - 2.5K' },
    { value: '2500+', label: '₹ 2.5K+' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedLocation = location.trim();

    if (!trimmedLocation) {
      alert('Please enter a location');
      return;
    }

    // Show loading state
    setIsLoading(true);
    setSearchSuccess(false);

    const searchParams = {
      location: trimmedLocation,
      checkin: checkin,
      checkout: checkout,
      guests: guests,
      priceRange: price
    };

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setSearchSuccess(true);

      // Call parent callback if provided
      if (onSearch) {
        onSearch(searchParams);
      }

      // Log search parameters
      console.log('Search Parameters:', searchParams);

      // Reset success state after 2 seconds
      setTimeout(() => {
        setSearchSuccess(false);
      }, 2000);

      // In a real application, you would use React Router
      // navigate(`/search-results?${new URLSearchParams(searchParams)}`);
    }, 1000);
  };

  const handleClear = (e) => {
    if (e.key === 'Escape') {
      setLocation('');
      setCheckin('');
      setCheckout('');
      setGuests('');
      setPrice('');
    }
  };

  const handleFieldFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleFieldBlur = () => {
    setActiveField(null);
  };

  return (
    <div className="search-container">
      <div className="hero-header">
        <h1>Find Your Perfect Room</h1>
        <p>Search from thousands of verified rooms and hostels worldwide</p>
      </div>

      <form
        ref={formRef}
        className={`search-bar ${searchSuccess ? 'success' : ''}`}
        onSubmit={handleSubmit}
        onKeyDown={handleClear}
      >
        {/* Location Field */}
        <div className={`search-field ${activeField === 'location' ? 'active' : ''}`}>
          <label className="search-label">
            <span className="search-icon">📍</span>
            Location
          </label>
          <input
            type="text"
            className="search-input"
            placeholder="Where are you going?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => handleFieldFocus('location')}
            onBlur={handleFieldBlur}
            autoComplete="off"
            disabled={isLoading}
          />
        </div>

        {/* Check-in Date Field */}
        <div className={`search-field ${activeField === 'checkin' ? 'active' : ''}`}>
          <label className="search-label">
            <span className="search-icon">📅</span>
            Check-in
          </label>
          <input
            type="date"
            className="search-input"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            onFocus={() => handleFieldFocus('checkin')}
            onBlur={handleFieldBlur}
            disabled={isLoading}
          />
        </div>

        {/* Check-out Date Field */}
        <div className={`search-field ${activeField === 'checkout' ? 'active' : ''}`}>
          <label className="search-label">
            <span className="search-icon">📅</span>
            Check-out
          </label>
          <input
            type="date"
            className="search-input"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            onFocus={() => handleFieldFocus('checkout')}
            onBlur={handleFieldBlur}
            disabled={isLoading}
          />
        </div>

        {/* Guests Field */}
        <div className={`search-field ${activeField === 'guests' ? 'active' : ''}`}>
          <label className="search-label">
            <span className="search-icon">👥</span>
            Guests
          </label>
          <select
            className="search-select"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            onFocus={() => handleFieldFocus('guests')}
            onBlur={handleFieldBlur}
            disabled={isLoading}
          >
            {guestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Field */}
        <div className={`search-field ${activeField === 'price' ? 'active' : ''}`}>
          <label className="search-label">
            <span className="search-icon">💰</span>
            Price
          </label>
          <select
            className="search-select"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onFocus={() => handleFieldFocus('price')}
            onBlur={handleFieldBlur}
            disabled={isLoading}
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="search-field search-button-container">
          <button
            ref={searchBtnRef}
            type="submit"
            className={`search-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            <span>{isLoading ? '⏳' : searchSuccess ? '✓' : '🔍'}</span>
            <span>{isLoading ? 'Searching...' : searchSuccess ? 'Search' : 'Search'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
