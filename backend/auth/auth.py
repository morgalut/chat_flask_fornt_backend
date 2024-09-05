"""
Authentication module for handling user registration and login.
"""

from datetime import date
import io
from bson import ObjectId
from flask import Blueprint, request, jsonify, current_app
import requests
from models.models import User
from models.extensions import mongo
from enums import Status
import bcrypt
from flask_jwt_extended import create_access_token
from config import Config
import gridfs
import os

auth_bp = Blueprint('auth', __name__)

class AuthService:
    """
    Service class for handling user authentication and registration.
    """
    
    def register_user(self, username, email, password):
        """
        Registers a new user with hashed password.

        Args:
            username (str): The username of the user.
            email (str): The email of the user.
            password (str): The plaintext password of the user.

        Returns:
            User: The created user object.
        """
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user = User(username=username, email=email, password=hashed_password, status=Status.PENDING)
        user.save()
        return user

    def authenticate_user(self, username, password):
        """
        Authenticates a user by checking the password.

        Args:
            username (str): The username of the user.
            password (str): The plaintext password of the user.

        Returns:
            User or None: The authenticated user object or None if authentication fails.
        """
        user = User.find_by_username(username)
        if user and bcrypt.checkpw(password.encode('utf-8'), user.password):
            return user
        current_app.logger.error("Invalid username or password")
        return None

@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Endpoint for user registration.

    Returns:
        Response: JSON response with registration status and ChatGPT message.
    """
    try:
        data = request.json
        if not all(key in data for key in ['username', 'email', 'password']):
            return jsonify({'message': 'Missing required fields'}), 400

        auth_service = AuthService()
        user = auth_service.register_user(data['username'], data['email'], data['password'])
        
        chatgpt_message = fetch_chatgpt_response(user.username)
        
        return jsonify({
            'message': 'User registered',
            'user': user.username,
            'chatgpt_message': chatgpt_message
        }), 201

    except Exception as e:
        current_app.logger.error(f"Error in register route: {e}")
        return jsonify({'message': 'Internal server error'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Endpoint for user login.

    Returns:
        Response: JSON response with login status, token, and ChatGPT message.
    """
    try:
        data = request.json
        auth_service = AuthService()
        user = auth_service.authenticate_user(data['username'], data['password'])
        
        if user:
            token = create_access_token(identity=str(user.id))
            chatgpt_message = fetch_chatgpt_response(user.username)
            return jsonify({
                'message': 'Login successful',
                'token': token,
                'chatgpt_message': chatgpt_message
            }), 200
        
        current_app.logger.error("Invalid credentials")
        return jsonify({'message': 'Invalid credentials'}), 401

    except Exception as e:
        current_app.logger.error(f"Error in login route: {e}")
        return jsonify({'message': 'Internal server error'}), 500

def fetch_chatgpt_response(username):
    """
    Fetches a response from ChatGPT.

    Args:
        username (str): The username to be sent to ChatGPT.

    Returns:
        str: The ChatGPT response message.
    """
    try:
        response = requests.post('http://localhost:5000/chatgpt/get_response', json={'name': username}, timeout=10)
        response.raise_for_status()
        return response.json().get('message', 'Failed to fetch message')
    except requests.exceptions.RequestException as e:
        current_app.logger.error(f"Error fetching ChatGPT response: {e}")
        return f"Error fetching ChatGPT response: {e}"
    except ValueError as e:
        current_app.logger.error(f"Error parsing ChatGPT response: {e}")
        return f"Error parsing ChatGPT response: {e}"
