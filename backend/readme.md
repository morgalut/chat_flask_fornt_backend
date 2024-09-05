
## Features

- **Flask Application**: Handles user authentication, profile management, and integrates with ChatGPT.
- **Node.js Health Checker**: Monitors the health of a Node.js server and ensures communication between the Flask and Node.js servers.
- **ChatGPT Integration**: Fetches responses from ChatGPT based on user input.

## Installation

1. **Clone the Repository**:
    ```bash
    
    cd chat_flask_fornt_backend
    ```

2. **Set Up Virtual Environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Set Up Environment Variables**:
    - Create a `.env` file in the `backend/ChatGPT` directory.
    - Add the following variables:
      ```
      OPENAI_API_KEY=<your-openai-api-key>
      API_URL=<your-chatgpt-api-url>
      ```

## Configuration

### Flask Configuration

- **Secret Key**: Set `SECRET_KEY` for securing the Flask application.
- **JWT Configuration**: Set `JWT_SECRET_KEY` for JWT authentication.
- **MongoDB URI**: Set `MONGO_URI` for MongoDB connection.

### ChatGPT Configuration

- **API Key and URL**: Configured via `.env` file.

## Running the Application

1. **Start the Flask Server**:
    ```bash
    python backend/run.py
    ```

2. **Start the Node.js Server**:
    Ensure the Node.js server is running. The command is defined in `backend/run.py`.

## Endpoints

### Authentication

- **Register**: `POST /api/register`
- **Login**: `POST /api/login`

### Profile

- **Get Profile**: `GET /api/profile` (Requires JWT token)

### ChatGPT

- **Get Response**: `POST /chatgpt/get_response`

## Health Check

- **Health Check Endpoint**: `GET /health`

## Development

- **Code Style**: Follow PEP 8 guidelines.
- **Testing**: Write tests for new features and bug fixes.

## Troubleshooting

- Ensure that environment variables are correctly set.
- Verify MongoDB and Node.js server configurations.

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Open a pull request.

---

For any issues or questions, please contact the repository maintainer.
### `auth/auth.py` (Continued)

```python
            chatgpt_message = fetch_chatgpt_response(user.username)
            return jsonify({
                'message': 'Login successful',
                'token': token,
                'chatgpt_message': chatgpt_message
            }), 200

        return jsonify({'message': 'Invalid username or password'}), 401

    except Exception as e:
        current_app.logger.error(f"Error in login route: {e}")
        return jsonify({'message': 'Internal server error'}), 500
