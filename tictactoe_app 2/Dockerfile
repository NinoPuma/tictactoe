# Use the official Node.js runtime as the base image
FROM node:20.12.0 as build
 
# Set the working directory in the container
WORKDIR /app
 
# Copy the entire application code to the container
COPY . .
 
# Install dependencies
RUN npm install
 
# Build the React app for production
RUN npm run build
 
# Use Nginx as the production server
FROM nginx:latest as prod
 
# Set the working directory in the container
WORKDIR /usr/share/nginx/html
 
# Copy the built React app to Nginx's web server directory
COPY --from=build /app/dist .
 
# Expose port 80 for the Nginx server
EXPOSE 80
 
# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]