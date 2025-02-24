from flask import Blueprint, request, jsonify
from flask_login import login_required
from models.video import Video, db

videos_bp = Blueprint('videos', __name__)

@videos_bp.route('/', methods=['POST'])
@login_required
def upload_video():
    data = request.json
    video = Video.create_video(
        url=data['url'],
        post_id=data['post_id']
    )
    return jsonify({'message': 'Video uploaded', 'video_id': video.id}), 201

@videos_bp.route('/<int:video_id>', methods=['PUT'])
@login_required
def update_video(video_id):
    video = Video.query.get_or_404(video_id)
    data = request.json
    video.update_video(data['url'])
    return jsonify({'message': 'Video updated'})

@videos_bp.route('/<int:video_id>', methods=['DELETE'])
@login_required
def delete_video(video_id):
    video = Video.query.get_or_404(video_id)
    video.delete_video()
    return jsonify({'message': 'Video deleted'})
