// backend/auth/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secretKey, jwtSecretKey, mongoURI } = require('../../config/config'); // Corrected path
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      status: 'pending'
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        username: user.username
      }
    };

    jwt.sign(payload, jwtSecretKey, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token, message: 'User registered', user: user.username });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username
      }
    };

    jwt.sign(payload, jwtSecretKey, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token, message: 'Login successful', user: user.username });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
