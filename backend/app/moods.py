from flask import Blueprint, request, jsonify
from app import db
from models import Mood
from .auth import require_auth

bp = Blueprint("moods", __name__, url_prefix="/api")

@bp.route("/moods", methods=["GET"])
@require_auth
def get_moods():
    entries = Mood.query.filter_by(user_id=request.user_id).order_by(Mood.created_at.desc()).all()
    return jsonify([{
        "id": e.id,
        "mood": e.mood,
        "note": e.note,
        "created_at": e.created_at.strftime("%Y-%m-%d %H:%M")
    } for e in entries])

@bp.route("/moods", methods=["POST"])
@require_auth
def create_mood():
    data = request.get_json()
    entry = Mood(user_id=request.user_id, mood=data["mood"], note=data.get("note", ""))
    db.session.add(entry)
    db.session.commit()
    return jsonify({
        "id": entry.id,
        "mood": entry.mood,
        "note": entry.note,
        "created_at": entry.created_at.strftime("%Y-%m-%d %H:%M")
    }), 201