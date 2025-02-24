from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models.post import Post, db

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/', methods=['POST'])
@login_required
def create_post():
    data = request.json
    post = Post.create_post(
        title=data['title'],
        content=data['content'],
        user_id=current_user.id
    )
    return jsonify({'message': 'Post created', 'post_id': post.id}), 201

@posts_bp.route('/<int:post_id>', methods=['PUT'])
@login_required
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    data = request.json
    post.update_post(
        title=data.get('title'),
        content=data.get('content')
    )
    return jsonify({'message': 'Post updated'})

@posts_bp.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    post.delete_post()
    return jsonify({'message': 'Post deleted'})
