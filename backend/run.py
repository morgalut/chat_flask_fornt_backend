# run.py
from flask_jwt_extended import JWTManager
from flask import Flask
from flask_cors import CORS
from auth import auth_bp, profile_bp  # Import the profile_bp
from models import db, User
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

jwt = JWTManager(app)

CORS(app)

# Register both auth_bp and profile_bp Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(profile_bp)

db.init_app(app)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True , host ='0.0.0.0', port = 5000)
