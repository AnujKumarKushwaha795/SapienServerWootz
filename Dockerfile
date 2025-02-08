# Use Node.js LTS version
FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Set environment variable
ENV NODE_ENV=production

# Expose the port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ] 