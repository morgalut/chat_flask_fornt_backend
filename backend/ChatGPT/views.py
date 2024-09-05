"""
This module defines the routes and functions for interacting with ChatGPT,
including fetching a message and processing incoming requests.
"""

from flask import Blueprint, request, jsonify, current_app
import requests
from .config import chatgpt_config

chatgpt_bp = Blueprint('chatgpt', __name__)

def fetch_message_from_chatgpt(name):
    """
    Fetches a message from ChatGPT using the provided name.

    Args:
        name (str): The name to include in the message request.

    Returns:
        str: The response message from ChatGPT or an error message.
    """
    headers = {
        'Authorization': f'Bearer {chatgpt_config.api_key}',
        'Content-Type': 'application/json'
    }
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "user", "content": f"Give me something random: {name}"}
        ],
        "max_tokens": 50
    }

    if not chatgpt_config.api_url:
        return 'API URL is not configured.'

    try:
        response = requests.post(chatgpt_config.api_url, headers=headers, json=payload, timeout=10)
        if response.status_code == 200:
            data = response.json()
            return data['choices'][0]['message']['content'].strip()
        if response.status_code == 400:
            return 'Failed to fetch message, status code: 400'
        return f'Failed to fetch message, status code: {response.status_code}'
    except Exception as e:
        current_app.logger.error(f"Error occurred: {e}")
        return f'Error occurred: {e}'


@chatgpt_bp.route('/get_response', methods=['POST'])
def get_response():
    """
    Processes a POST request to get a response from ChatGPT.

    Returns:
        Response: JSON response containing the message or an error.
    """
    data = request.json
    if 'name' in data:
        name = data['name']
        current_app.logger.info(f"Received request with name: {name}")
        message = fetch_message_from_chatgpt(name)
        current_app.logger.info(f"ChatGPT generated message: {message}")
        return jsonify({"message": message}), 200

    current_app.logger.error("Name not provided in the request")
    return jsonify({"error": "Name not provided"}), 400

