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
