const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a room title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide the room price'],
      min: [0, 'Price must be positive'],
    },
    location: {
      type: String,
      required: [true, 'Please provide the location'],
      trim: true,
    },
    latitude: {
      type: Number,
      required: [true, 'Please provide latitude'],
    },
    longitude: {
      type: Number,
      required: [true, 'Please provide longitude'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    contactNumber: {
      type: String,
      required: [true, 'Please provide a contact number'],
      match: [/^[0-9]{10,}$/, 'Please provide a valid phone number'],
    },
    images: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    availability: {
      type: Boolean,
      default: true,
    },
    postedBy: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for location-based queries
roomSchema.index({ location: 'text', title: 'text' });
roomSchema.index({ latitude: 1, longitude: 1 });

module.exports = mongoose.model('Room', roomSchema);
