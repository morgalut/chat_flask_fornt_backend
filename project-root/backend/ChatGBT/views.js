// views.js
const express = require('express');
const axios = require('axios'); // Use axios for HTTP requests
const chatgptConfig = require('./config'); // Import the config

const router = express.Router();

// Function to fetch message from ChatGPT
async function fetchMessageFromChatGPT(name) {
  const headers = {
    'Authorization': `Bearer ${chatgptConfig.apiKey}`, // Use apiKey from config
    'Content-Type': 'application/json'
  };
  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: `Give me something random: ${name}` }
    ],
    max_tokens: 50
  };

  try {
    const response = await axios.post(chatgptConfig.apiUrl, payload, { headers });
    if (response.status === 200) {
      const data = response.data;
      return data.choices[0].message.content.trim();
    } else if (response.status === 400) {
      return 'Failed to fetch message, status code: 400';
    } else {
      return `Failed to fetch message, status code: ${response.status}`;
    }
  } catch (error) {
    return `Error occurred: ${error.message}`;
  }
}

// Route to get the response
router.post('/get_response', async (req, res) => {
  const { name } = req.body;
  if (name) {
    console.info(`Received request with name: ${name}`);
    const message = await fetchMessageFromChatGPT(name);
    console.info(`ChatGPT generated message: ${message}`);
    return res.status(200).json({ message });
  } else {
    console.error('Name not provided in the request');
    return res.status(400).json({ error: 'Name not provided' });
  }
});

module.exports = router;
