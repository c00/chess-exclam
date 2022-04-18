#! /bin/sh
# exit script when any command ran here returns with non-zero exit code
set -e

echo "Starting nginx..."
nginx -g "daemon off;"