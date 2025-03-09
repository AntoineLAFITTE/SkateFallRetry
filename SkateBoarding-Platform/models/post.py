from models import db  # Import db from models/__init__.py

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)  # Added category field
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    video_url = db.Column(db.String(500), nullable=True)  # Added video_url column

    comments = db.relationship('Comment', backref='post', lazy=True, cascade="all, delete-orphan")
    video = db.relationship('Video', backref='post', uselist=False, cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Post {self.title} - {self.category}>"

    @classmethod
    def create_post(cls, title, content, category, user_id, video_url=None):
        """Creates a new post and saves it to the database."""
        new_post = cls(title=title, content=content, category=category, user_id=user_id, video_url=video_url)
        db.session.add(new_post)
        db.session.commit()
        return new_post

    def update_post(self, title=None, content=None, category=None, video_url=None):
        """Updates the post's title, content, category, or video URL."""
        if title:
            self.title = title
        if content:
            self.content = content
        if category:
            self.category = category
        if video_url:
            self.video_url = video_url
        db.session.commit()

    def delete_post(self):
        """Deletes the post and associated comments and video."""
        if self.video:
            db.session.delete(self.video)  # Delete associated video if exists
        for comment in self.comments:
            db.session.delete(comment)  # Delete associated comments
        db.session.delete(self)
        db.session.commit()
