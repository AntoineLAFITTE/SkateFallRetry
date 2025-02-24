from models import db  # Import db from models/__init__.py

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    comments = db.relationship('Comment', backref='post', lazy=True, cascade="all, delete-orphan")
    video = db.relationship('Video', backref='post', uselist=False, cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Post {self.title}>"

    @classmethod
    def create_post(cls, title, content, user_id):
        """Creates a new post and saves it to the database."""
        new_post = cls(title=title, content=content, user_id=user_id)
        db.session.add(new_post)
        db.session.commit()
        return new_post

    def update_post(self, title=None, content=None):
        """Updates the post's title or content."""
        if title:
            self.title = title
        if content:
            self.content = content
        db.session.commit()

    def delete_post(self):
        """Deletes the post and associated comments and video."""
        if self.video:
            db.session.delete(self.video)  # Delete associated video if exists
        for comment in self.comments:
            db.session.delete(comment)  # Delete associated comments
        db.session.delete(self)
        db.session.commit()
