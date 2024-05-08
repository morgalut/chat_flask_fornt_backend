# run.py
from flask_jwt_extended import JWTManager
from flask import Flask
from flask_cors import CORS
from auth import auth_bp
from models import db, User  # Import the User model
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

jwt = JWTManager(app)  # Initialize JWTManageR

# Enable CORS for all routes
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp)

# Initialize database
db.init_app(app)

# Create tables based on the defined models
from models import db
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
