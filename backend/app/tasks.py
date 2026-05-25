from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from . import db
from models import Task
from .auth import require_auth

bp = Blueprint("tasks", __name__, url_prefix="/api")

@bp.route("/tasks", methods=["GET"])
@require_auth
def get_tasks():
    user_id = request.user_id
    date_str = request.args.get("date")
    from_date = request.args.get("from")
    to_date = request.args.get("to")

    query = Task.query.filter_by(user_id=user_id)

    if date_str:
        try:
            target_date = datetime.strptime(date_str, "%Y-%m-%d").date()
            start = datetime.combine(target_date, datetime.min.time())
            end = start + timedelta(days=1)
            query = query.filter(Task.created_at >= start, Task.created_at < end)

        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400
        
    elif from_date and to_date:
        try:
            start = datetime.strptime(from_date, "%Y-%m-%d").date()
            start = datetime.combine(start, datetime.min.time())
            end = datetime.strptime(to_date, "%Y-%m-%d").date()
            end = datetime.combine(end, datetime.max.time())
            query = query.filter(Task.created_at >= start, Task.created_at <= end)
        
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400
        
    tasks = query.order_by(Task.created_at.desc()).all()

    return jsonify([{
        "id": t.id,
        "title": t.title,
        "done": t.done,
        "created_at": t.created_at.strftime("%Y-%m-%d %H:%M")
    } for t in tasks])

@bp.route("/tasks", methods=["POST"])
@require_auth
def create_task():
    data = request.get_json()
    task = Task(
        user_id=request.user_id, 
        title=data["title"], 
        done=False
    )
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
        return jsonify({"error": "Not authorized"}), 403
    task.done = data.get("done", not task.done)
    db.session.commit()
    return jsonify({
        "id": task.id, 
        "title": task.title, 
        "done": task.done
    })

@bp.route("/tasks/<int:task_id>", methods=["DELETE"])
@require_auth
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    if task.user_id != request.user_id:
        return jsonify({"error": "Not authorized"}), 403
    db.session.delete(task)
    db.session.commit()
    return jsonify({"success": True})