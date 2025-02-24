from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required
from models.user import User, db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Username and password required'}), 400

    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({'error': 'Username already taken'}), 400

    new_user = User.create_user(data['username'], data['password'])
    return jsonify({'message': 'User created', 'user_id': new_user.id}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()

    if user and user.check_password(data['password']):
        login_user(user)
        return jsonify({'message': 'Login successful'})
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'})

@auth_bp.route('/delete/<int:user_id>', methods=['DELETE'])
@login_required
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    user.delete_user()
    return jsonify({'message': 'User deleted successfully'})
