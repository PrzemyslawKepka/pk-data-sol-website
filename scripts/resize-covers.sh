#!/bin/bash

# Resize all cover images to 1280x720 (16:9)
# Usage: ./scripts/resize-covers.sh
# Requires: macOS (uses built-in sips command)

IMAGES_DIR="public/images/projects"
WIDTH=1280
HEIGHT=720

echo "Resizing cover images to ${WIDTH}x${HEIGHT}..."

find "$IMAGES_DIR" -type f -name "*-cover.png" | while read img; do
    # Get current dimensions
    current_width=$(sips -g pixelWidth "$img" 2>/dev/null | grep pixelWidth | awk '{print $2}')
    current_height=$(sips -g pixelHeight "$img" 2>/dev/null | grep pixelHeight | awk '{print $2}')

    if [ "$current_width" = "$WIDTH" ] && [ "$current_height" = "$HEIGHT" ]; then
        echo "Skipping (already ${WIDTH}x${HEIGHT}): $img"
        continue
    fi

    echo "Resizing: $img (${current_width}x${current_height} -> ${WIDTH}x${HEIGHT})"
    sips -z $HEIGHT $WIDTH "$img" --out "$img" 2>/dev/null
done

echo "Done!"
