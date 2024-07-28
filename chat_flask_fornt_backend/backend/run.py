# backend/run.py

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from auth.auth import auth_bp
from auth.profile import profile_bp
from models.config import Config
from models.extensions import mongo
from ChatGPT.views import chatgpt_bp  # Import the ChatGPT Blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['UPLOAD_FOLDER'] = Config.UPLOAD_FOLDER

    # Initialize extensions
    mongo.init_app(app)

    # Initialize JWT
    jwt = JWTManager(app)

    # CORS configuration
    CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for testing

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(profile_bp, url_prefix='/api')
    app.register_blueprint(chatgpt_bp, url_prefix='/chatgpt')  # Use '/chatgpt' prefix for clarity

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
