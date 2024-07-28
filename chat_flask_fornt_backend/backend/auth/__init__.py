# backend/auth/__init__.py

from flask import Blueprint
from .auth import auth_bp
from .profile import profile_bp

# Define a Blueprint for the auth routes
auth = Blueprint('auth', __name__)

# Register the auth Blueprint with the parent Flask application
auth.register_blueprint(auth_bp)

# Register the profile Blueprint with the parent Flask application
auth.register_blueprint(profile_bp)
