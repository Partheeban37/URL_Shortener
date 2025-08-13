    # frontend/Dockerfile
    # Multi-stage build for a lean production image

    # Stage 1: Build the Next.js application
    FROM node:18-alpine AS builder

    # Set the working directory
    WORKDIR /app

    # Copy package.json and package-lock.json to leverage Docker cache
    COPY package.json ./

    # Install dependencies
    RUN npm install

    # Copy the rest of the application source code
    COPY . .

    # Build the Next.js application
    RUN npm run build

    # Stage 2: Run the application in a lightweight production environment
    FROM node:18-alpine

    # Set the working directory
    WORKDIR /app

    # Copy the build output from the previous stage
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./package.json

    # Expose the port Next.js runs on
    EXPOSE 3000

    # Set the command to start the application
    CMD ["npm", "start"]
    
