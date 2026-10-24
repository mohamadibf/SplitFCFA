#!/bin/sh
set -e

# Render génère APP_KEY en base64 brut : Laravel attend le préfixe "base64:".
case "$APP_KEY" in
    base64:*) ;;
    *) export APP_KEY="base64:${APP_KEY}" ;;
esac

php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

exec php artisan serve --host=0.0.0.0 --port="${PORT:-10000}" --no-reload
