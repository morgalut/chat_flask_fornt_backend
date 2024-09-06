"""
This module defines the routes and functions for interacting with ChatGPT,
including fetching a message and processing incoming requests.
"""

from flask import Blueprint, request, jsonify, current_app
import requests
from .config import chatgpt_config

chatgpt_bp = Blueprint('chatgpt', __name__)

def fetch_chatgpt_response(username):
    """
    Fetches a message from ChatGPT using the provided name.

    Args:
        username (str): The name to include in the message request.

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
            {"role": "user", "content": f"Give me something random: {username}"}
        ],
        "max_tokens": 50
    }

    if not chatgpt_config.api_url:
        return 'API URL is not configured.'

    try:
        # Correct the URL to call the OpenAI API directly
        response = requests.post(chatgpt_config.api_url, headers=headers, json=payload, timeout=10)
        response.raise_for_status()
        chatgpt_response = response.json()
        return chatgpt_response.get('choices', [{}])[0].get('message', {}).get('content', "No message received.")
    except requests.exceptions.HTTPError as e:
        if response.status_code == 401:
            current_app.logger.error("Unauthorized access to ChatGPT API. Check your authentication.")
            return "Unauthorized access to ChatGPT API."
        current_app.logger.error(f"HTTP error fetching ChatGPT response: {e}")
        return f"HTTP error fetching ChatGPT response: {e}"
    except requests.exceptions.RequestException as e:
        current_app.logger.error(f"Error fetching ChatGPT response: {e}")
        return f"Error fetching ChatGPT response: {e}"
    except ValueError as e:
        current_app.logger.error(f"Error parsing ChatGPT response: {e}")
        return f"Error parsing ChatGPT response: {e}"


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
        
        # Use the correct function name here
        message = fetch_chatgpt_response(name)
        
        current_app.logger.info(f"ChatGPT generated message: {message}")
        return jsonify({"message": message}), 200

    current_app.logger.error("Name not provided in the request")
    return jsonify({"error": "Name not provided"}), 400
