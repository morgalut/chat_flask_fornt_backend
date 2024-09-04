const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const Mor = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, default: 'pending' },
});

// Compare password method
Mor.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Create the User model
const User = mongoose.model('User', Mor);

module.exports = { User };
