FROM node:20-alpine

WORKDIR /app

# Install dependencies first so this layer is cached unless package files change
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

EXPOSE 5173

# --host 0.0.0.0 makes Vite listen on all interfaces, not just the
# container's internal loopback, so it's reachable from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]