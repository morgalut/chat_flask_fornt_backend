// backend/ChatGBT/config.js

// Import required modules
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Class to manage ChatGPT configuration
class ChatGPTConfig {
  /**
   * Constructor to initialize configuration from environment variables
   */
  constructor() {
    // API key for OpenAI
    this.apiKey = process.env.OPENAI_API_KEY;

    // API URL for ChatGPT
    this.apiUrl = process.env.API_URL;
  }
}

// Create an instance of the ChatGPTConfig class
const chatgptConfig = new ChatGPTConfig();

// Export the configuration instance
module.exports = chatgptConfig;
