# Use a smaller base image for the final server image
FROM --platform=linux/amd64 node:20-slim

# Set the working directory in the builder container
WORKDIR /app

# Copy the package.json and package-lock.json to the builder container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application source code to the builder container
COPY . ./

# Expose the port the application runs on
EXPOSE 3000

# Define the command to start the Node.js application
CMD [ "node", "index.js" ]
