from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.post import Post, db

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/create', methods=['POST'])
@jwt_required()  # Use JWT authentication
def create_post():
    """Creates a new post."""
    data = request.get_json()

    if not data or not data.get('title') or not data.get('content'):
        return jsonify({'error': 'Title and content are required'}), 400

    user_id = get_jwt_identity()  # Get user ID from JWT token

    post = Post.create_post(
        title=data['title'],
        content=data['content'],
        user_id=user_id
    )
    return jsonify({'message': 'Post created successfully', 'post_id': post.id}), 201

@posts_bp.route('/<int:post_id>', methods=['PUT'])
@jwt_required()
def update_post(post_id):
    """Updates a post."""
    post = Post.query.get_or_404(post_id)
    user_id = get_jwt_identity()

    if post.user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    post.update_post(
        title=data.get('title', post.title),  # Default to existing title if not provided
        content=data.get('content', post.content)  # Default to existing content if not provided
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
