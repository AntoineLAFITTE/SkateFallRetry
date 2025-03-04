from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.comment import Comment, db

comments_bp = Blueprint('comments', __name__)

@comments_bp.route('/create', methods=['POST'])
@jwt_required()
def create_comment():
    """Creates a new comment."""
    try:
        data = request.get_json()

        if not data or 'content' not in data or 'post_id' not in data:
            return jsonify({'error': 'Content and post_id are required'}), 400

        user_id = get_jwt_identity()  # Get user ID from JWT token

        new_comment = Comment.create_comment(
            content=data['content'],
            user_id=user_id,
            post_id=data['post_id']
        )

        return jsonify({
            'message': 'Comment created successfully',
            'comment': {
                'id': new_comment.id,
                'content': new_comment.content,
                'post_id': new_comment.post_id,
                'user_id': new_comment.user_id
            }
        }), 201

    except Exception as e:
        db.session.rollback()  # Ensure transaction rollback on error
        return jsonify({'error': 'Failed to create comment', 'details': str(e)}), 500


@comments_bp.route('/<int:comment_id>', methods=['PUT'])
@jwt_required()
def update_comment(comment_id):
    """Updates a comment."""
    try:
        comment = Comment.query.get_or_404(comment_id)
        user_id = get_jwt_identity()

        if comment.user_id != user_id:
            return jsonify({'error': 'Unauthorized'}), 403

        data = request.get_json()
        if not data or 'content' not in data:
            return jsonify({'error': 'Content is required'}), 400

        comment.update_comment(data['content'])
        return jsonify({'message': 'Comment updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update comment', 'details': str(e)}), 500


@comments_bp.route('/<int:comment_id>', methods=['DELETE'])
@jwt_required()
def delete_comment(comment_id):
    """Deletes a comment."""
    try:
        comment = Comment.query.get_or_404(comment_id)
        user_id = get_jwt_identity()

        if comment.user_id != user_id:
            return jsonify({'error': 'Unauthorized'}), 403

        comment.delete_comment()
        return jsonify({'message': 'Comment deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete comment', 'details': str(e)}), 500


@comments_bp.route('/post/<int:post_id>', methods=['GET'])
def get_comments_by_post(post_id):
    """Retrieve all comments for a given post."""
    try:
        comments = Comment.get_comments_by_post(post_id)
        return jsonify({'comments': [
            {'id': c.id, 'content': c.content, 'post_id': c.post_id, 'user_id': c.user_id}
            for c in comments
        ]}), 200

    except Exception as e:
        return jsonify({'error': 'Failed to retrieve comments', 'details': str(e)}), 500
