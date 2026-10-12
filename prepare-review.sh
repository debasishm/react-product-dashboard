#!/usr/bin/env bash

set -euo pipefail

PROJECT_DIR="$(pwd)"
PROJECT_NAME="$(basename "$PROJECT_DIR")"
ZIP_FILE="../${PROJECT_NAME}-code-review.zip"

if [[ ! -f "$PROJECT_DIR/package.json" ]]; then
    echo "Error: package.json not found."
    echo "Please run this script from your project root."
    exit 1
fi

echo "Preparing project for code review..."

zip -r "$ZIP_FILE" . \
    -x "node_modules/*" \
       "*/node_modules/*" \
       "dist/*" \
       "*/dist/*" \
       "build/*" \
       "*/build/*" \
       ".git/*" \
       "*/.git/*" \
       ".idea/*" \
       "*/.idea/*" \
       ".vscode/*" \
       "*/.vscode/*" \
       "coverage/*" \
       "*/coverage/*" \
       ".env" \
       ".env.*" \
       "*/.env" \
       "*/.env.*" \
       "*.log" \
       "*.zip" \
       "prepare-review.sh"

echo
echo "ZIP created successfully:"
echo "$ZIP_FILE"
echo
echo "Please verify that no secrets or private data are included before uploading."
