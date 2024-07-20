# Step 1: Build the application
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Step 2: Run the application
FROM node:18

# Set working directory
WORKDIR /app

# Copy the build artifacts and dependencies from the build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Copy package.json and package-lock.json (or yarn.lock) for production dependencies
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Expose the port on which the app will run
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
