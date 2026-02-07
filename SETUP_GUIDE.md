# Project Setup Guide - Frontend & Backend

## Project Structure

```
project/
├── public/                    # React public files
├── src/                       # React frontend code
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.js
├── backend/                   # Node.js/Express backend
│   ├── models/               # Mongoose models
│   │   └── Room.js
│   ├── routes/               # API routes
│   │   └── rooms.js
│   ├── config/               # Configuration files
│   │   └── db.js
│   ├── utils/                # Utility functions
│   │   └── helpers.js
│   ├── server.js             # Express server entry point
│   ├── package.json
│   ├── .env                  # Environment variables
│   └── .gitignore
├── package.json              # Frontend dependencies
└── README.md
```

## Quick Start

### 1. Frontend Setup

Install frontend dependencies:
```bash
npm install
```

Start React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

### 2. Backend Setup

Navigate to backend folder:
```bash
cd backend
```

Install backend dependencies:
```bash
npm install
```

Configure MongoDB connection:
- Open or create `backend/.env` file
- Add your MongoDB URI

Start backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## Running Both Frontend & Backend Concurrently

### Option 1: Using concurrently (Recommended)

In root folder, install concurrently:
```bash
npm install --save-dev concurrently
```

Update root `package.json`:
```json
"scripts": {
  "start": "concurrently \"npm start\" \"cd backend && npm run dev\""
}
```

Then run:
```bash
npm start
```

### Option 2: Terminal Tabs
Open two terminals:
- Terminal 1: `npm start` (frontend)
- Terminal 2: `cd backend && npm run dev` (backend)

## API Integration in Frontend

Update your React components to use the backend API:

```javascript
// Example API call in React
const API_URL = 'http://localhost:5000/api';

// Add a room
const addRoom = async (roomData) => {
  const response = await fetch(`${API_URL}/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(roomData),
  });
  return response.json();
};

// Get all rooms
const getAllRooms = async () => {
  const response = await fetch(`${API_URL}/rooms`);
  return response.json();
};

// Get rooms by location
const getRoomsByLocation = async (location) => {
  const response = await fetch(`${API_URL}/rooms/location/${location}`);
  return response.json();
};
```

## Available Backend APIs

### POST /api/rooms
Add a new room
```json
{
  "title": "Room Title",
  "price": 25000,
  "location": "Downtown",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "description": "Description",
  "contactNumber": "9876543210",
  "images": ["url1", "url2"],
  "amenities": ["WiFi", "AC"]
}
```

### GET /api/rooms
Get all rooms with optional filters
- Query params: `page`, `limit`, `minPrice`, `maxPrice`, `availability`

### GET /api/rooms/location/:location
Get rooms by location
- URL param: `location` - location name

### GET /api/rooms/search/nearby
Get rooms by coordinates
- Query params: `latitude`, `longitude`, `radiusInKm`

### GET /api/rooms/:id
Get single room by ID

### PUT /api/rooms/:id
Update room

### DELETE /api/rooms/:id
Delete room

## Environment Variables

### Frontend (.env in root)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend (backend/.env)
```
MONGODB_URI=mongodb://localhost:27017/student_room_finder
PORT=5000
NODE_ENV=development
```

## MongoDB Setup

### Local MongoDB
1. Download from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Default URI: `mongodb://localhost:27017/student_room_finder`

### MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud](https://www.mongodb.com/cloud)
2. Create cluster and get connection string
3. Update `.env` with Atlas URI

## Troubleshooting

### CORS Issues
- Backend has CORS enabled by default
- Ensure frontend URL matches allowed origins

### MongoDB Connection Error
- Check `.env` MONGODB_URI
- Ensure MongoDB server is running
- Check firewall settings

### Port Already in Use
- Frontend port 3000: `PORT=3001 npm start`
- Backend port 5000: `PORT=5001` in `.env`

## Next Steps

1. Connect Room list page to GET /api/rooms
2. Connect Post Room form to POST /api/rooms
3. Connect Search to GET /api/rooms/location/:location
4. Add authentication/authorization
5. Implement image upload
6. Deploy (Heroku for backend, Netlify for frontend)

For detailed backend documentation, see `BACKEND_SETUP.md`
