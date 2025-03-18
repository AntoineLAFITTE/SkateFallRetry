from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.post import Post, db
from models.user import User

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/create', methods=['POST'])
@jwt_required()
def create_post():
    """Creates a new post with optional video_url."""
    data = request.get_json()

    if not data or not data.get('title') or not data.get('content') or not data.get('category'):
        return jsonify({'error': 'Title, content, and category are required'}), 400

    user_id = get_jwt_identity()

    post = Post.create_post(
        title=data['title'],
        content=data['content'],
        category=data['category'],
        user_id=user_id,
        video_url=data.get('video_url')  # Optional
    )
    return jsonify({'message': 'Post created successfully', 'post_id': post.id}), 201

@posts_bp.route('/<int:post_id>', methods=['PUT'])
@jwt_required()
def update_post(post_id):
    """Updates a post, including video_url."""
    post = Post.query.get_or_404(post_id)
    user_id = get_jwt_identity()

    if post.user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    post.update_post(
        title=data.get('title', post.title),
        content=data.get('content', post.content),
        category=data.get('category', post.category),
        video_url=data.get('video_url', post.video_url)  # Update or keep existing
    )
    return jsonify({'message': 'Post updated successfully'}), 200

@posts_bp.route('/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    """Deletes a post."""
    post = Post.query.get_or_404(post_id)
    user_id = get_jwt_identity()

    if post.user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    post.delete_post()
    return jsonify({'message': 'Post deleted successfully'}), 200

@posts_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_posts():
    """Retrieve all posts, including video_url."""
    posts = Post.query.all()
    posts_data = [{
        "id": post.id,
        "title": post.title,
        "content": post.content,
        "category": post.category,
        "user_id": post.user_id,
        "video_url": post.video_url  # Include video_url
    } for post in posts]

    return jsonify(posts_data), 200

@posts_bp.route('/<int:post_id>', methods=['GET'])
@jwt_required()
def get_post_by_id(post_id):
    """Retrieve a single post, including video_url and comments."""
    post = Post.query.get_or_404(post_id)

    post_data = {
        "id": post.id,
        "title": post.title,
        "content": post.content,
        "category": post.category,
        "user_id": post.user_id,
        "video_url": post.video_url,  # Include video_url
        "comments": [
            {
                "user": User.query.get(comment.user_id).username,
                "text": comment.content
            }
            for comment in post.comments
        ]
    }

    return jsonify(post_data), 200

@posts_bp.route('/my-posts', methods=['GET'])
@jwt_required()
def get_user_posts():
    """Retrieve all posts created by the logged-in user."""
    user_id = get_jwt_identity()  # Get the logged-in user ID

    user_posts = Post.query.filter_by(user_id=user_id).all()

    if not user_posts:
        return jsonify({"message": "You haven't created any posts yet."}), 404

    posts_data = [{
        "id": post.id,
        "title": post.title,
        "content": post.content,
        "category": post.category,
        "user_id": post.user_id,
        "video_url": post.video_url  # Include video_url if present
    } for post in user_posts]

    return jsonify(posts_data), 200
