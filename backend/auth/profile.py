from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/user/profile', methods=['GET'])
@jwt_required()
def profile():
    try:
        user_id = get_jwt_identity()
        if user_id:
            user = User.query.get(user_id)
            if user:
                profile_data = {
                    'user_id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'status': 'User status message',
                    'profilePictureUrl': f'{request.url_root}images/{user.profile_picture}' if user.profile_picture else None
                }
                return jsonify(profile_data), 200
            else:
                return jsonify({'error': 'User not found'}), 404
        else:
            return jsonify({'error': 'Unauthorized'}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
