from flask import Blueprint, request, jsonify
from app import db
from models import Task
from .auth import require_auth

bp= Blueprint("tasks", __name__, url_prefix="/api")

@bp.route("/tasks", methods=["GET"])
@require_auth
def get_tasks():
    tasks = Task.query.filter_by(user_id=request.user_id).order_by(Task.created_at.desc()).all()
    return jsonify([{
        "id": t.id,
        "title": t.title,
        "done": t.done,
        "created_at": t.created_atstrftime("%Y-%m-%d %H:%M")
    } for t in tasks])

@bp.route("/tasks", methods=["POST"])
@require_auth
def create_task():
    data = request.get_json()
    task = Task(user_id=request.user_id, title=data["title"], done=False)
    db.session.add(task)
    db.session.commit()
    return jsonify({
        "id": task.id,
        "title": task.title,
        "done": task.done
    }), 201

@bp.route("/tasks/<int:task_id>", methods=["PATCH"])
@require_auth
def toggle_task(task_id):
    data = request.get_json()
    task = Task.query.get_or_404(task_id)
    if task.user_id != request.user_id:
        return jsonify({"error": "Not authorized"})
    task.done = data.get("done", not task.done)
    db.session.commit()
    return jsonify({"id": task.id, "title": task.title, "done": task.done})

@bp.route("/tasks/<int:task_id>", methods=["DELETE"])
@require_auth
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    if task.user_id != request.user_id:
        return jsonify({"error": "Not authorized"}), 400
    db.session.delete(task)
    db.session.commit()
    return jsonify({"success": True})