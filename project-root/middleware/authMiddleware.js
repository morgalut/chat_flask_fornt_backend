// backend/middleware/authMiddleware.js

// Import required modules
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config/config'); // Import JWT secret key from config

/**
 * Middleware function to authenticate JWT tokens
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
module.exports.authMiddleware = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return an unauthorized response
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // If token verification fails, return an unauthorized response
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
