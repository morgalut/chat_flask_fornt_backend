### This is what I understood to be done in the project

# Chat Flask Frontend Backend Project

This project integrates a Flask backend for handling user authentication and interactions with OpenAI's ChatGPT. Below is a comprehensive explanation of the codebase, including the purpose and functionality of each file, as well as instructions for testing the backend.


## Table of Contents

  - [Backend Files](#backend-files)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Detailed Explanation of `requirements.txt`](#detailed-explanation-of-requirementstxt)
- [Contributing](#contributing)
- [License](#license)

### Backend Files

#### `backend/__init__.py`
- Initializes the Flask application, setting up configurations and initializing extensions.

#### `backend/run.py`
- Entry point of the Flask application. Creates and configures the Flask app, initializes MongoDB and JWT, sets up CORS, registers blueprints, and runs the application.

#### `backend/enums.py`
- Defines enumerations for user roles and statuses.

#### `backend/models/__init__.py`
- Initializes the models module.

#### `backend/models/models.py`
- Defines the `User` model for interacting with MongoDB. Handles user data, including saving and finding users, and uses bcrypt for password hashing and gridfs for profile picture storage.

#### `backend/models/extensions.py`
- Initializes the PyMongo extension for MongoDB interactions.

#### `backend/models/config.py`
- Contains configuration settings for the Flask application, JWT, file uploads, and MongoDB.

#### `backend/ChatGPT/__init__.py`
- Initializes the ChatGPT module.

#### `backend/ChatGPT/views.py`
- Handles interactions with OpenAI's ChatGPT API. Defines a blueprint for ChatGPT endpoints and fetches messages from ChatGPT using a POST request.

#### `backend/ChatGPT/config.py`
- Loads configuration for ChatGPT using environment variables.

#### `backend/auth/__init__.py`
- Initializes the authentication module.

#### `backend/auth/auth.py`
- Handles user registration and authentication. Defines a blueprint for authentication endpoints, registers and authenticates users, and interacts with ChatGPT to fetch messages during registration and login.

#### `backend/auth/profile.py`
- Manages user profile details and interactions.

## Installation

To set up and run the backend server, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/morgalut/chat_flask_fornt_backend.git
   cd chat_flask_fornt_backend/backend
   pip install -r requirements.txt
   ```


## Environment Variables

Ensure you have a `.env` file in the `backend` directory with the following variables:

- `FLASK_APP`: Entry point of the Flask application, typically set to `run.py`.
- `FLASK_ENV`: Defines the environment in which the Flask application runs. Set to `development` for development purposes.
- `MONGO_URI`: The URI for connecting to your MongoDB instance. Default is `mongodb://localhost:27017/test`.
- `JWT_SECRET_KEY`: Secret key for JWT authentication. Ensure this is a strong, unique key.
- `UPLOAD_FOLDER`: Path to the folder where uploaded files will be stored.
- `CHATGPT_API_KEY`: Your OpenAI API key for accessing ChatGPT services.

## Running the Application

To run the Flask application, follow these steps:

1. **Activate the virtual environment:**

   

   ```bash
      python -m virtualenv env
      On Windows: env\Scripts\activate
      pip install -r requirements.txt
   ```

   # Run the Flask application:

   ```bash
   python run.py
   ```
