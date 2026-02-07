# 🗺️ Google Maps API Setup Guide

## Overview
Google Maps integration has been added to the Student Room Finder application. This guide will help you set up the API key and enable the map features.

## Features Implemented

✅ **Interactive Map Display**
- Shows room locations as red markers on Google Map
- Center of map is set to Delhi by default
- Zoom level: 12 (easily adjustable)

✅ **Search Functionality**
- Search rooms by location name (e.g., "Delhi", "Mumbai")
- Search by address or street name
- Real-time filtering with marker updates
- Search info shows count of rooms found

✅ **Marker Click Interaction**
- Click any marker to see room info window
- Information includes:
  - Room location
  - Address
  - Rent price
  - Room type
  - "View Details" button

✅ **Room Details Panel**
- Side panel shows complete room information:
  - Location & Address
  - Flat Number
  - Rent & Deposit amounts
  - Room Type
  - Availability Date
  - Contact Number
  - Description & Amenities
  - Posted by user name

✅ **Location Mapping**
- Pre-configured coordinates for major Indian cities:
  - Delhi: 28.7041°N, 77.1025°E
  - Mumbai: 19.0760°N, 72.8777°E
  - Bangalore: 12.9716°N, 77.5946°E
  - Pune: 18.5204°N, 73.8567°E
  - Hyderabad: 17.3850°N, 78.4867°E
  - Chennai: 13.0827°N, 80.2707°E

---

## Step 1: Get Google Maps API Key

### Option A: Google Cloud Console (Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (if you don't have one)
3. Click on the project name → Select "Create Project"
4. In the search bar, type "Maps API"
5. Click on "Maps JavaScript API" in the results
6. Click "Enable" button
7. Go to "Credentials" in the left sidebar
8. Click "Create Credentials" → "API Key"
9. Copy the generated API key

### Option B: Google Maps Platform

