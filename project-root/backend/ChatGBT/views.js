// backend/ChatGBT/views.js

// Import required modules
const express = require('express');
const { OpenAI } = require('openai');
const chatgptConfig = require('./config');

// Initialize Express router
const router = express.Router();

// Initialize OpenAI client with API key
const openai = new OpenAI({
  apiKey: chatgptConfig.apiKey
});

/**
 * Function to fetch a message from ChatGPT
 * @param {string} name - The name to include in the message
 * @returns {Promise<string>} - The response message from ChatGPT
 */
async function fetchMessageFromChatGPT(name) {
  try {
    // Request completion from OpenAI ChatGPT
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: `Give me something random: ${name}` }
      ],
      max_tokens: 50
    });

    // Extract and trim the message from the response
    const message = response.choices[0].message.content.trim();
    return message;

  } catch (error) {
    // Log error message and return error response
    console.error(`Error occurred: ${error.message}`);
    return `Error occurred: ${error.message}`;
  }
}

// Route to handle POST request and get response from ChatGPT
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

// Export the router
module.exports = router;
