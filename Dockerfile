# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the working directory
COPY . .
# Copy .env.bnk to .env
COPY .env .env

# Build the NestJS application
RUN npm run build

# Expose the port that the NestJS application will run on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "start:prod"]