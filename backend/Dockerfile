# Dockerfile for Flask Backend

# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set environment variables
ENV FLASK_APP=run.py
ENV FLASK_ENV=production

# Create and set the working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code to the container
COPY . .

# Expose the port Flask will run on
EXPOSE 5000

# Command to run the Flask application
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
