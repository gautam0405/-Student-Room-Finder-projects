/**
 * Integration Examples for SearchBar Component
 * 
 * This file contains practical examples of how to integrate the SearchBar component
 * with your existing Room and Hostel Finder application.
 */

// ============================================================================
// Example 1: Basic Integration with React Router
// ============================================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (filters) => {
    console.log('Search initiated with filters:', filters);
    
    // Create query parameters
    const queryParams = new URLSearchParams({
      location: filters.location,
      hostel: filters.hostel,
      price: filters.priceRange
    });

    // Navigate to search results page
    navigate(`/search-results?${queryParams.toString()}`);
  };

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />
      {/* Rest of home page content */}
    </div>
  );
}

export default HomePage;

// ============================================================================
// Example 2: Integration with API Call
// ============================================================================

import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

function SearchWithAPI() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async (filters) => {
    setLoading(true);
    
    try {
      // Make API call
      const response = await fetch('/api/rooms/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: filters.location,
          hostelName: filters.hostel,
          priceRange: filters.priceRange,
        }),
      });

      const data = await response.json();
      setResults(data.results);
      console.log('Search results:', data);
    } catch (error) {
      console.error('Search failed:', error);
      alert('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      
      {loading && <div className="loading">Searching...</div>}
      
      {results.length > 0 && (
        <div className="results-container">
          {results.map(room => (
            <div key={room.id} className="room-card">
              <h3>{room.name}</h3>
              <p>Location: {room.location}</p>
              <p>Price: {room.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchWithAPI;

// ============================================================================
// Example 3: Integration with State Management (Context)
// ============================================================================

import React, { useContext } from 'react';
import SearchBar from '../components/SearchBar';
import { SearchContext } from '../context/SearchContext';

function SearchWithContext() {
  const { setSearchFilters, performSearch } = useContext(SearchContext);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    performSearch(filters);
  };

  return <SearchBar onSearch={handleSearch} />;
}

export default SearchWithContext;

// ============================================================================
// Example 4: Custom SearchBar with Additional Features
// ============================================================================

import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

function AdvancedSearchPage() {
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearch = (filters) => {
    // Save to recent searches
    const newSearch = {
      ...filters,
      timestamp: new Date(),
      id: Date.now(),
    };
    
    setRecentSearches(prev => [newSearch, ...prev].slice(0, 5));
    
    // Perform search
    console.log('Searching:', filters);
  };

  const handleQuickSearch = (filters) => {
    // Load recent search
    handleSearch(filters);
  };

  return (
    <div className="advanced-search">
      <SearchBar onSearch={handleSearch} />
      
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h3>Recent Searches</h3>
          {recentSearches.map(search => (
            <button
              key={search.id}
              onClick={() => handleQuickSearch(search)}
              className="recent-search-btn"
            >
              {search.location} {search.hostel && `- ${search.hostel}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdvancedSearchPage;

// ============================================================================
// Example 5: Integration in App.js
// ============================================================================

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import HomePage from './pages/Home';
import SearchResultsPage from './pages/SearchResults';

function App() {
  const [searchFilters, setSearchFilters] = useState(null);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    // Navigate to results (handled by React Router)
    window.location.href = `/search-results?location=${filters.location}&hostel=${filters.hostel}&price=${filters.priceRange}`;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={<HomePage onSearch={handleSearch} />} 
        />
        <Route 
          path="/search-results" 
          element={<SearchResultsPage filters={searchFilters} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;

// ============================================================================
// Example 6: SearchContextProvider Setup
// ============================================================================

import React, { createContext, useState, useCallback } from 'react';

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [filters, setFilters] = useState(null);
  const [results, setResults] = useState([]);

  const setSearchFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const performSearch = useCallback(async (filters) => {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    }
  }, []);

  return (
    <SearchContext.Provider 
      value={{ 
        filters, 
        setSearchFilters, 
        results, 
        performSearch 
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// ============================================================================
// Example 7: Using SearchBar with Existing SearchResults Component
// ============================================================================

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Extract parameters from URL
  const location = searchParams.get('location') || '';
  const hostel = searchParams.get('hostel') || '';
  const price = searchParams.get('price') || '';

  useEffect(() => {
    if (location || hostel || price) {
      performSearch();
    }
  }, [location, hostel, price]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, hostel, priceRange: price }),
      });
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = (filters) => {
    setSearchParams({
      location: filters.location,
      hostel: filters.hostel,
      price: filters.priceRange,
    });
  };

  return (
    <div>
      <SearchBar 
        onSearch={handleNewSearch}
        defaultLocation={location}
        defaultHostel={hostel}
        defaultPrice={price}
      />
      
      {loading && <p>Loading results...</p>}
      
      <div className="results">
        {results.map(room => (
          <div key={room.id} className="room-card">
            <h3>{room.name}</h3>
            <p>{room.location}</p>
            <p>₹ {room.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;

// ============================================================================
// Example 8: Mobile-First Integration
// ============================================================================

import React from 'react';
import SearchBar from '../components/SearchBar';
import './MobileSearch.css';

function MobileSearchPage() {
  const handleSearch = (filters) => {
    // For mobile, you might want to show results in a modal or new page
    console.log('Mobile search:', filters);
    // Show search results modal
  };

  return (
    <div className="mobile-search-page">
      <SearchBar onSearch={handleSearch} />
      {/* Mobile-optimized results below */}
    </div>
  );
}

export default MobileSearchPage;

// ============================================================================
// Example 9: SearchBar with Advanced Filters
// ============================================================================

import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

function SearchWithAdvancedFilters() {
  const [showFilters, setShowFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    rating: 0,
    amenities: [],
    occupancy: 1,
    availability: 'any',
  });

  const handleSearch = (filters) => {
    const combinedFilters = {
      ...filters,
      ...advancedFilters,
    };
    console.log('Search with advanced filters:', combinedFilters);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      
      <button onClick={() => setShowFilters(!showFilters)}>
        Advanced Filters
      </button>
      
      {showFilters && (
        <div className="advanced-filters">
          <label>
            Minimum Rating:
            <input
              type="range"
              min="0"
              max="5"
              value={advancedFilters.rating}
              onChange={(e) => setAdvancedFilters({
                ...advancedFilters,
                rating: parseFloat(e.target.value)
              })}
            />
          </label>
          
          <label>
            Occupancy:
            <input
              type="number"
              min="1"
              value={advancedFilters.occupancy}
              onChange={(e) => setAdvancedFilters({
                ...advancedFilters,
                occupancy: parseInt(e.target.value)
              })}
            />
          </label>
        </div>
      )}
    </>
  );
}

export default SearchWithAdvancedFilters;

// ============================================================================
// Example 10: Standalone HTML Integration
// ============================================================================

/*
If you want to use the standalone HTML version on an existing page:

1. Copy the HTML structure from search-hero.html into your page
2. Link the CSS file:

<link rel="stylesheet" href="search-styles.css">

3. Add the JavaScript event handlers:

<script>
  document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.getElementById('locationInput').value;
    const hostel = document.getElementById('hostelInput').value;
    const price = document.getElementById('priceSelect').value;
    
    // Send to your backend or redirect
    window.location.href = `/results?location=${location}&hostel=${hostel}&price=${price}`;
  });
</script>
*/

export {};
