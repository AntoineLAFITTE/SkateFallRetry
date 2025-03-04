from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.video import Video, db
from models.post import Post

videos_bp = Blueprint('videos', __name__)

@videos_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_video():
    """Uploads a video linked to a post."""
    data = request.get_json()

    if not data or not data.get('url') or not data.get('post_id'):
        return jsonify({'error': 'URL and post_id are required'}), 400

    # Ensure the post exists before attaching a video
    post = Post.query.get(data['post_id'])
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    user_id = get_jwt_identity()

    # Ensure that only the post owner can upload a video
    if post.user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    video = Video.create_video(
        url=data['url'],
        post_id=data['post_id']
    )
    return jsonify({'message': 'Video uploaded successfully', 'video_id': video.id}), 201

@videos_bp.route('/<int:video_id>', methods=['PUT'])
@jwt_required()
def update_video(video_id):
    """Updates a video's URL."""
    video = Video.query.get_or_404(video_id)

    # Ensure the associated post exists **before** checking `post.user_id`
    post = Post.query.get(video.post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    user_id = get_jwt_identity()
    if post.user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.get_json()
    new_url = data.get('url')

    if not new_url:
        return jsonify({'error': 'New URL is required'}), 400

    video.update_video(new_url)
    return jsonify({'message': 'Video updated successfully'}), 200

@videos_bp.route('/<int:video_id>', methods=['DELETE'])
@jwt_required()
def delete_video(video_id):
    """Deletes a video."""
    video = Video.query.get_or_404(video_id)

    # Ensure the associated post exists **before** checking `post.user_id`
    post = Post.query.get(video.post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    user_id = get_jwt_identity()
    if post.user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    video.delete_video()
    return jsonify({'message': 'Video deleted successfully'}), 200

@videos_bp.route('/post/<int:post_id>', methods=['GET'])
def get_video_by_post(post_id):
    """Retrieve the video associated with a specific post."""
    video = Video.get_video_by_post(post_id)

    if not video:
        return jsonify({'message': 'No video found for this post'}), 404

    return jsonify({'video_id': video.id, 'url': video.url}), 200
