# Node.js Server

## Overview

This project is a Node.js server application that includes authentication, user profile management, and integration with OpenAI's ChatGPT. It is designed to handle user registration, login, and profile management while interacting with the ChatGPT API for additional functionality.

## Project Structure

- `backend/`
  - `auth/`
    - `auth.js` - Handles user registration and login.
    - `profile.js` - Manages user profile retrieval.
  - `ChatGBT/`
    - `config.js` - Configuration for OpenAI's ChatGPT.
    - `views.js` - Defines routes for interacting with ChatGPT.
  - `models/`
    - `User.js` - Mongoose schema and model for user data.
    - `extensions.js` - Function for connecting to MongoDB.
  - `enums.js` - Defines status enums used throughout the application.
  - `app.js` - Main application entry point and server setup.
- `config/`
  - `config.js` - Configuration file for environment variables.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- OpenAI API Key

### Installation

1. Clone the repository:
   ```bash
   
   cd project-root/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   SECRET_KEY=your_secret_key
   JWT_SECRET_KEY=your_jwt_secret_key
   MONGO_URI=mongodb://localhost:27017/Mor_users
   OPENAI_API_KEY=your_openai_api_key
   API_URL=your_api_url
   ```

### Running the Server

To start the server, use:
```bash
npm start
```
The server will run on `http://localhost:5001`.

## API Endpoints

### Authentication

- **Register User**
  - `POST /auth/register`
  - Request body: `{ "username": "string", "email": "string", "password": "string" }`
  - Response: `{ "message": "User registered", "user": "username", "chatgpt_message": "ChatGPT response" }`

- **Login User**
  - `POST /auth/login`
  - Request body: `{ "username": "string", "password": "string" }`
  - Response: `{ "message": "Login successful", "token": "jwt_token", "chatgpt_message": "ChatGPT response" }`

### User Profile

- **Get Profile**
  - `GET /profile/profile`
  - Headers: `{ "Authorization": "Bearer <jwt_token>" }`
  - Response: `{ "user_id": "user_id", "username": "username", "email": "email", "status": "status", "chatgpt_message": "ChatGPT response" }`

### ChatGPT Integration

- **Get ChatGPT Response**
  - `POST /chatgpt/get_response`
  - Request body: `{ "name": "string" }`
  - Response: `{ "message": "ChatGPT response" }`

### Health Check

- **Notify Alive**
  - `POST /notify_alive`
  - Request body: `{ "message": "string" }`
  - Response: `{ "status": "Received" }`

## Middleware

- **Auth Middleware**
  - Used to authenticate JWT tokens for protected routes.

## Contributing

Feel free to submit issues and pull requests. Ensure that you follow the code style and write tests for new features.

## License

This project is licensed under the MIT License.

## Contact

For any questions or support, please contact [mor] at [morgalut54@gmail.com].
```

