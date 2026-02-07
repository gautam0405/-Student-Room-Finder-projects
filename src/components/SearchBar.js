import React, { useState, useRef } from 'react';
import './SearchBar.css';

/**
 * Modern Search Bar Component
 * A responsive search component for Room and Hostel Finder application
 * 
 * Features:
 * - Three-part search input (Location, Hostel, Price Range)
 * - Responsive design (desktop, tablet, mobile)
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

const SearchBar = ({ onSearch = null, defaultLocation = '', defaultHostel = '', defaultPrice = '' }) => {
  const [location, setLocation] = useState(defaultLocation);
  const [hostel, setHostel] = useState(defaultHostel);
  const [price, setPrice] = useState(defaultPrice);
  const [isLoading, setIsLoading] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const formRef = useRef(null);
  const searchBtnRef = useRef(null);

  const priceRanges = [
    { value: '', label: 'Select price range' },
    { value: '0-500', label: '₹ 0 - 500' },
    { value: '500-1000', label: '₹ 500 - 1000' },
    { value: '1000-1500', label: '₹ 1000 - 1500' },
    { value: '1500-2000', label: '₹ 1500 - 2000' },
    { value: '2000-2500', label: '₹ 2000 - 2500' },
    { value: '2500+', label: '₹ 2500+' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedLocation = location.trim();
    const trimmedHostel = hostel.trim();

    if (!trimmedLocation && !trimmedHostel) {
      alert('Please enter at least a location or search term');
      return;
    }

    // Show loading state
    setIsLoading(true);
    setSearchSuccess(false);

    const searchParams = {
      location: trimmedLocation,
      hostel: trimmedHostel,
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
      // navigate(`/search-results?location=${trimmedLocation}&hostel=${trimmedHostel}&price=${price}`);
    }, 1000);
  };

  const handleClear = (e) => {
    if (e.key === 'Escape') {
      setLocation('');
      setHostel('');
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
        <p>Search from thousands of verified rooms and hostels</p>
      </div>

      <form
        ref={formRef}
        className={`search-bar ${searchSuccess ? 'success' : ''}`}
        onSubmit={handleSubmit}
        onKeyDown={handleClear}
      >
        {/* Location Field */}
        <div className={`search-field ${activeField === 'location' ? 'active' : ''}`}>
          <span className="search-icon">📍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => handleFieldFocus('location')}
            onBlur={handleFieldBlur}
            autoComplete="off"
            disabled={isLoading}
          />
        </div>

        {/* Hostel Field */}
        <div className={`search-field ${activeField === 'hostel' ? 'active' : ''}`}>
          <span className="search-icon">🏠</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search hostel"
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
            onFocus={() => handleFieldFocus('hostel')}
            onBlur={handleFieldBlur}
            autoComplete="off"
            disabled={isLoading}
          />
        </div>

        {/* Price Range Field */}
        <div className={`search-field ${activeField === 'price' ? 'active' : ''}`}>
          <span className="search-icon">💰</span>
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
        <button
          ref={searchBtnRef}
          type="submit"
          className={`search-btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          <span>{isLoading ? '⏳' : searchSuccess ? '✓' : '🔍'}</span>
          <span>{isLoading ? 'Searching...' : searchSuccess ? 'Complete!' : 'Search'}</span>
        </button>
      </form>

      {/* Optional: Recent searches or suggestions */}
      {/* <div className="search-suggestions">
        <h3>Popular Searches</h3>
        <div className="suggestion-tags">
          <span className="suggestion-tag">Delhi • Rooms</span>
          <span className="suggestion-tag">Mumbai • Hostels</span>
          <span className="suggestion-tag">Bangalore • Budget</span>
        </div>
      </div> */}
    </div>
  );
};

export default SearchBar;
