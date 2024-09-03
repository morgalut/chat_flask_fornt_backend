const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001; // Make sure this port is consistent

// Middleware
app.use(express.json());
app.use(cors()); // Allow CORS for all origins for testing, adjust for production

// Health check endpoint
app.post('/notify_alive', (req, res) => {
  const message = req.body.message;
  console.log(`Received notification: ${message}`);
  res.status(200).json({ status: 'Received' });
});

// Endpoint to handle registration when Python server is down
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  // Implement registration logic here
  res.status(200).json({ message: 'Registration handled by Node.js server' });
});

// Ensure correct endpoint for ChatGPT requests
app.post('/chatgpt/get_response', (req, res) => {
  // Implement logic to handle requests
  res.status(200).json({ message: 'Handled by Node.js server' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Implement your authentication logic here
  // This is a placeholder; replace with your actual authentication logic
  if (username === 'testuser' && password === 'password') {
    // Simulate successful login
    res.status(200).json({ token: 'dummy_token', chatgpt_message: 'Welcome!' });
  } else {
    // Simulate failed login
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

