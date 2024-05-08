# backend/auth/auth.py

import os
from flask import Blueprint, request, jsonify, send_from_directory
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash
from models import db, User
from config import Config
import datetime

auth_bp = Blueprint('auth', __name__)

# Serve uploaded images
@auth_bp.route('/images/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(Config.UPLOAD_FOLDER, filename)

@auth_bp.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.form
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        profile_picture = request.files.get('profile_picture') 
        
        if not username or not email or not password:
            return jsonify({'error': 'Please provide username, email, and password'}), 400

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'error': 'User already exists with this username'}), 400

        hashed_password = generate_password_hash(password)

        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        token = create_access_token(identity=new_user.id)

        if profile_picture:
            if profile_picture.filename == '':
                return jsonify({'error': 'No selected file'}), 400
            # Ensure the profile picture folder exists
            profile_picture_folder = Config.UPLOAD_FOLDER

            # Generate a unique filename for the profile picture
            filename = f"user_{new_user.id}_{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}_{secure_filename(profile_picture.filename)}"
            
            # Save image to the folder
            save_path = os.path.join(profile_picture_folder, filename)
            profile_picture.save(save_path)
            
            # Check if the file was saved successfully
            if not os.path.exists(save_path):
                return jsonify({'error': 'Failed to save the image file'}), 500
            
            new_user.profile_picture = filename
            db.session.commit()

        return jsonify({'message': 'User registered successfully', 'token': token}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/decode_token', methods=['GET'])
@jwt_required()
def decode_token_route():
    try:
        current_user_id = get_jwt_identity()
        return jsonify({'user_id': current_user_id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        # Basic validation
        if not username or not password:
            return jsonify({"error": "Please provide both username and password"}), 400

        # Query the database to check if the user exists
        user = User.query.filter_by(username=username).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        # Verify the password using Bcrypt
        if not check_password_hash(user.password, password):
            return jsonify({"error": "Incorrect password"}), 401

        # Generate access token
        access_token = create_access_token(identity=user.id)

        return jsonify({"access_token": access_token}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
