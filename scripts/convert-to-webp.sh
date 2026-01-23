#!/bin/bash

 # Converts PNG/JPG images to WebP format for web optimization                                                   
# Requires: brew install webp (for macOS)  

# Convert all PNG/JPG images in public/images to WebP
# Usage: ./scripts/convert-to-webp.sh [--force]
#
# Options:
#   --force    Convert all images, even if WebP already exists

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
IMAGES_DIR="$PROJECT_ROOT/public/images"
QUALITY=80
FORCE=false

# Parse arguments
if [ "$1" = "--force" ]; then
    FORCE=true
fi

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "Error: cwebp is not installed."
    echo ""
    echo "Install it with:"
    echo "  macOS:  brew install webp"
    echo "  Ubuntu: sudo apt install webp"
    echo "  Windows: choco install webp"
    exit 1
fi

echo "========================================"
echo "WebP Image Converter"
echo "========================================"
echo "Directory: $IMAGES_DIR"
echo "Quality: $QUALITY"
echo "Force: $FORCE"
echo "========================================"
echo ""

# Counters
converted=0
skipped=0
failed=0

# Find and convert images
find "$IMAGES_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | sort | while read img; do
    output="${img%.*}.webp"
    relative_path="${img#$PROJECT_ROOT/}"

    # Skip if WebP already exists and is newer (unless --force)
    if [ "$FORCE" = false ] && [ -f "$output" ] && [ "$output" -nt "$img" ]; then
        echo "[SKIP] $relative_path (WebP exists and is up to date)"
        ((skipped++)) || true
        continue
    fi

    echo -n "[CONV] $relative_path ... "

    if cwebp -q $QUALITY "$img" -o "$output" 2>/dev/null; then
        # Show size comparison
        orig_size=$(ls -lh "$img" | awk '{print $5}')
        new_size=$(ls -lh "$output" | awk '{print $5}')
        echo "OK ($orig_size -> $new_size)"
        ((converted++)) || true
    else
        echo "FAILED"
        ((failed++)) || true
    fi
done

echo ""
echo "========================================"
echo "Complete!"
echo "========================================"
