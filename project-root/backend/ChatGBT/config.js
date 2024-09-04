const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

class ChatGPTConfig {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.apiUrl = process.env.API_URL;
  }
}

const chatgptConfig = new ChatGPTConfig();
module.exports = chatgptConfig;
