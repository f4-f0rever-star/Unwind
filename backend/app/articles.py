from flask import Blueprint, jsonify

bp = Blueprint("articles", __name__, url_prefix="/api")

ARTICLES = [
    {
        "id": 1,
        "title": "5-Minute Breathing Exercise",
        "category": "Mindfulness",
        "content": "Take a slow breath in 4 seconds, hold for 4 seconds, then exhale slowly for 6 seconds. Repeat 5 times."
    },
    {
        "id": 2,
        "title": "Building a Daily Self-Care Routine",
        "category": "Habits",
        "content": "Start with one small habit: drink water, take a 5-minute walk, or write down the days occurrences."
    },
    {
        "id": 3,
        "title": "Managing Stress During Busy Times",
        "category": "Stress",
        "content": "Break big tasks into small chunks. Tale short breaks every 30-45 minutes. Remember: rest is productive."
    },
    {
        "id": 4,
        "title": "Understanding your Mood Patterns",
        "category": "Self-Awareness",
        "content": "Track your mood for a week. Notice patterns: what time do you feel best? What helps you feel better?"
    },
    {
        "id": 5,
        "title": "The Power of Gratitude",
        "category": "Gratitude",
        "content": "Write down 3 things you are grateful for each day. They can be small: tea, a friend, sunshine, alone time."
    },
]

@bp.route("/articles", methods=["GET"])
def get_articles():
    return jsonify(ARTICLES)