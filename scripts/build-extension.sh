#!/bin/bash
# Build script for RSVP-reader extension
# Copies shared source files to extension directory

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Building extension..."

# Copy shared JavaScript files
cp "$PROJECT_ROOT/src/renderer.js" "$PROJECT_ROOT/extension/renderer.js"
cp "$PROJECT_ROOT/src/playback-engine.js" "$PROJECT_ROOT/extension/playback-engine.js"
cp "$PROJECT_ROOT/src/utils.js" "$PROJECT_ROOT/extension/utils.js"

# Copy renderer CSS
cp "$PROJECT_ROOT/src/renderer.css" "$PROJECT_ROOT/extension/renderer.css"

echo "Extension build complete!"
echo "Files copied to extension/:"
echo "  - renderer.js"
echo "  - playback-engine.js"
echo "  - utils.js"
echo "  - renderer.css"
