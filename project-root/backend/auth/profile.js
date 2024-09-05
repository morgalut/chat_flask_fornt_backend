// backend/auth/profile.js

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Initialize Express router
const router = express.Router();

/**
 * Middleware to verify JWT token
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 */
const authenticateToken = (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  // Return 401 if token is not present
  if (token == null) return res.sendStatus(401);

  // Verify token and extract user information
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Attach user information to request
    next(); // Proceed to the next middleware/handler
  });
};

// Route to get user profile information
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Retrieve user ID from the token and fetch user from the database
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const user = await User.findById(userId);
    
    // Return 404 if user is not found
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Fetch ChatGPT response related to the user
    const chatgptResponse = await axios.post('http://localhost:5001/chatgpt/get_response', { name: user.username });
    const chatgptMessage = chatgptResponse.data.message || `Failed to fetch message, status code: ${chatgptResponse.status}`;

    // Send user profile and ChatGPT message as response
    res.status(200).json({
      user_id: user._id.toString(),
      username: user.username,
      email: user.email,
      status: user.status,
      chatgpt_message: chatgptMessage
    });
  } catch (error) {
    console.error(`Error retrieving user profile: ${error.message}`);
    // Send 500 response on error
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
