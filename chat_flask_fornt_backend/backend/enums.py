# backend/enums.py

from enum import Enum

class UserRole(Enum):
    ADMIN = "admin"
    USER = "user"

class Status(Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    PENDING = "pending"
