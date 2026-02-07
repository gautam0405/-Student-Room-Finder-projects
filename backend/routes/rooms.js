const express = require('express');
const { body, validationResult } = require('express-validator');
const Room = require('../models/Room');

const router = express.Router();

// Validation middleware
const validateRoom = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('latitude').isFloat().withMessage('Latitude must be a valid number'),
  body('longitude').isFloat().withMessage('Longitude must be a valid number'),
  body('contactNumber').matches(/^[0-9]{10,}$/).withMessage('Contact number must be at least 10 digits'),
  body('description').trim().isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
];

// Helper function to handle validation errors
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
};

/**
 * @route   POST /api/rooms
 * @desc    Add a new room
 * @access  Public
 */
router.post('/', validateRoom, async (req, res) => {
  // Check for validation errors
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ success: false, errors: validationErrors.array() });
  }

  try {
    const { title, price, location, latitude, longitude, description, contactNumber, images, amenities, postedBy } = req.body;

    // Create new room
    const room = new Room({
      title,
      price,
      location,
      latitude,
      longitude,
      description,
      contactNumber,
      images: images || [],
      amenities: amenities || [],
      postedBy: postedBy || 'Anonymous',
    });

    // Save room to database
    const savedRoom = await room.save();

    res.status(201).json({
      success: true,
      message: 'Room added successfully',
      data: savedRoom,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding room',
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/rooms
 * @desc    Get all rooms with pagination and filtering
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, minPrice, maxPrice, availability } = req.query;

    // Build filter object
    const filter = {};

    if (minPrice && maxPrice) {
      filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    } else if (minPrice) {
      filter.price = { $gte: Number(minPrice) };
    } else if (maxPrice) {
      filter.price = { $lte: Number(maxPrice) };
    }

    if (availability !== undefined) {
      filter.availability = availability === 'true';
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const rooms = await Room.find(filter)
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const total = await Room.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: rooms,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching rooms',
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/rooms/location/:location
 * @desc    Get all rooms by location
 * @access  Public
 */
router.get('/location/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Case-insensitive location search
    const skip = (page - 1) * limit;
    const rooms = await Room.find({
      location: { $regex: location, $options: 'i' },
    })
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Room.countDocuments({
      location: { $regex: location, $options: 'i' },
    });

    res.status(200).json({
      success: true,
      data: rooms,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching rooms by location',
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/rooms/search/nearby
 * @desc    Get rooms by coordinates (latitude, longitude) with radius
 * @access  Public
 */
router.get('/search/nearby', async (req, res) => {
  try {
    const { latitude, longitude, radiusInKm = 10 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required',
      });
    }

    const radiusInRadians = radiusInKm / 6371; // Convert km to radians

    const rooms = await Room.find({
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        distanceField: 'dist.calculated',
        maxDistance: radiusInRadians,
        spherical: true,
      },
    });

    res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching nearby rooms',
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/rooms/:id
 * @desc    Get a single room by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching room',
      error: error.message,
    });
  }
});

/**
 * @route   PUT /api/rooms/:id
 * @desc    Update a room
 * @access  Public
 */
router.put('/:id', validateRoom, async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ success: false, errors: validationErrors.array() });
  }

  try {
    const { title, price, location, latitude, longitude, description, contactNumber, images, amenities, availability } = req.body;

    let room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    // Update fields
    room.title = title || room.title;
    room.price = price || room.price;
    room.location = location || room.location;
    room.latitude = latitude || room.latitude;
    room.longitude = longitude || room.longitude;
    room.description = description || room.description;
    room.contactNumber = contactNumber || room.contactNumber;
    if (images) room.images = images;
    if (amenities) room.amenities = amenities;
    if (availability !== undefined) room.availability = availability;

    const updatedRoom = await room.save();

    res.status(200).json({
      success: true,
      message: 'Room updated successfully',
      data: updatedRoom,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating room',
      error: error.message,
    });
  }
});

/**
 * @route   DELETE /api/rooms/:id
 * @desc    Delete a room
 * @access  Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Room deleted successfully',
      data: room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting room',
      error: error.message,
    });
  }
});

module.exports = router;
