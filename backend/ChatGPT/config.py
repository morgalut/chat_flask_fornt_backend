"""
Configuration module for ChatGPT.
Loads configuration from an environment file (.env).
"""

import os
from dotenv import load_dotenv

class ChatGPTConfig:
    """
    Configuration class for ChatGPT API.

    Args:
        config_path (str): Path to the .env file containing configuration.
    """
    def __init__(self, config_path):
        """
        Initializes the configuration by loading environment variables.

        Args:
            config_path (str): Path to the .env file.
        """
        load_dotenv(config_path)
        self.api_key = os.getenv('OPENAI_API_KEY')
        self.api_url = os.getenv('API_URL')
        print(f"API Key: {self.api_key}")
        print(f"API URL: {self.api_url}")

# Load the config using the absolute path to the .env file
CONFIG_FILE_PATH = 'chat_flask_fornt_backend/backend/ChatGPT/.env'
chatgpt_config = ChatGPTConfig(CONFIG_FILE_PATH)
