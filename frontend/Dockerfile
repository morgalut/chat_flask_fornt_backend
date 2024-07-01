# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json into the container
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code into the container
COPY frontend/ ./

# Build the app for production
RUN npm run build

# Serve the app using a static file server
RUN npm install -g serve

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the application
CMD ["serve", "-s", "build"]
