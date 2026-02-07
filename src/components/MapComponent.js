import React, { useState, useEffect, useRef } from 'react';
import './MapComponent.css';

const MapComponent = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    // Default location (India)
    const defaultLocation = { lat: 28.7041, lng: 77.1025 }; // Delhi

    const newMap = new window.google.maps.Map(mapRef.current, {
      zoom: 12,
      center: defaultLocation,
      styles: [
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#333333' }]
        }
      ]
    });

    setMap(newMap);

    // Load rooms from localStorage
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    // Filter only approved posts
    const approvedPosts = savedPosts.filter(post => post.status === 'approved');
    setRooms(approvedPosts);
    setFilteredRooms(approvedPosts);

    // Add markers for all rooms
    addMarkers(newMap, approvedPosts);
  }, []);

  const addMarkers = (mapInstance, roomsToMark) => {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    const newMarkers = [];

    roomsToMark.forEach((room, index) => {
      // Default coordinates for different locations
      const locationCoordinates = {
        'delhi': { lat: 28.7041, lng: 77.1025 },
        'mumbai': { lat: 19.0760, lng: 72.8777 },
        'bangalore': { lat: 12.9716, lng: 77.5946 },
        'pune': { lat: 18.5204, lng: 73.8567 },
        'hyderabad': { lat: 17.3850, lng: 78.4867 },
        'chennai': { lat: 13.0827, lng: 80.2707 }
      };

      const coords =
        locationCoordinates[room.location?.toLowerCase()] ||
        { lat: 28.7041 + Math.random() * 0.1, lng: 77.1025 + Math.random() * 0.1 };

      const marker = new window.google.maps.Marker({
        position: coords,
        map: mapInstance,
        title: room.location,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      });

      // Info window with room details
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="info-window-content">
            <h3>${room.location}</h3>
            <p><strong>Address:</strong> ${room.address}</p>
            <p><strong>Rent:</strong> ₹${room.rent}/month</p>
            <p><strong>Type:</strong> ${room.roomType}</p>
            <p><strong>Deposit:</strong> ₹${room.deposit}</p>
            ${room.contact ? `<p><strong>Contact:</strong> ${room.contact}</p>` : ''}
            <button class="info-btn" onclick="alert('Room Details: ' + '${room.address}')">View Details</button>
          </div>
        `
      });

      marker.addListener('click', () => {
        // Close all other info windows
        markers.forEach((m, i) => {
          if (m.infoWindow) m.infoWindow.close();
        });
        infoWindow.open(mapInstance, marker);
        setSelectedRoom(room);
        marker.infoWindow = infoWindow;
      });

      marker.infoWindow = infoWindow;
      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredRooms(rooms);
      addMarkers(map, rooms);
      return;
    }

    const filtered = rooms.filter(
      room =>
        room.location.toLowerCase().includes(query) ||
        room.address.toLowerCase().includes(query)
    );

    setFilteredRooms(filtered);
    addMarkers(map, filtered);

    // Center map on first result
    if (filtered.length > 0) {
      const locationCoordinates = {
        'delhi': { lat: 28.7041, lng: 77.1025 },
        'mumbai': { lat: 19.0760, lng: 72.8777 },
        'bangalore': { lat: 12.9716, lng: 77.5946 },
        'pune': { lat: 18.5204, lng: 73.8567 },
        'hyderabad': { lat: 17.3850, lng: 78.4867 },
        'chennai': { lat: 13.0827, lng: 80.2707 }
      };
      const coords =
        locationCoordinates[filtered[0].location?.toLowerCase()] ||
        { lat: 28.7041, lng: 77.1025 };
      map.setCenter(coords);
      map.setZoom(14);
    }
  };

  return (
    <div className="map-container">
      <div className="map-header">
        <h2>🗺️ Room Locations Map</h2>
        <div className="search-box-wrapper">
          <input
            type="text"
            className="search-box"
            placeholder="Search by location or address..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <span className="search-info">
            {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>

      <div className="map-wrapper">
        <div ref={mapRef} className="map" id="map"></div>

        {selectedRoom && (
          <div className="room-details-panel">
            <button
              className="close-btn"
              onClick={() => setSelectedRoom(null)}
            >
              ✕
            </button>
            <h3>📍 {selectedRoom.location}</h3>
            <div className="details-content">
              <p>
                <strong>Address:</strong> {selectedRoom.address}
              </p>
              <p>
                <strong>Flat Number:</strong> {selectedRoom.flatNumber}
              </p>
              <p className="rent-highlight">
                <strong>💰 Rent:</strong> ₹{selectedRoom.rent}/month
              </p>
              <p>
                <strong>Type:</strong> {selectedRoom.roomType}
              </p>
              <p>
                <strong>Deposit:</strong> ₹{selectedRoom.deposit}
              </p>
              <p>
                <strong>Available:</strong> {selectedRoom.availabilityDate}
              </p>
              {selectedRoom.contact && (
                <p>
                  <strong>📞 Contact:</strong> {selectedRoom.contact}
                </p>
              )}
              {selectedRoom.description && (
                <p>
                  <strong>Description:</strong> {selectedRoom.description}
                </p>
              )}
              {selectedRoom.amenities && (
                <p>
                  <strong>Amenities:</strong> {selectedRoom.amenities}
                </p>
              )}
              <p>
                <strong>Posted by:</strong> {selectedRoom.postedBy}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="legend">
        <p>🔴 Red markers = Room locations</p>
      </div>
    </div>
  );
};

export default MapComponent;
