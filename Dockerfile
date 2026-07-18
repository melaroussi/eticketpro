# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies needed for compiling native modules if any
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy configuration and application source
COPY . .

# Set environment variables for the build phase
ARG DB_HOST=db
ARG DB_PORT=3306
ARG DB_DATABASE=e_ticket_pro_odb
ARG DB_USER=e_ticket_pro_user
ARG DB_PASSWORD=r00t
ARG APP_SERVER_NAME=http://localhost:8080
ARG API_USER_ENDPOINT=/api

ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_DATABASE=$DB_DATABASE
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD
ENV APP_SERVER_NAME=$APP_SERVER_NAME
ENV API_USER_ENDPOINT=$API_USER_ENDPOINT
ENV NODE_ENV=production

# Build the Next.js app
RUN npm run build

# Stage 2: Runner image
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

# Copy only the minimal standalone files needed
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 8080

CMD ["node", "server.js"]
