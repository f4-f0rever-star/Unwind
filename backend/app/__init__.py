from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
        'DATABASE_URL',
        'postgresql://postgres:postgres@localhost:5432/unwind'
    )

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    app.config['SECRET_KEY'] = os.getenv(
        'SECRET_KEY',
        'dev-secret-key-change-in-production'
    )

    db.init_app(app)

    CORS(
        app,
        origins=os.getenv(
            'CORS_ORIGINS',
            'http://localhost:3000'
        ).split(',')
    )

    from . import auth
    from . import tasks
    from . import moods
    from . import reminders
    from . import mindfulness
    from . import articles

    app.register_blueprint(auth.bp)
    app.register_blueprint(tasks.bp)
    app.register_blueprint(moods.bp)
    app.register_blueprint(reminders.bp)
    app.register_blueprint(mindfulness.bp)
    app.register_blueprint(articles.bp)

    with app.app_context():
        db.create_all()

    return app