from models import db  # Import db from models/__init__.py
from models.post import Post


class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    def __repr__(self):
        return f"<Video {self.url}>"

    @classmethod
    def create_video(cls, url, post_id):
        """Creates a new video entry and saves it to the database."""
        new_video = cls(url=url, post_id=post_id)
        db.session.add(new_video)
        db.session.commit()
        return new_video

    def update_video(self, url):
        """Updates the video URL."""
        self.url = url
        db.session.commit()

    def delete_video(self):
        """Deletes the video from the database."""
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def get_video_by_post(cls, post_id):
        """Retrieves the video associated with a specific post."""
        return cls.query.filter_by(post_id=post_id).first()
