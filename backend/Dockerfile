# backend/Dockerfile
# Use a lightweight Node.js base image for the backend
FROM node:18-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port the Express app listens on
EXPOSE 5000

# Set the command to start the application
CMD ["npm", "start"]
