#!/bin/bash

# This script builds and starts the entire application stack using Docker Compose.
# It ensures all environment variables from your .env file are available.

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- Starting AmberOps Console with Docker Compose ---"

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file not found. Please create one by copying .env.example."
  exit 1
fi

# Build and start all services in detached mode
echo "--- Building images and starting containers... ---"
docker-compose up --build -d

echo ""
echo "✅ All services have been started in detached mode."
echo "You can view logs for a specific service with: docker-compose logs -f [service_name]"
echo "Example: docker-compose logs -f web"
echo ""
echo "To stop all services, run: docker-compose down"
echo "-------------------------------------------------------"
echo "Application URLs:"
echo "  - Landing Page: http://localhost:3001"
echo "  - Dashboard App: http://localhost:3000"
echo "  - Admin App: http://localhost:3003"
echo "-------------------------------------------------------"

