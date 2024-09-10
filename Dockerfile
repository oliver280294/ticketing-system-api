# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Build TypeScript files (if applicable)
RUN npm run build

# Expose port 3000 (or whichever port your app runs on)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
