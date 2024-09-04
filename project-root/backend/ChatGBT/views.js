const express = require('express');
const { OpenAI } = require('openai');
const chatgptConfig = require('./config');

const router = express.Router();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: chatgptConfig.apiKey
});

// Function to fetch message from ChatGPT
async function fetchMessageFromChatGPT(name) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: `Give me something random: ${name}` }
      ],
      max_tokens: 50
    });

    // Get the message from the response
    const message = response.choices[0].message.content.trim();
    return message;

  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
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
