"""
This module defines the User model for interacting with the database.

It provides functionality to save user data and retrieve user details by username.
"""

import logging  # Standard library import should come first

from enums import Status  # Third-party and project-specific imports
from models.extensions import mongo


class User:
    """
    A class used to represent a User in the application.

    Attributes:
    ----------
    username : str
        The username of the user.
    email : str
        The email address of the user.
    password : str
        The hashed password of the user.
    status : Status or str
        The current status of the user, e.g., 'pending'.
    id : str, optional
        The unique identifier of the user in the database.
    """

    def __init__(self, username, email, password, status='pending', user_id=None):
        """
        Initializes a User instance with the given details.

        Parameters:
        ----------
        username : str
            The username of the user.
        email : str
            The email address of the user.
        password : str
            The password of the user.
        status : Status or str, optional
            The current status of the user (default is 'pending').
        user_id : str, optional
            The unique identifier of the user in the database (default is None).
        """
        self.username = username
        self.email = email
        self.password = password
        self.status = status
        self.id = user_id

    def save(self):
        """
        Saves the user instance to the database.

        Inserts a new user record into the database and assigns the generated ID to the user instance.
        """
        db = mongo.db
        logging.info('Saving user: %s, %s, %s', self.username, self.email, self.status)
        result = db.users.insert_one({
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'status': self.status.value if isinstance(self.status, Status) else self.status,
        })
        self.id = str(result.inserted_id)

    @staticmethod
    def find_by_username(username):
        """
        Finds a user by their username.

        Parameters:
        ----------
        username : str
            The username to search for.

        Returns:
        -------
        User or None
            Returns a User instance if found; otherwise, None.
        """
        db = mongo.db
        user_data = db.users.find_one({'username': username})
        if user_data:
            return User(
                username=user_data['username'],
                email=user_data['email'],
                password=user_data['password'],
                status=Status(user_data['status']),
                user_id=str(user_data['_id'])
            )
        return None
