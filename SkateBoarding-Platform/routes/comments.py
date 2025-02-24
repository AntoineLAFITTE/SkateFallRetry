from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models.comment import Comment, db

comments_bp = Blueprint('comments', __name__)

@comments_bp.route('/', methods=['POST'])
@login_required
def create_comment():
    data = request.json
    comment = Comment.create_comment(
        content=data['content'],
        user_id=current_user.id,
        post_id=data['post_id']
    )
    return jsonify({'message': 'Comment created', 'comment_id': comment.id}), 201

@comments_bp.route('/<int:comment_id>', methods=['PUT'])
@login_required
def update_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    if comment.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    data = request.json
    comment.update_comment(data['content'])
    return jsonify({'message': 'Comment updated'})

@comments_bp.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    if comment.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    comment.delete_comment()
    return jsonify({'message': 'Comment deleted'})
