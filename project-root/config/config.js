// config.js
require('dotenv').config();

module.exports = {
  secretKey: process.env.SECRET_KEY || 'your_secret_key',
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'your_jwt_secret_key',
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/Mor_users', // Ensure correct URI format
  debug: process.env.DEBUG || true
};


