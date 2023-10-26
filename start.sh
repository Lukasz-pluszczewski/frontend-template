#!/bin/sh

# Create JSON file from environment variables
echo "{
  \"apiUrl\": \"${API_URL}\"
}" > /usr/share/nginx/html/config.json

# Start nginx
exec nginx -g 'daemon off;'
