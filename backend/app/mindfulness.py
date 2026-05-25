from flask import Blueprint, request, jsonify
from .auth import require_auth

bp = Blueprint("mindfulness", __name__, url_prefix="/api")

@bp.route("/mindfulness-sessions", methods=["POST"])
@require_auth
def mindfulness_session():
    return jsonify({
        "success": True,
        "message": "Session logged!"
    })