# backend/chatgpt/__init__.py

from flask import Blueprint

chatgpt_bp = Blueprint('chatgpt', __name__)

from . import views
