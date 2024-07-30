# backend/auth/profile.py
from config import Config
from flask import Blueprint, jsonify, current_app, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import requests
from models.extensions import mongo
from bson import ObjectId

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()
    current_app.logger.info(f"Current user ID from token: {current_user}")

    if not ObjectId.is_valid(current_user):
        current_app.logger.error(f"Invalid user ID format: {current_user}")
        return jsonify({'error': 'Invalid user ID format'}), 400

    try:
        user = mongo.db.User.find_one({'_id': ObjectId(current_user)})
        if not user:
            current_app.logger.error(f"User not found: {current_user}")
            return jsonify({'error': 'User not found'}), 404

        # Fetch ChatGPT message
        chatgpt_response = requests.post('http://localhost:5000/chatgpt/get_response', json={'name': user['username']}).json()

        return jsonify({
            'user_id': str(user['_id']),
            'username': user['username'],
            'email': user['email'],
            'status': user['status'],
            'chatgpt_message': chatgpt_response.get('message', f"Failed to fetch message, status code: {chatgpt_response.get('status_code', 'unknown')}")
        })
    except Exception as e:
        current_app.logger.error(f"Error retrieving user profile: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
