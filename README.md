# UNWIND
A Flask REST API for the Unwind self-care app. Handles authentication, daily tasks, mood tracking, mindfulness sessions, reminders, and a self-care library. Built with JWT authentication, bcrypt password hashing, and data-based filtering for persistent history(Today/History views).

## Overview
Unwind is a self-care web app that helps users:
    - Track daily self-care tasks
    - Log moods and reflect over time
    - Practice mindfulness a=for self-care habits
    - Access self-care articles and tips
The backend provides:
    - JWT-based authentication with bcrypt password hashing
    - RESTfil API for all features
    - Persistent history with data-based filtering
    - Ready to use with PostgreSQL

## Tech Stack
    - Python
    - Flask
    - Flask-SQLAlxhemy
    - Flask-CORS
    - bcrypt
    - PyJWT
    - python-dotenv
    - gunicorn
    - PostgreSQL

## Project Structure
backend/
    main.py
    requirements.txt
    .env
    Procfile
    .gitignore
    app/
        __init__.py
        auth.py
        tasks.py
        moods.py
        reminders.py
        mindfulness.py
        articles.py
    models/
        __init__.py
        users.py
        task.py
        mood.py
        reminder.py

## Setup & Installation
1. Clone the repository
```text
git clone https://github.com/f4-f0rever-star/Unwind
```

2. Create virtual environment
```text
python3 -m venv venv

source venv/bin/activate
```

3. Install dependencies
```text
pip install -r requirements.txt
```

4. Set up environment variables
Create a .env file in the backend/ folder:
```text
FLASK_APP=main.py
FLASK_ENV=production
SECRET_KEY=your_secret_key
DATABASE_URL=postgresql://postgres.jbftpramgaoiwmmaxblo:0n30fth3girlsJ3nni3@aws-0-eu-west-1.pooler.supabase.com:5432/postgres
CORS_ORIGINS=http://localhost:3000, http://127.0.0.1:3000
```

## Running the Backend
From the backend/ folder:
```text
python3 main.py
```
You should see:
```text
Running on http://127.0.0.1:5000
```
Production(with Gunicorn)
```text
gunicorn app:app
```

# API Endpoints
## Auth
    - POST /api/register - Register new user
    - POST /api/login - login and get token

## Tasks
    - GET /api/tasks?date= - Get tasks for a specific day
    - GET /api/tasks?from= &to= - Get tasks in a range
    - POST api/tasks - Create a task
    - PATCH /api/tasks/<id> - Toogle task done
    - DELETE /api/tasks/<id> - Delete a task

## Moods
    - GET /api/moods?date= - Get moods for a specific day
    - GET /api/moods?from= &to= - Get moods in a range
    - POST /api/moods - log a mood

## Reminders
    - GET /api/reminders - Get all reminders
    - POST /api/reminders - Create a reminder
    - PATCH /api/reminders - Toggle reminder active

## Mindfulness
    - POST /api/mindfulness-sessions - Log a mindfulness session

## Articles
    - GET /api/articles - Get all self-care articles

## All routes are under /api prefix
