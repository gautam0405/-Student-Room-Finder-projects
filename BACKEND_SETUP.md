# Backend Setup Guide - Room Finder API

## Overview
This guide explains how to set up and run the Node.js/Express backend with MongoDB for the Student Room Finder project.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Installation

### 1. Install Backend Dependencies
Navigate to the backend folder and install required packages:

```bash
cd backend
npm install
```

### 2. Configure MongoDB Connection
Create a `.env` file in the `backend` folder with your MongoDB connection string:

```bash
# For Local MongoDB
MONGODB_URI=mongodb://localhost:27017/student_room_finder

# For MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_room_finder?retryWrites=true&w=majority

# Server Port
PORT=5000
NODE_ENV=development
```

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### 1. Add a New Room
**POST** `/api/rooms`

```json
{
  "title": "Cozy Studio Apartment",
  "price": 25000,
  "location": "Downtown Center",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "description": "Spacious studio with parking",
  "contactNumber": "9876543210",
  "images": ["url1", "url2"],
  "amenities": ["WiFi", "AC", "Parking"],
  "postedBy": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Room added successfully",
  "data": {
    "_id": "...",
    "title": "Cozy Studio Apartment",
    "price": 25000,
    ...
  }
}
```

### 2. Get All Rooms
**GET** `/api/rooms`

**Query Parameters:**
- `page` (default: 1) - Page number for pagination
- `limit` (default: 10) - Number of rooms per page
- `minPrice` - Filter by minimum price
- `maxPrice` - Filter by maximum price
- `availability` - Filter by availability (true/false)

**Example:**
```
GET /api/rooms?page=1&limit=10&minPrice=20000&maxPrice=50000
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "Room Title",
      "price": 25000,
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

### 3. Get Rooms by Location
**GET** `/api/rooms/location/:location`

**Parameters:**
- `location` (URL parameter) - Location name (case-insensitive)
- `page` (default: 1) - Page number
- `limit` (default: 10) - Results per page

**Example:**
```
GET /api/rooms/location/Downtown%20Center?page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {...}
}
```

### 4. Get Rooms Nearby (by Coordinates)
**GET** `/api/rooms/search/nearby`

**Query Parameters:**
- `latitude` (required) - Center latitude
- `longitude` (required) - Center longitude
- `radiusInKm` (default: 10) - Search radius in kilometers

**Example:**
```
GET /api/rooms/search/nearby?latitude=28.6139&longitude=77.2090&radiusInKm=5
```

### 5. Get Single Room by ID
**GET** `/api/rooms/:id`

### 6. Update a Room
**PUT** `/api/rooms/:id`

### 7. Delete a Room
**DELETE** `/api/rooms/:id`

### 8. Health Check
**GET** `/api/health`

## Room Model Fields

```javascript
{
  title: String (required, max 100 chars),
  price: Number (required, positive),
  location: String (required),
  latitude: Number (required),
  longitude: Number (required),
  description: String (max 1000 chars),
  contactNumber: String (required, 10+ digits),
  images: [String],
  amenities: [String],
  availability: Boolean (default: true),
  postedBy: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## MongoDB Setup

### Local MongoDB
1. Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Default connection: `mongodb://localhost:27017/student_room_finder`

### MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud](https://www.mongodb.com/cloud)
2. Create a cluster
3. Get connection string
4. Use in `.env` file

## Testing the API

You can test the API using tools like:
- **Postman** - GUI REST client
- **cURL** - Command line
- **Thunder Client** - VS Code extension
- **REST Client** - VS Code extension

### Example using cURL:
```bash
# Add a room
curl -X POST http://localhost:5000/api/rooms \
  -H "Content-Type: application/json" \
  -d '{"title":"Room 1","price":25000,"location":"Downtown","latitude":28.6139,"longitude":77.2090,"contactNumber":"9876543210"}'

# Get all rooms
curl http://localhost:5000/api/rooms

# Get rooms by location
curl http://localhost:5000/api/rooms/location/Downtown

# Get single room
curl http://localhost:5000/api/rooms/60d5ec49f1b2c72d8c8e4a1b
```

## Frontend Integration

To connect your React frontend to this API, update your API calls to point to the backend:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';

// Example: Get all rooms
fetch(`${API_BASE_URL}/rooms`)
  .then(res => res.json())
  .then(data => console.log(data))
```

## Environment Variables

### Development
```
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/student_room_finder
PORT=5000
```

### Production
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
PORT=5000
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB server is running
- Check connection string in `.env`
- Verify firewall settings if using MongoDB Atlas

### CORS Errors
- The backend is configured with CORS enabled
- Ensure frontend requests include proper headers

### Validation Errors
- Check field requirements in error response
- Refer to Room Model Fields section

## Next Steps

1. Set up frontend API integration
2. Add authentication/authorization
3. Implement file upload for images
4. Add search and filtering features
5. Deploy to production (Heroku, AWS, etc.)
