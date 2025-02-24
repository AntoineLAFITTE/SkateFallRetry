from flask_sqlalchemy import SQLAlchemy

# Create a database instance
db = SQLAlchemy()

from models.user import User
from models.post import Post
from models.comment import Comment
from models.video import Video
