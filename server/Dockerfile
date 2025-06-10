# Stage 1: Build the TypeScript project
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source files
COPY tsconfig.json ./
COPY src ./src


# Build the project
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /usr/src/app

# # Copy built files and necessary assets
COPY --from=builder /usr/src/app/dist .
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy .env file
COPY .env .env

EXPOSE 4000

CMD ["node", "server.js"]
# CMD ["/bin/sh"]


# docker build -t test .
# docker run -it -p 4000:4000 test