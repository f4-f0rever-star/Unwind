from flask import Blueprint, request, jsonify
from . import db
from models import Reminder
from .auth import require_auth

bp = Blueprint("reminders", __name__, url_prefix="/api")

@bp.route("/reminders", methods=["GET"])
@require_auth
def get_reminders():
    reminders = Reminder.query.filter_by(user_id=request.user_id).all()
    return jsonify([{
        "id": r.id,
        "type": r.type,
        "time": r.time,
        "frequency": r.frequency,
        "active": r.active
    } for r in reminders])

@bp.route("/reminders", methods=["POST"])
@require_auth
def create_reminder():
    data = request.get_json()
    reminder = Reminder(
        user_id=request.user_id,
        type=data["type"],
        time=data["time"],
        frequency=data.get("frequency", "daily"),
        active=data.get("active", True)
    )
    db.session.add(reminder)
    db.session.commit()
    return jsonify({
        "id": reminder.id,
        "type": reminder.type,
        "time": reminder.time,
        "frequency": reminder.frequency,
        "active": reminder.active
    }), 201

@bp.route("/reminders/<int:reminder_id>", methods=["PATCH"])
@require_auth
def toggle_reminder(reminder_id):
    data = request.get_json()
    reminder = Reminder.query.get_or_404(reminder_id)
    if reminder.user_id != request.user_id:
        return jsonify({"error": "Not authorized"}), 403
    reminder.active = data.get("active", not reminder.active)
    db.session.commit()
    return jsonify({
        "id": reminder.id,
        "type": reminder.type,
        "active": reminder.active
    })