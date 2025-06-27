# Multi-service Dockerfile for TextAdventure monorepo
# This Dockerfile assumes that the projects have been built locally using: npx nx run-many --target=build --all

# Stage 1: Client API Runtime
FROM node:20-alpine AS client-api

WORKDIR /app

# Copy built application
COPY packages/text-adventure-client-api/dist ./

# Use existing locally installed node_modules if available
RUN if [ -d "./node_modules" ]; then \
      echo "Using existing node_modules"; \
    else \
      echo "Installing dependencies..." && npm install --production --ignore-scripts; \
    fi

EXPOSE 3000
CMD ["node", "main.js"]

# Stage 2: Editor API Runtime  
FROM node:20-alpine AS editor-api

WORKDIR /app

# Copy built application
COPY packages/text-adventure-editor-api/dist ./

# Use existing locally installed node_modules if available
RUN if [ -d "./node_modules" ]; then \
      echo "Using existing node_modules"; \
    else \
      echo "Installing dependencies..." && npm install --production --ignore-scripts; \
    fi

# Set different port for editor API to avoid conflicts
ENV PORT=3001
EXPOSE 3001
CMD ["node", "main.js"]

# Stage 3: Client UI Runtime
FROM nginx:alpine AS client-ui

# Copy built UI files
COPY packages/text-adventure-client-ui/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Stage 4: Editor UI Runtime
FROM nginx:alpine AS editor-ui

# Copy built UI files  
COPY packages/text-adventure-editor-ui/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]