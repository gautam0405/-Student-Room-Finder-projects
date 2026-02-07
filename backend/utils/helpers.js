// Utility functions for the backend

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidPhoneNumber(phone) {
  const phoneRegex = /^[0-9]{10,}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

/**
 * Validate coordinates
 * @param {number} latitude - Latitude value
 * @param {number} longitude - Longitude value
 * @returns {boolean} True if valid, false otherwise
 */
function isValidCoordinates(latitude, longitude) {
  return (
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

/**
 * Format error response
 * @param {string} message - Error message
 * @param {string} error - Error details
 * @returns {object} Formatted error object
 */
function formatErrorResponse(message, error = null) {
  return {
    success: false,
    message,
    ...(error && { error }),
  };
}

/**
 * Format success response
 * @param {string} message - Success message
 * @param {any} data - Response data
 * @returns {object} Formatted success object
 */
function formatSuccessResponse(message, data = null) {
  return {
    success: true,
    message,
    ...(data && { data }),
  };
}

module.exports = {
  calculateDistance,
  isValidPhoneNumber,
  isValidCoordinates,
  formatErrorResponse,
  formatSuccessResponse,
};
