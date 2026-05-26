# Unwind – Self-Care Web App
Unwind is a calm, minimal self-care web application that helps users take care of their mental, emotional, and physical well-being one small step at a time. It combines a Flask backend API with a React (Vite) frontend to provide mood tracking, daily self-care tasks, mindfulness sessions, reminders, and wellness articles.

## Features
Core user features
1. Authentication
  - Register and log in with secure JWT-based authentication
  - Passwords hashed with bcrypt

2. Daily Plan (Tasks)
  - Add simple self-care tasks (e.g., drink water, short walk)
  - Mark tasks as done / not done
  - View Today and History using date filters

3. Mood Journal
  - Log mood with a 1–5 scale (emojis in the frontend)
  -Optional notes to reflect on the day
  - Filter by date for Today and History

4. Mindfulness
  - Guided breathing exercise in the frontend
  - Log mindfulness sessions via the backend

5. Reminders
  - Simple reminders (type, time, frequency, active)
  - Toggle reminders on/off

6. Self-care Library
  - Static wellness articles (breathing, habits, stress, gratitude, mood patterns)

## Tech features
  - Full-stack separation: backend/ (Flask) and frontend/ (React + Vite)
  - Persistent history for tasks and moods (nothing auto-deleted; views are derived with date filters)
  - CORS configured so frontend and backend talk easily
  - Ready for local PostgreSQL and deployable to services like Supabase/Render/Vercel

## Tech Stack
1. Backend
  - Python 3
  - Flask
  - Flask-SQLAlchemy
  - Flask-CORS
  - bcrypt
  - PyJWT
  - python-dotenv
  - PostgreSQL (Supabase)

2. Frontend
  - React (with Vite)
  - JavaScript (ES6+)
  - CSS (custom styling)
  - Fetch API (or Axios if you add it)
  - React Router (optional, if enabled)

## Project Structure (High-Level)
```text
Unwind/
  backend/
    main.py
    requirements.txt
    .env.example
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

  frontend/
    package.json
    vite.config.js
    index.html
    src/
      main.jsx
      App.jsx
      App.css
      # (optional) components/pages/services
```

### Backend – Setup & Run
1. Go to backend folder
```bash
cd backend
```
2. Create virtual environment and install dependencies
```bash
python3 -m venv venv
# Mac/Linux
source venv/bin/activate
# Windows
venv\Scripts\activate
pip install -r requirements.txt
```
3. Environment variables (backend/.env)
Create a .env file in backend/:
```text
FLASK_APP=main.py
FLASK_ENV=development
SECRET_KEY=your-super-secret-key-change-in-production
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/unwind
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
For production with Supabase, replace DATABASE_URL with your Supabase connection string.
```

4. Run backend
```bash
python3 main.py
```
Backend will run at:
  - http://127.0.0.1:5000

# Backend – API Overview
## Auth
  - POST /api/register – create account
  - POST /api/login – get JWT token

## Tasks (Daily Plan)
  - GET /api/tasks?date=YYYY-MM-DD – tasks for a specific day
  - GET /api/tasks?from=YYYY-MM-DD&to=YYYY-MM-DD – tasks in a range
  - POST /api/tasks – create task
  - PATCH /api/tasks/<id> – toggle done
  - DELETE /api/tasks/<id> – delete

## Moods
  - GET /api/moods?date=YYYY-MM-DD – moods for a specific day
  - GET /api/moods?from=YYYY-MM-DD&to=YYYY-MM-DD – moods in a range
  - POST /api/moods – create mood entry

## Reminders
  - GET /api/reminders
  - POST /api/reminders
  - PATCH /api/reminders/<id> – toggle active

## Mindfulness
  - POST /api/mindfulness-sessions – log a session

## Articles
  - GET /api/articles – static self-care articles
All protected routes expect: 
```text
Authorization: Bearer <JWT_TOKEN>
```

#  Frontend – Setup & Run
1. Go to frontend folder
```bash
cd frontend
```
2. Install dependencies
```bash
npm install
```
3. Configure API base URL (if needed)
In src/App.jsx (or src/services/api.js if you’re using one), make sure the API base matches the backend:

```js
const API_BASE = 'http://127.0.0.1:5000'; // or your deployed backend URL
```
4. Run frontend dev server
```bash
npm run dev
```
Frontend will run at:
  - http://localhost:3000

# Frontend – What It Includes
Unwind Frontend
The Unwind Frontend is a modern React-based interface designed to deliver a calm, minimal, and emotionally supportive experience. It connects to the Flask backend API to power mood tracking, tasks, reminders, and self-care articles.

## Frontend features:
  - Mood tracking interface (emoji-based selection + notes)
  - Daily Plan page for self-care tasks (Today vs History)
  - Mindfulness breathing timer UI
  - Reminders management UI
  - Self-care articles list and detail view
  - Authentication screens (login/register)
  - Calm, soft-color UI/UX design
  - API integration with backend services
  - Built with Vite for fast development and hot reload

## Frontend tech stack:
  - React + Vite
  - JavaScript (ES6+)
  - CSS (custom styles in App.css)
  - Fetch API 
    
# Running the Full Stack Together
Start the backend:
```bash
cd backend
source venv/bin/activate   # or venv\Scripts\activate on Windows
python3 main.py
```
Start the frontend (in another terminal):
```bash
cd frontend
npm run dev
```
Open the app in your browser:
  - http://localhost:3000

The frontend will call the backend at http://127.0.0.1:5000 using the configured API_BASE.

