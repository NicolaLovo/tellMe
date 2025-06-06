# Stage 1: Build the Vue app
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine3.17

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy build output to Nginx's public directory
COPY --from=builder /usr/src/app/dist .

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose default port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]


# docker build -t test .
# docker run -it -p 80:80 test