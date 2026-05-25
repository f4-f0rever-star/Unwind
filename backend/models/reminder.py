from app import db

class Reminder(db.Model):
    __tablename__ = "reminder"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(10), nullable=False)
    frequency = db.Column(db.String(20), default="daily")
    active = db.Column(db.Boolean, default=True)