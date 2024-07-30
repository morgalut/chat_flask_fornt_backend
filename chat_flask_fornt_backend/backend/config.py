# C:\Users\Mor\Desktop\test2\chat_flask_fornt_backend\backend\config.py
import os

class Config:
    # Flask app configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key'
    DEBUG = True  # Set to False in production
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))  # Base directory of the project

    # JWT configuration
    JWT_SECRET_KEY = 'your_jwt_secret_key'

    # File upload configuration

    # MongoDB configuration
    MONGO_URI = 'mongodb://localhost:27017/User'  # Make sure this URI is correct
