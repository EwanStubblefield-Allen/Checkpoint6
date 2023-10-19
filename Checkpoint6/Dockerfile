# Use the node base image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the dotnet project files to the container
COPY . ./

# Restore the .NET dependencies
RUN npm install

# Build the application
# RUN npm run build

# Copy the published output from the build-env to the new container
# COPY --from=build-env /app/out .

# Expose the port your application listens on
EXPOSE 3000

# Set the entry point for the container
ENTRYPOINT ["npm", "start"]