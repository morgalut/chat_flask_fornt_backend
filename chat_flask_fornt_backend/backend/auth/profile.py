# backend/auth/profile.py
from flask import Blueprint, jsonify, current_app, send_from_directory, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.extensions import mongo
from bson import ObjectId
import os
import requests

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

        profile_picture_url = None
        if user.get('profile_picture_id'):
            profile_picture_url = f"/uploads/{user['profile_picture_id']}.png"

        # Fetch ChatGPT message
        chatgpt_response = requests.post('http://localhost:5000/chatgpt/get_response', json={'name': user['username']}).json()

        return jsonify({
            'user_id': str(user['_id']),
            'username': user['username'],
            'email': user['email'],
            'profilePictureUrl': profile_picture_url,
            'status': user['status'],
            'chatgpt_message': chatgpt_response.get('message', f"Failed to fetch message, status code: {chatgpt_response.get('status_code', 'unknown')}")
        })
    except Exception as e:
        current_app.logger.error(f"Error retrieving user profile: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
