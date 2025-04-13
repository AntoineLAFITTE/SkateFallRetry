from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models import db  # SQLAlchemy instance

app = Flask(__name__)
app.config.from_object(Config)

# Initialize JWT (after app configuration)
jwt = JWTManager(app)

# Initialize Database and Extensions
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

# Import models after initializing db to prevent circular import
from models.user import User
from models.post import Post
from models.comment import Comment
from models.video import Video

# Register Blueprints
from routes.auth import auth_bp
from routes.posts import posts_bp
from routes.comments import comments_bp
from routes.videos import videos_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(posts_bp, url_prefix='/api/posts')
app.register_blueprint(comments_bp, url_prefix='/api/comments')
app.register_blueprint(videos_bp, url_prefix='/api/videos')

#  Ping route for health check
@app.route("/ping")
def ping():
    return "pong"

#  THIS MUST COME AFTER THE APP IS FULLY SET UP
#@app.before_first_request
#def apply_migrations_once():
#    try:
#        from flask_migrate import upgrade
#        upgrade()
#        print(" Migrations applied")
#    except Exception as e:
#        print(f" Migration failed: {e}")


if __name__ == "__main__":
    from flask_migrate import upgrade

    with app.app_context():
        try:
            upgrade()
            print("Migrations applied")
        except Exception as e:
            print(f" Migration failed: {e}")

    app.run(debug=True, host="0.0.0.0", port=8000)
