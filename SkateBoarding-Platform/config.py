import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))  # Get absolute path of project

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key_here')
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'instance', 'skateboarding_platform.db')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
