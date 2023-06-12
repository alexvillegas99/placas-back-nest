# Use a base image with Node.js
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port on which your Nest.js application listens
EXPOSE 8083

# Specify the command to start your application
CMD ["npm", "run", "start:prod"]
