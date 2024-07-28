from bson import ObjectId
import bcrypt
from models.extensions import mongo
from enums import Status
import logging
import gridfs

class User:
    def __init__(self, username, email, password, status='pending', profile_picture_id=None, user_id=None):
        self.username = username
        self.email = email
        self.password = password
        self.status = status
        self.profile_picture_id = profile_picture_id
        self.id = user_id

    def save(self):
        db = mongo.db
        logging.info(f'Saving user: {self.username}, {self.email}, {self.status}, {self.profile_picture_id}')
        result = db.User.insert_one({
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'status': self.status.value if isinstance(self.status, Status) else self.status,
            'profile_picture_id': self.profile_picture_id
        })
        self.id = str(result.inserted_id)

    @staticmethod
    def find_by_username(username):
        db = mongo.db
        user_data = db.User.find_one({'username': username})
        if user_data:
            return User(
                username=user_data['username'],
                email=user_data['email'],
                password=user_data['password'],
                status=Status(user_data['status']),
                profile_picture_id=user_data.get('profile_picture_id'),
                user_id=str(user_data['_id'])
            )
        return None
