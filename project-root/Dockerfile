# Dockerfile for Node.js Server

# Use the official Node.js image from the Docker Hub
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port the Node.js server will run on
EXPOSE 3000

# Command to run the Node.js server
CMD ["node", "app.js"]
