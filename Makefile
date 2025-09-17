# Prompt Library - Development Makefile
# This Makefile provides convenient commands for managing the Prompt Library project

.PHONY: help build up down restart logs clean install dev test

# Default target
help: ## Show this help message
	@echo "Prompt Library - Available Commands:"
	@echo "====================================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Docker Commands
build: ## Build all Docker containers
	docker-compose build

up: ## Start all services in detached mode
	docker-compose up -d

down: ## Stop and remove all containers
	docker-compose down

restart: ## Restart all services
	docker-compose restart

logs: ## Show logs for all services
	docker-compose logs -f

logs-frontend: ## Show logs for frontend service only
	docker-compose logs -f frontend

logs-backend: ## Show logs for backend service only
	docker-compose logs -f backend

logs-db: ## Show logs for database service only
	docker-compose logs -f db

# Development Commands
dev: ## Start development environment (build + up)
	@echo "Building and starting Prompt Library..."
	docker-compose up --build -d
	@echo ""
	@echo "🚀 Services are starting up!"
	@echo "📱 Frontend: http://localhost:3001"
	@echo "🔧 Backend:  http://localhost:8001"
	@echo "🗄️  Database: localhost:5432"
	@echo ""
	@echo "Use 'make logs' to see service logs"
	@echo "Use 'make down' to stop all services"

install: ## Install dependencies (for local development)
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "Installing backend dependencies..."
	cd backend && pip install -r requirements.txt

# Database Commands
db-reset: ## Reset the database (WARNING: This will delete all data)
	docker-compose down -v
	docker-compose up -d db
	@echo "Database reset complete. Run 'make dev' to start all services."

# Cleanup Commands
clean: ## Clean up Docker resources
	docker-compose down -v
	docker system prune -f
	@echo "Cleaned up Docker resources"

clean-all: ## Clean up everything including images
	docker-compose down -v
	docker system prune -af
	@echo "Cleaned up all Docker resources including images"

# Status Commands
status: ## Show status of all services
	docker-compose ps

# Quick Commands
start: dev ## Alias for dev command
stop: down ## Alias for down command

# Production Commands
prod: ## Start in production mode
	docker-compose -f docker-compose.yml up --build -d
	@echo "Production services started!"
	@echo "📱 Frontend: http://localhost:3001"
	@echo "🔧 Backend:  http://localhost:8001"
