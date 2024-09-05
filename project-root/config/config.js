// config.js

// Load environment variables from a .env file
require('dotenv').config();

// Configuration module exports
module.exports = {
  // Secret key used for various cryptographic operations
  secretKey: process.env.SECRET_KEY || 'your_secret_key',

  // JWT secret key for signing tokens
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'your_jwt_secret_key',

  // MongoDB URI for connecting to the database
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/Mor_users', // Ensure correct URI format

  // Debug mode (default to true if not set)
  debug: process.env.DEBUG || true
};
