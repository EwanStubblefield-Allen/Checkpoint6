# Use an official Node.js runtime as the base image for the client build
FROM --platform=linux/amd64 node:20-slim AS client-builder

# Set the working directory in the client builder container
WORKDIR /app/Checkpoint6.client

# Copy the client-side package.json and package-lock.json to the client builder container
COPY Checkpoint6.client/package*.json ./

# Install client application dependencies
RUN npm install

# Copy the client application source code to the client builder container
COPY Checkpoint6.client ./

# Build the client-side code
RUN npm run build

# Use a smaller base image for the final server image
FROM node:20-slim

# Set the working directory in the server container
WORKDIR /app/Checkpoint6

# Copy the server-side package.json and package-lock.json to the server container
COPY Checkpoint6/package*.json ./

# Install server application dependencies
RUN npm install

# Copy the server application source code to the server container
COPY Checkpoint6 ./

# Copy the built client files from the client builder container to the server's www directory
COPY --from=client-builder /app/Checkpoint6.client/docs /app/server/www

# Expose the port your application runs on (e.g., 3000)
EXPOSE 3000

# Define the command to start your Node.js application
CMD [ "node", "index.js" ]
