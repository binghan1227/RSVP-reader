#!/bin/bash
# Build script for RSVP-reader extension
# Copies shared source files to extension directory and creates zip

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
BUILD_DIR="$PROJECT_ROOT/build"

echo "Building extension..."

# Copy shared JavaScript files
cp "$PROJECT_ROOT/src/renderer.js" "$PROJECT_ROOT/extension/renderer.js"
cp "$PROJECT_ROOT/src/playback-engine.js" "$PROJECT_ROOT/extension/playback-engine.js"
cp "$PROJECT_ROOT/src/utils.js" "$PROJECT_ROOT/extension/utils.js"
cp "$PROJECT_ROOT/src/controller.js" "$PROJECT_ROOT/extension/controller.js"

# Copy CSS files
cp "$PROJECT_ROOT/src/renderer.css" "$PROJECT_ROOT/extension/renderer.css"
cp "$PROJECT_ROOT/src/styles.css" "$PROJECT_ROOT/extension/styles.css"

echo "Files copied to extension/"

# Create build directory
mkdir -p "$BUILD_DIR"

# Create zip file for Chrome extension
cd "$PROJECT_ROOT/extension"
zip -r "$BUILD_DIR/rsvp-reader-extension.zip" . -x "*.DS_Store"

echo ""
echo "Extension build complete!"
echo "  - Extension folder: extension/"
echo "  - Packaged zip: build/rsvp-reader-extension.zip"