1. Visit [Google Maps Platform](https://mapsplatform.google.com/)
2. Click "Get Started"
3. Select all products (Maps, Routes, Places)
4. Create a new project or select existing
5. Enable billing (required for production)
6. Copy your API key from the credentials page

---

## Step 2: Add API Key to React Application

### For React Version:

**File:** `public/index.html`

Find this line:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
```

Replace `YOUR_API_KEY` with your actual key:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDxxxxxxxxxxxxxxx"></script>
```

---

## Step 3: Add API Key to HTML Version

### For HTML Version:

**File:** `map.html`

Find this line:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
```

Replace `YOUR_API_KEY` with your actual key (same as React version):
```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDxxxxxxxxxxxxxxx"></script>
```

---

## Step 4: Restrict Your API Key (Security Best Practice)

1. Go to [Google Cloud Console - Credentials](https://console.cloud.google.com/apis/credentials)
2. Click on your API key
3. Under "API restrictions", select "Maps JavaScript API"
4. Under "Application restrictions", select "HTTP referrers"
5. Add your website domains:
   ```
   localhost:3000/*
   localhost:3000
   yourdomain.com/*
   yourdomain.com
   ```
6. Click "Save"

---

## Step 5: Enable Billing

To avoid issues:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on your project
3. Go to Billing
4. Create a billing account (link your payment card)
5. Set daily budget limit to control costs (optional, recommended)

**Note:** Maps API has free tier usage ($200/month credit), sufficient for most applications.

---

## File Structure

```
Project Root/
├── src/
│   ├── components/
│   │   ├── MapComponent.js          ← React Map Component
│   │   ├── MapComponent.css         ← Map Styles
│   │   └── Navbar.js                ← Navigation
│   └── pages/
│       ├── Home.js                  ← Home page with map
│       └── Home.css
├── public/
│   └── index.html                   ← Add API key here
├── map.html                         ← Standalone HTML map page
└── GOOGLE_MAPS_SETUP.md            ← This file
```

---

## How It Works

### React Version Flow:
1. User visits Home page
2. Home.js imports MapComponent
3. MapComponent initializes Google Map on component mount
4. Loads approved room posts from localStorage
5. Adds markers for each room location
6. User can search, click markers, view details

### HTML Version Flow:
1. User opens `map.html`
2. Page initializes Google Map on load
3. Loads approved room posts from localStorage
4. Displays search box and map
5. User can interact with markers and search

### Data Flow:
```
localStorage (posts) 
    ↓
Filter approved posts
    ↓
Get location from address
    ↓
Map to coordinates (predefined cities)
    ↓
Create marker on map
    ↓
Add click listener for details
```

---

## Testing the Integration

### Test Steps:

1. **Create Test Rooms:**
   - Login as User
   - Post 2-3 rooms in different locations
   - Login as Agent
   - Approve the posted rooms

2. **View on Map:**
   - Go back to Home page
   - Scroll to "Room Locations Map" section
   - You should see markers on the map

3. **Test Search:**
   - Type "Delhi" in search box
   - Markers should filter to Delhi location
   - Count should show filtered rooms

4. **Test Marker Click:**
   - Click any red marker
   - Info window should show room details
   - Click "View Details" button
   - Side panel should open with full details

5. **Test HTML Version:**
   - Open `map.html` directly in browser
   - All features should work same as React version

---

## Code Examples

### React MapComponent - Key Function:

```javascript
const addMarkers = (mapInstance, roomsToMark) => {
  const locationCoordinates = {
    'delhi': { lat: 28.7041, lng: 77.1025 },
    'mumbai': { lat: 19.0760, lng: 72.8777 },
    // ... more cities
  };

  roomsToMark.forEach((room) => {
    const coords = locationCoordinates[room.location?.toLowerCase()] 
                || { lat: 28.7041, lng: 77.1025 };

    const marker = new google.maps.Marker({
      position: coords,
      map: mapInstance,
      title: room.location,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });

    marker.addListener('click', () => {
      // Show room details
      setSelectedRoom(room);
    });
  });
};
```

### HTML Version - Key Function:

```javascript
function addMarkers(roomsToMark) {
  markers.forEach(marker => marker.setMap(null));
  markers = [];

  roomsToMark.forEach((room) => {
    const marker = new google.maps.Marker({
      position: coords,
      map: map,
      title: room.location
    });

    marker.addListener('click', () => {
      showRoomDetails(roomsToMark.indexOf(room));
    });

    markers.push(marker);
  });
}
```

---

## Troubleshooting

### Issue 1: Map not showing
**Solution:**
- Check if API key is correctly added
- Open browser console (F12) → Check for error messages
- Verify API key has Maps JavaScript API enabled

### Issue 2: Markers not appearing
**Solution:**
- Ensure you have approved room posts
- Check localStorage in browser DevTools
- Verify room locations match city list

### Issue 3: "You have exceeded your request quota"
**Solution:**
- Check if billing is enabled
- Verify API key restrictions
- Reduce request frequency if needed

### Issue 4: Search not working
**Solution:**
- Check if room data exists in localStorage
- Verify search string matches location/address
- Clear browser cache and reload

---

## Customization Options

### Change Default Location:
In MapComponent.js or map.html, modify:
```javascript
const defaultLocation = { lat: 28.7041, lng: 77.1025 }; // Delhi
```

### Change Marker Color:
Replace icon URL:
```javascript
icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
```

Available colors: red, blue, yellow, green, purple, orange

### Add More Cities:
Add to `locationCoordinates` object:
```javascript
'kolkata': { lat: 22.5726, lng: 88.3639 }
```

### Change Zoom Level:
Modify initial zoom:
```javascript
zoom: 12  // Change number (1-20)
```

---

## API Pricing (as of 2024)

- **Free Tier:** $200/month credit (sufficient for most apps)
- **Maps JavaScript API:** $7 per 1000 map loads (after free tier)
- **Markers:** No additional cost
- **Info Windows:** No additional cost

---

## Next Steps

1. ✅ Get API key from Google Cloud
2. ✅ Add key to both files
3. ✅ Test with sample room posts
4. ✅ Customize as needed
5. ✅ Deploy to production

---

## Support Resources

- [Google Maps API Documentation](https://developers.google.com/maps/documentation/javascript)
- [Google Maps Marker Guide](https://developers.google.com/maps/documentation/javascript/markers)
- [Google Maps Info Windows](https://developers.google.com/maps/documentation/javascript/infowindows)
- [Troubleshooting Guide](https://developers.google.com/maps/troubleshooting)

---

**Last Updated:** February 2026
**Version:** 1.0
**Status:** ✅ Production Ready
