# Stage 1: Build frontend assets
FROM node:20-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: PHP application
FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
  git \
  curl \
  unzip \
  libsqlite3-dev \
  && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_sqlite pcntl bcmath

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy composer files and install dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction

# Copy application code
COPY . .

# Copy built frontend assets from stage 1
COPY --from=frontend /app/public/build public/build

# Run post-install scripts
RUN composer dump-autoload --optimize

# Create SQLite database directory and file
RUN mkdir -p /data && touch /data/database.sqlite

# Set permissions
RUN chmod -R 775 storage bootstrap/cache

# Create startup script
RUN cat > /app/start.sh << 'EOF'
#!/bin/bash
set -e

# Link SQLite database from persistent volume
ln -sf /data/database.sqlite /app/database/database.sqlite

# Generate key if not set
if [ -z "$APP_KEY" ]; then
php artisan key:generate --force
fi

# Run migrations
php artisan migrate --force

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start the server
php artisan serve --host=0.0.0.0 --port=${PORT:-8080}
EOF
RUN chmod +x /app/start.sh

EXPOSE 8080

CMD ["/app/start.sh"]
