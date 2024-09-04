// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./auth/auth');
const profileRoutes = require('./auth/profile');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Health check endpoint
app.post('/notify_alive', (req, res) => {
  const message = req.body.message;
  console.log(`Received notification: ${message}`);
  res.status(200).json({ status: 'Received' });
});

// Endpoint to handle registration when Python server is down
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  res.status(200).json({ message: 'Registration handled by Node.js server' });
});

// Ensure correct endpoint for ChatGPT requests
app.post('/chatgpt/get_response', (req, res) => {
  res.status(200).json({ message: 'Handled by Node.js server' });
});

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log(uri);
    
    if (!uri) {
      throw new Error('MONGO_URI environment variable is not defined');
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
