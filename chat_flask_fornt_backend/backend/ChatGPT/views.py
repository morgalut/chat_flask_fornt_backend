from flask import Blueprint, request, jsonify, current_app
from .config import chatgpt_config
import requests

chatgpt_bp = Blueprint('chatgpt', __name__)

def fetch_message_from_chatgpt(name):
    headers = {
        'Authorization': f'Bearer {chatgpt_config.session_token}',
        'Content-Type': 'application/json'
    }
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "user", "content": f"Give me something random: {name}"}
        ],
        "max_tokens": 50
    }

    try:
        response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=payload)
        if response.status_code == 200:
            data = response.json()
            return data['choices'][0]['message']['content'].strip()
        elif response.status_code == 400:
            return 'Failed to fetch message, status code: 400'
        else:
            return f'Failed to fetch message, status code: {response.status_code}'
    except Exception as e:
        return f'Error occurred: {e}'

@chatgpt_bp.route('/get_response', methods=['POST'])
def get_response():
    data = request.json
    if 'name' in data:
        name = data['name']
        current_app.logger.info(f"Received request with name: {name}")
        message = fetch_message_from_chatgpt(name)
        current_app.logger.info(f"ChatGPT generated message: {message}")
        response = f"{message}"
        return jsonify({"message": response}), 200
    else:
        current_app.logger.error("Name not provided in the request")
        return jsonify({"error": "Name not provided"}), 400
