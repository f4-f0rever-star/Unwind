from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from . import db
from models import Mood
from .auth import require_auth

bp = Blueprint("moods", __name__, url_prefix="/api")

@bp.route("/moods", methods=["GET"])
@require_auth
def get_moods():
    user_id = request.user_id
    date_str = request.args.get("date")
    from_date = request.args.get("from")
    to_date = request.args.get("to")

    query = Mood.query.filter_by(user_id=user_id)

    if date_str:
        try:
            target_date = datetime.strptime(date_str, "%Y-%m-%d").date()
            start = datetime.combine(target_date, datetime.min.time())
            end = start + timedelta(days=1)
            query = query.filter(Mood.created_at >= start, Mood.created_at < end)
        
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400

    entries = query.order_by(Mood.created_at.desc()).all()
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
    entry = Mood(
        user_id=request.user_id, 
        mood=data["mood"], 
        note=data.get("note", "")
    )
    db.session.add(entry)
    db.session.commit()
    return jsonify({
        "id": entry.id,
        "mood": entry.mood,
        "note": entry.note,
        "created_at": entry.created_at.strftime("%Y-%m-%d %H:%M")
    }), 201