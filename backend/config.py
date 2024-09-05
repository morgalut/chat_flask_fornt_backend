"""
This module contains configuration settings for the Flask application.

It includes settings for security, debugging, JWT authentication, 
file uploads, and MongoDB connection.
"""

import os


class Config:
    """
    Configuration class for the Flask application.

    This class stores all the necessary configuration settings such as 
    secret keys, debugging flags, and database URIs.
    """
    
    # Flask app configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key'
    DEBUG = True  # Set to False in production
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))  # Base directory of the project

    # JWT configuration
    JWT_SECRET_KEY = 'your_jwt_secret_key'

    # MongoDB configuration
    MONGO_URI = 'mongodb://localhost:27017/Mor'  # Make sure this URI is correct
