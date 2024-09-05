// app.js

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const chatgptRoutes = require('./ChatGBT/views');
const authRoutes = require('./auth/auth');
const profileRoutes = require('./auth/profile');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(cors());          // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming JSON requests (bodyParser is redundant with express.json())

// Route handlers
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/chatgpt', chatgptRoutes);

// Health check endpoint
app.post('/notify_alive', (req, res) => {
  const message = req.body.message;
  console.log(`Received notification: ${message}`);
  res.status(200).json({ status: 'Received' });
});

// Registration endpoint (for fallback when Python server is down)
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  res.status(200).json({ message: 'Registration handled by Node.js server' });
});

// ChatGPT response endpoint
app.post('/chatgpt/get_response', (req, res) => {
  console.log(req.body); // Log the parsed JSON object
  res.send('Handled by Node.js server');
});

// Database connection function
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
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
    process.exit(1); // Exit process on failure to connect to the database
  }
};

// Connect to the database
connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
