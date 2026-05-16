# Team Task Manager

A full-stack collaborative task management web application built with Django REST Framework and React.

## Live Demo
- Frontend: (add your Railway URL here)
- Backend API: (add your Railway URL here)

## Features
- User authentication with JWT tokens
- Create and manage projects
- Role-based access (Admin and Member)
- Task management with priorities and due dates
- Kanban board (To Do, In Progress, Done)
- Dashboard with task statistics
- Add/remove project members

## Tech Stack
**Backend**
- Python / Django
- Django REST Framework
- Simple JWT Authentication
- SQLite (development) / PostgreSQL (production)
- WhiteNoise for static files

**Frontend**
- React + Vite
- Tailwind CSS
- Axios
- React Router DOM

## Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- Git

### Backend Setup
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

**Backend `.env`**
SECRET_KEY=your-secret-key
DEBUG=True
FRONTEND_URL=http://localhost:5173

**Frontend `.env`**
VITE_API_URL=http://localhost:8000/api

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register/ | Register new user |
| POST | /api/auth/login/ | Login and get JWT tokens |
| POST | /api/auth/token/refresh/ | Refresh access token |
| GET/POST | /api/projects/ | List / create projects |
| GET/PATCH/DELETE | /api/projects/:id/ | Project detail |
| POST | /api/projects/:id/members/ | Add member |
| DELETE | /api/projects/:id/members/:uid/ | Remove member |
| GET/POST | /api/projects/:id/tasks/ | List / create tasks |
| GET/PATCH/DELETE | /api/tasks/:id/ | Task detail |
| GET | /api/dashboard/ | Dashboard stats |

## Deployment (Railway)

### Backend
1. Create new service in Railway from GitHub repo
2. Set root directory to `backend`
3. Add PostgreSQL plugin
4. Set environment variables:
   - `SECRET_KEY`
   - `DEBUG=False`
   - `FRONTEND_URL=https://your-frontend.railway.app`
5. Add start command: `gunicorn core.wsgi --bind 0.0.0.0:$PORT`

### Frontend
1. Create new service in Railway from same GitHub repo
2. Set root directory to `frontend`
3. Set environment variables:
   - `VITE_API_URL=https://your-backend.railway.app/api`

## Project Structure
team-task-manager/
├── backend/
│   ├── core/          # Django settings and URLs
│   ├── users/         # Authentication
│   ├── projects/      # Project and member management
│   ├── tasks/         # Task management and dashboard
│   └── manage.py
└── frontend/
└── src/
├── api/       # Axios configuration
├── auth/      # Login, Signup, AuthContext
├── components/ # Navbar, Layout, PrivateRoute
├── projects/  # Project list and detail
├── tasks/     # TaskBoard, TaskCard, TaskForm
└── dashboard/ # Dashboard stats

## Author
machagiri-max
