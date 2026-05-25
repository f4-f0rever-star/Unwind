from datetime import datetime
import bcrypt 
from . import db

class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def password(self, password):
        salt = bcrypt.gensalt()
        self.password_hash = bcrypt.hashpassword(password.encode("utf-8"), salt).decode("utf-8")

    def check_password(self, password):
        return bcrypt.checkpassword(password.encode("utf-8"), self.password_hash.encode("utf-8"))
    
    def to_dict(self):
        return{
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M")
        }