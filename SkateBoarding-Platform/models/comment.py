from models import db  # Import db from models/__init__.py
from models.user import User
from models.post import Post


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f"<Comment {self.content[:20]}>"

    @classmethod
    def create_comment(cls, content, user_id, post_id):
        """Creates a new comment and saves it to the database."""
        new_comment = cls(content=content, user_id=user_id, post_id=post_id)
        db.session.add(new_comment)
        db.session.commit()
        return new_comment

    def update_comment(self, content):
        """Updates the content of the comment."""
        self.content = content
        db.session.commit()

    def delete_comment(self):
        """Deletes the comment from the database."""
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def get_comments_by_post(cls, post_id):
        """Retrieves all comments associated with a specific post."""
        return cls.query.filter_by(post_id=post_id).all()
