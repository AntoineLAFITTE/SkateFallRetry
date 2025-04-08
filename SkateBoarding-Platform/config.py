import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key_here')

    raw_db_url = os.getenv('DATABASE_URL', f"sqlite:///{os.path.join(BASE_DIR, 'instance', 'skateboarding_platform.db')}")

    # Fix Render's postgres:// to postgresql:// for SQLAlchemy compatibility
    SQLALCHEMY_DATABASE_URI = raw_db_url.replace("postgres://", "postgresql://")

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret_key')
