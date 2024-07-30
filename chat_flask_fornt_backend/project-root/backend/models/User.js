// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Status } = require('../enums'); // Assuming you have enums.js file with Status enum

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, required: true, enum: Object.values(Status), default: Status.PENDING }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
