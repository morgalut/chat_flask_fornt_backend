import os
from dotenv import load_dotenv

class ChatGPTConfig:
    def __init__(self, config_path):
        load_dotenv(config_path)
        self.api_key = os.getenv('OPENAI_API_KEY')
        self.api_url = os.getenv('API_URL')
        print(f"API Key: {self.api_key}")
        print(f"API URL: {self.api_url}")


# Load the config using the absolute path to the .env file
config_file_path = 'C:\\Users\\Mor\\Desktop\\chat_flask_fornt_backend\\backend\\ChatGPT\\.env'
chatgpt_config = ChatGPTConfig(config_file_path)

