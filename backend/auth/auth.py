# backend/auth/auth.py
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
from werkzeug.utils import secure_filename

auth_bp = Blueprint('auth', __name__)

class AuthService:
    def register_user(self, username, email, password, profile_picture=None):
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user = User(username=username, email=email, password=hashed_password, status=Status.PENDING)
        
        # Save user to the database
        user.save()

        return user


    def authenticate_user(self, username, password):
        user = User.find_by_username(username)
        if user:
            if bcrypt.checkpw(password.encode('utf-8'), user.password):
                return user
            else:
                current_app.logger.error("Password check failed")
        else:
            current_app.logger.error("User not found")
        return None

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.form
    profile_picture = request.files.get('profile_picture')
    auth_service = AuthService()
    user = auth_service.register_user(data['username'], data['email'], data['password'], profile_picture)
    
    try:
        current_app.logger.info(f"Sending request to ChatGPT with name: {user.username}")
        chatgpt_response = requests.post('http://localhost:5001/chatgpt/get_response', json={'name': user.username})
        chatgpt_response.raise_for_status()
        current_app.logger.info(f"ChatGPT response status code: {chatgpt_response.status_code}")
        chatgpt_message = chatgpt_response.json().get('message', f"Failed to fetch message, status code: {chatgpt_response.status_code}")
    except requests.exceptions.RequestException as e:
        current_app.logger.error(f"Error fetching ChatGPT response: {e}")
        chatgpt_message = f"Error fetching ChatGPT response: {e}"
    except ValueError as e:
        current_app.logger.error(f"Error parsing ChatGPT response: {e}")
        chatgpt_message = f"Error parsing ChatGPT response: {e}"

    return jsonify({
        'message': 'User registered',
        'user': user.username,
        'chatgpt_message': chatgpt_message
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    current_app.logger.info(f"Login attempt with username: {data['username']}")
    auth_service = AuthService()
    user = auth_service.authenticate_user(data['username'], data['password'])
    if user:
        token = create_access_token(identity=str(user.id))
        
        try:
            current_app.logger.info(f"Sending request to ChatGPT with name: {user.username}")
            chatgpt_response = requests.post('http://localhost:5000/chatgpt/get_response', json={'name': user.username})
            chatgpt_response.raise_for_status()
            current_app.logger.info(f"ChatGPT response status code: {chatgpt_response.status_code}")
            chatgpt_message = chatgpt_response.json().get('message', f"Failed to fetch message, status code: {chatgpt_response.status_code}")
        except requests.exceptions.RequestException as e:
            current_app.logger.error(f"Error fetching ChatGPT response: {e}")
            chatgpt_message = f"Error fetching ChatGPT response: {e}"
        except ValueError as e:
            current_app.logger.error(f"Error parsing ChatGPT response: {e}")
            chatgpt_message = f"Error parsing ChatGPT response: {e}"

        return jsonify({
            'message': 'Login successful',
            'token': token,
            'chatgpt_message': chatgpt_message
        }), 200
    current_app.logger.error("Invalid credentials")
    return jsonify({'message': 'Invalid credentials'}), 401
