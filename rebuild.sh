#!/bin/sh

echo "Running tests and building backend..."
cd backend 
npm run test  # Chạy test backend
npm run build # Nếu backend có bước build, cần build trước khi đóng gói Docker
cd ..

echo "Building Docker image for backend..."
docker build -t scofieldtt/my-fullstack-backend:latest ./backend

echo "Running tests and building frontend..."
cd frontend 
npm run test  # Chạy test frontend
npm run build # Build frontend (thường là `npm run build` với React/Vue/Angular)
cd ..

echo "Building Docker image for frontend..."
docker build -t scofieldtt/my-fullstack-frontend:latest ./frontend

echo "Pushing Docker images to registry..."
docker push scofieldtt/my-fullstack-backend:latest
docker push scofieldtt/my-fullstack-frontend:latest

echo "Restarting containers..."
docker-compose down
docker-compose up -d

echo "Deployment completed!"
