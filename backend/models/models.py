from bson import ObjectId
import bcrypt
from models.extensions import mongo
from enums import Status
import logging

class User:
    def __init__(self, username, email, password, status='pending', user_id=None):
        self.username = username
        self.email = email
        self.password = password
        self.status = status
        self.id = user_id

    def save(self):
        db = mongo.db
        logging.info(f'Saving user: {self.username}, {self.email}, {self.status}')
        result = db.users.insert_one({  # Changed 'User' to 'users'
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'status': self.status.value if isinstance(self.status, Status) else self.status,
        })
        self.id = str(result.inserted_id)

    @staticmethod
    def find_by_username(username):
        db = mongo.db
        user_data = db.users.find_one({'username': username})  # Changed 'User' to 'users'
        if user_data:
            return User(
                username=user_data['username'],
                email=user_data['email'],
                password=user_data['password'],
                status=Status(user_data['status']),
                user_id=str(user_data['_id'])
            )
        return None
