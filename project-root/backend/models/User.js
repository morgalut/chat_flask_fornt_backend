// backend/models/User.js

// Import required modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema({
  // Username field, required
  username: { type: String, required: true },

  // Email field, required
  email: { type: String, required: true },

  // Password field, required
  password: { type: String, required: true },

  // Status field, default to 'pending'
  status: { type: String, default: 'pending' },
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Create the User model using the defined schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = { User };
