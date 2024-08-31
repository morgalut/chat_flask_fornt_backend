import os
from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from auth.auth import auth_bp
from auth.profile import profile_bp
from config import Config
from models.extensions import mongo
from ChatGPT.views import chatgpt_bp
from health_check import NodeJsHealthChecker

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    mongo.init_app(app)
    jwt = JWTManager(app)
    CORS(app, resources={r"/*": {"origins": "*"}})
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(profile_bp, url_prefix='/api')
    app.register_blueprint(chatgpt_bp, url_prefix='/chatgpt')

    @app.route('/health', methods=['GET'])
    def health_check():
        return jsonify({'status': 'healthy'}), 200

    return app

app = create_app()

node_server_command = 'node C:\\Users\\Mor\\Desktop\\CBS\\chat_flask_fornt_backend\\chat_flask_fornt_backend\\project-root\\backend\\app.js'

health_checker = NodeJsHealthChecker(notify_url='http://localhost:5001/notify_alive', check_interval=120, node_server_command=node_server_command)
health_checker.start()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
