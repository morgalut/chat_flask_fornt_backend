"""
This module initializes and provides access to the PyMongo instance used for database operations.
"""

from flask_pymongo import PyMongo

# Initialize the PyMongo instance for MongoDB interactions
mongo = PyMongo()
