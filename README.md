# Prompt Library

A web application to catalog and share AI prompts with others.

## Features
- Catalog AI prompts
- Share prompts with others
- User authentication
- REST API (FastAPI)
- PostgreSQL database
- React frontend
- Docker & docker-compose support

## 🚀 Quick Start

### Option 1: Using Makefile (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd prompt-library

# Start the development environment
make dev
```

### Option 2: Using Docker Compose
```bash
# Clone the repository
git clone <repository-url>
cd prompt-library

# Start all services
docker-compose up --build -d
```

## 🌐 Access Points
- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:8001
- **Database:** localhost:5432

## 🛠️ Development Commands

The project includes a comprehensive Makefile for easy development:

```bash
# Show all available commands
make help

# Development
make dev          # Start development environment
make build        # Build all Docker containers
make up           # Start all services
make down         # Stop all services
make restart      # Restart all services

# Logs
make logs         # Show logs for all services
make logs-frontend # Show frontend logs only
make logs-backend  # Show backend logs only
make logs-db       # Show database logs only

# Database
make db-reset     # Reset database (WARNING: deletes all data)

# Cleanup
make clean        # Clean up Docker resources
make clean-all    # Clean up everything including images

# Status
make status       # Show status of all services
```

## 📁 Project Structure
- `backend/` — FastAPI backend
- `frontend/` — React frontend
- `docker-compose.yml` — Orchestration
- `Makefile` — Development commands

## 🛠️ Technology Stack
- **Backend:** Python, FastAPI, SQLAlchemy
- **Frontend:** React, Axios
- **Database:** PostgreSQL
- **Containerization:** Docker & Docker Compose

## 📝 Development Workflow

1. **Start development:**
   ```bash
   make dev
   ```

2. **View logs:**
   ```bash
   make logs
   ```

3. **Stop services:**
   ```bash
   make down
   ```

4. **Reset database:**
   ```bash
   make db-reset
   make dev
   ```

## 🔧 Troubleshooting

- **Port conflicts:** The application uses ports 3001 (frontend) and 8001 (backend)
- **Database issues:** Use `make db-reset` to reset the database
- **Docker issues:** Use `make clean` to clean up Docker resources

## 📄 License
MIT
