// backend/models/extensions.js

// Import required module
const mongoose = require('mongoose');

/**
 * Connect to MongoDB using the URI from environment variables
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB with options for new URL parser and unified topology
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected'); // Log success message
  } catch (err) {
    // Log error message and exit process if connection fails
    console.error(err.message);
    process.exit(1);
  }
};

// Export the connectDB function
module.exports = connectDB;
