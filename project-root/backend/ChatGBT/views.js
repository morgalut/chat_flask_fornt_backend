// Import required modules
const express = require('express');
const { OpenAI } = require('openai'); // Updated import based on the latest documentation
const chatgptConfig = require('./config');
const router = express.Router();

// Initialize OpenAI client with API key
const openai = new OpenAI({
  apiKey: chatgptConfig.apiKey,
});

/**
 * Function to fetch a message from ChatGPT
 * @param {string} name - The name to include in the message
 * @returns {Promise<string>} - The response message from ChatGPT
 */
async function fetchMessageFromChatGPT(name) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or the correct model you have access to
      messages: [
        { role: 'user', content: `Give me something random: ${name}` }
      ],
      max_tokens: 50
    });

    const message = response.choices[0].message.content.trim();
    return message;

  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access to ChatGPT API. Check your API key and authentication.");
      return "Unauthorized access to ChatGPT API.";
    }
    console.error(`Error fetching ChatGPT response: ${error.message}`);
    return `Error fetching ChatGPT response: ${error.message}`;
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
