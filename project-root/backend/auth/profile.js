const express = require('express');
const mongoose = require('mongoose');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const router = express.Router();

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const chatgptResponse = await axios.post('http://localhost:5001/chatgpt/get_response', { name: user.username });
    const chatgptMessage = chatgptResponse.data.message || `Failed to fetch message, status code: ${chatgptResponse.status}`;

    res.status(200).json({
      user_id: user._id.toString(),
      username: user.username,
      email: user.email,
      status: user.status,
      chatgpt_message: chatgptMessage
    });
  } catch (error) {
    console.error(`Error retrieving user profile: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
