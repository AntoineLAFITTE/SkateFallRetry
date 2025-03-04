from models import db  # Import db from models/__init__.py
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(150), nullable=False)

    # Use string references instead of direct imports
    posts = db.relationship('Post', backref='author', lazy=True, cascade="all, delete-orphan")
    comments = db.relationship('Comment', backref='commenter', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User {self.username}>"

    def set_password(self, password):
        """Hashes the password and stores it."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Checks if the given password matches the stored hash."""
        return check_password_hash(self.password_hash, password)

    @classmethod
    def create_user(cls, username, password):
        """Creates a new user and saves it to the database."""
        new_user = cls(username=username)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    def update_username(self, new_username):
        """Updates the username."""
        self.username = new_username
        db.session.commit()

    def delete_user(self):
        """Deletes the user along with their posts and comments."""
        for post in self.posts:
            post.delete_post()
        for comment in self.comments:
            db.session.delete(comment)
        db.session.delete(self)
        db.session.commit()
