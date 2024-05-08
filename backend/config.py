# config.py

import os

class Config:
    # Flask app configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key'
    DEBUG = True  # Set to False in production
    SQLALCHEMY_DATABASE_URI = 'sqlite:///your_database.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))  # Base directory of the project

    # JWT configuration
    JWT_SECRET_KEY = 'your_jwt_secret_key'

    # File upload configuration
    INSTANCE_FOLDER_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'instance')
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)),'img')
