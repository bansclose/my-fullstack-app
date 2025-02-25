#!/bin/sh
echo "Running tests and build for backend..."
cd backend && npm run test && cd ..

echo "Building Docker image for backend..."
docker build -t scofieldtt/backend:latest ./backend

echo "Running tests and build for frontend..."
cd frontend && npm run test && cd ..

echo "Building Docker image for frontend..."
docker build -t scofieldtt/frontend:latest ./frontend
