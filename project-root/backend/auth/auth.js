const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const axios = require('axios');
const router = express.Router();

class AuthService {
  async registerUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    return user;
  }

  async authenticateUser(username, password) {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const authService = new AuthService();

  try {
    const user = await authService.registerUser(username, email, password);
    
    try {
      const chatgptResponse = await axios.post('http://localhost:5001/chatgpt/get_response', { name: user.username });
      const chatgptMessage = chatgptResponse.data.message || `Failed to fetch message, status code: ${chatgptResponse.status}`;

      res.status(201).json({
        message: 'User registered',
        user: user.username,
        chatgpt_message: chatgptMessage
      });
    } catch (error) {
      console.error(`Error fetching ChatGPT response: ${error.message}`);
      res.status(500).json({
        message: 'User registered, but error fetching ChatGPT response',
        chatgpt_message: `Error fetching ChatGPT response: ${error.message}`
      });
    }
  } catch (error) {
    console.error(`Error registering user: ${error.message}`);
    res.status(500).json({
      message: 'Error registering user',
      chatgpt_message: `Error registering user: ${error.message}`
    });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const authService = new AuthService();

  try {
    const user = await authService.authenticateUser(username, password);
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

      try {
        const chatgptResponse = await axios.post('http://localhost:5001/chatgpt/get_response', { name: user.username });
        const chatgptMessage = chatgptResponse.data.message || `Failed to fetch message, status code: ${chatgptResponse.status}`;

        res.status(200).json({
          message: 'Login successful',
          token,
          chatgpt_message: chatgptMessage
        });
      } catch (error) {
        console.error(`Error fetching ChatGPT response: ${error.message}`);
        res.status(500).json({
          message: 'Login successful, but error fetching ChatGPT response',
          chatgpt_message: `Error fetching ChatGPT response: ${error.message}`
        });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(`Error logging in: ${error.message}`);
    res.status(500).json({ 
      message: 'Error logging in',
      chatgpt_message: `Error logging in: ${error.message}`
    });
  }
});

module.exports = router;
