from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import bcrypt
import jwt
from . import db
from app.models import User

bp = Blueprint("auth", __name__, url_prefix="api")

def require_auth(f):
    from functools import wraps
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        token = auth_header.replace("Bearer", "") if auth_header.startswith("Bearer") else auth_header

        if not token:
            return jsonify({"error": "Token required"}), 401
        
        try:
            data = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            request.user_id = data["user_id"]
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        
        return f(*args, **kwargs)
    return decorated

from flask import current_app

@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400
    
    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400
    
    existing = User.query.filter_by(username=username).first()
    if existing:
        return jsonify({"error": "Username already exists"}), 400
    
    user = User(username=username, email=email)
    user.password(password)
    db.session.add(user)
    db.session.commit()

    token = jwt.encode(
        {
            "user_id": user.id,
            "username": user.username,
            "exp": datetime.utcnow() + timedelta(days=7)
        },
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({
        "userId": user.id,
        "username": user.username,
        "email": user.email,
        "token": token
    }), 201

@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 401
    
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401
    
    if not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 402
    
    token = jwt.encode(
        {
            "user_id": user.id,
            "username": user.username,
            "exp": datetime.utcnow() + timedelta(days=7)
        },
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({
        "userId": user.id,
        "username": user.username,
        "email": user.email,
        "token": token
    })