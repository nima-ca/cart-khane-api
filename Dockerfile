# Use the official Node.js image as the base image
FROM node:22.12.0-alpine
RUN corepack enable && corepack prepare pnpm@latest --activate

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN pnpm build

# Expose the application port
EXPOSE 5035

# Define the command to run the application
CMD npx typeorm migration:run -d dist/configs/orm.js && node dist/main