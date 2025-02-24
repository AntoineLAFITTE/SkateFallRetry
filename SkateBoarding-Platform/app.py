from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import LoginManager
from config import Config
from models import db  # Import only db, not individual models

app = Flask(__name__)
app.config.from_object(Config)

# Initialize Database and Extensions
db.init_app(app)
migrate = Migrate(app, db)
login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'
CORS(app)

# Import models after initializing db to prevent circular import
from models.user import User
from models.post import Post
from models.comment import Comment
from models.video import Video

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Register Blueprints
from routes.auth import auth_bp
from routes.posts import posts_bp
from routes.comments import comments_bp
from routes.videos import videos_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(posts_bp, url_prefix='/api/posts')
app.register_blueprint(comments_bp, url_prefix='/api/comments')
app.register_blueprint(videos_bp, url_prefix='/api/videos')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Ensure tables are created
    app.run(debug=True)
