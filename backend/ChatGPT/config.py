import os
from dotenv import load_dotenv

class ChatGPTConfig:
    def __init__(self, config_path):
        load_dotenv(config_path)
        self.api_key = os.getenv('OPENAI_API_KEY')  # Correct variable
        self.api_url = os.getenv('API_URL')

# Load the config using the absolute path to the .env file
config_file_path = 'C:\\Users\\Mor\\Desktop\\CBS\\chat_flask_fornt_backend\\chat_flask_fornt_backend\\backend\\ChatGPT\\.env'
chatgpt_config = ChatGPTConfig(config_file_path)
