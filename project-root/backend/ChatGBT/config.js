// config.js
require('dotenv').config(); // Load environment variables from .env file

class ChatGPTConfig {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.apiUrl = process.env.API_URL;
  }
}

const chatgptConfig = new ChatGPTConfig();
module.exports = chatgptConfig;
