# Image Guide for PK Data Solutions Website

This guide covers image requirements, optimization, and workflows for the website.

---

## Quick Reference

| Image Type | Aspect Ratio | Standard Size | Format |
|------------|--------------|---------------|--------|
| Project Cover | 16:9 (1.78:1) | 1280 x 720 px | WebP |
| Blog Cover | 16:9 (1.78:1) | 1280 x 720 px | WebP |
| Content Images | Flexible | Max 1600px width | WebP |

---

## 1. Cover Images (Projects & Blog)

Cover images are displayed in cards and at the top of detail pages. They use a **fixed 16:9 aspect ratio** container with `object-fit: cover` and `object-position: top`.

### Requirements

- **Aspect Ratio:** 16:9 (1.78:1)
- **Standard Size:** 1280 x 720 pixels
- **Format:** WebP (PNG/JPG as fallback)
- **File Size Target:** Under 200KB

### How Cropping Works

The CSS uses:
```css
object-fit: cover;      /* Image fills container, may crop */
object-position: top;   /* Anchors from top edge */
```

This means:
- If your image is **taller** than 16:9: bottom will be cropped
- If your image is **wider** than 16:9: sides will be cropped equally
- The **top portion is always preserved**

### Best Practices

1. **Frame important content in the top 60%** of the image
2. **Capture app screenshots in landscape mode** when possible
3. **Avoid important elements at the very edges** - they may be cropped on different screens
4. **Test your image** by viewing it in a 16:9 frame before adding

### Creating Cover Images in GIMP

1. Open your screenshot/image
2. Go to **Image > Canvas Size**
3. Calculate target dimensions:
   - If your image is 1920px wide: height should be 1080px (1920 ÷ 1.78)
   - If your image is 1400px wide: height should be 787px (1400 ÷ 1.78)
4. Set the canvas size and position the image at the **top**
5. Flatten and export

**Quick formula:** `height = width ÷ 1.78` (round to nearest pixel)

---

## 2. Content Images (Inside Articles)

Images embedded within project descriptions or blog posts have more flexibility.

### Requirements

- **Aspect Ratio:** Flexible (use natural dimensions)
- **Maximum Width:** 1600 pixels
- **Format:** WebP preferred
- **File Size Target:** Under 300KB

### Guidelines

| Content Type | Recommended Approach |
|--------------|---------------------|
| Full app screenshots | Keep original aspect ratio, max 1600px wide |
| Code snippets | Crop to relevant section only |
| Diagrams/Charts | Natural dimensions, ensure text is readable |
| UI details | Crop tightly to the relevant area |
| Vertical screenshots (mobile) | Keep original, will display centered |

### Displaying in Markdown

```markdown
<!-- Standard image -->
![Alt text](/images/projects/my-project/screenshot.webp)

<!-- With caption (if supported) -->
![Dashboard showing real-time metrics](/images/projects/my-project/dashboard.webp)
```

---

## 3. File Organization

```
public/
└── images/
    ├── projects/
    │   └── {project-slug}/
    │       ├── {project-slug}-cover.webp    # Cover image (required)
    │       ├── screenshot-1.webp             # Content images
    │       ├── screenshot-2.webp
    │       └── diagram.webp
    └── blog/
        └── {post-slug}/
            ├── {post-slug}-cover.webp       # Cover image (required)
            └── ...                           # Content images
```

### Naming Conventions

- **Cover images:** `{slug}-cover.webp`
- **Content images:** Descriptive names, lowercase, hyphens for spaces
- **Examples:**
  - `cm-rentals-cover.webp`
  - `dashboard-overview.webp`
  - `architecture-diagram.webp`
  - `mobile-view.webp`

---

## 4. Resizing Images

All cover images should be resized to **1280×720** for consistency and optimal file size.

### Why 1280×720?

- Sharp enough for retina displays in cards
- Reasonable quality when opened directly
- Good balance between quality and file size
- Matches standard 720p resolution

### Resize Script (macOS)

Save this as `scripts/resize-covers.sh`:

```bash
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
```

Make it executable:
```bash
chmod +x scripts/resize-covers.sh
```

### Single File Resize

```bash
# Resize single image to 1280x720
sips -z 720 1280 input.png --out input.png

# Check dimensions
sips -g pixelWidth -g pixelHeight input.png
```

### Notes

- The `sips` command is built into macOS (no installation needed)
- Use `-z height width` (height comes first)
- Images smaller than 1280×720 will be upscaled (may lose quality)
- Always resize **before** converting to WebP

---

## 5. WebP Conversion

WebP provides 25-35% smaller file sizes compared to PNG/JPG with similar quality.

### Prerequisites

Install `cwebp` (part of the `webp` package):

```bash
# macOS (Homebrew)
brew install webp

# Ubuntu/Debian
sudo apt install webp

# Windows (Chocolatey)
choco install webp
```

### Conversion Script

Save this as `scripts/convert-to-webp.sh`:

```bash
#!/bin/bash

# Convert all PNG/JPG images in public/images to WebP
# Usage: ./scripts/convert-to-webp.sh

IMAGES_DIR="public/images"
QUALITY=80

echo "Converting images to WebP (quality: $QUALITY)..."

find "$IMAGES_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read img; do
    output="${img%.*}.webp"

    # Skip if WebP already exists and is newer
    if [ -f "$output" ] && [ "$output" -nt "$img" ]; then
        echo "Skipping (up to date): $img"
        continue
    fi

    echo "Converting: $img"
    cwebp -q $QUALITY "$img" -o "$output"

    # Show size comparison
    orig_size=$(ls -lh "$img" | awk '{print $5}')
    new_size=$(ls -lh "$output" | awk '{print $5}')
    echo "  $orig_size -> $new_size"
done

echo "Done!"
```

Make it executable:
```bash
chmod +x scripts/convert-to-webp.sh
```

### Single File Conversion

```bash
# Basic conversion
cwebp -q 80 input.png -o output.webp

# With resize (max 1920px width, maintain aspect ratio)
cwebp -q 80 -resize 1920 0 input.png -o output.webp
```

### Quality Settings

| Use Case | Quality | Command |
|----------|---------|---------|
| Cover images | 80 | `cwebp -q 80` |
| Content images | 80 | `cwebp -q 80` |
| Diagrams/text | 90 | `cwebp -q 90` |
| Photos | 75 | `cwebp -q 75` |

---

## 6. Complete Workflow

### Adding a New Project with Images

1. **Create the project folder:**
   ```bash
   mkdir -p public/images/projects/my-new-project
   ```

2. **Prepare cover image:**
   - Take/create screenshot
   - Crop to 16:9 in GIMP (or your editor)
   - Save as `my-new-project-cover.png`

3. **Add content images (if any):**
   - Resize to max 1600px width
   - Use descriptive names

4. **Resize cover images to standard size:**
   ```bash
   ./scripts/resize-covers.sh
   ```

5. **Convert to WebP:**
   ```bash
   ./scripts/convert-to-webp.sh
   ```

6. **Update project markdown:**
   ```yaml
   ---
   image: "/images/projects/my-new-project/my-new-project-cover.webp"
   ---

   ## Screenshots

   ![Main dashboard](/images/projects/my-new-project/dashboard.webp)
   ```

7. **Verify:**
   - Check the project card displays correctly
   - Check the project detail page
   - Test on mobile (or use browser dev tools)

### Batch Processing All Images

When you have multiple new images to process:

```bash
# Step 1: Resize all covers to 1280x720
./scripts/resize-covers.sh

# Step 2: Convert all PNG/JPG to WebP
./scripts/convert-to-webp.sh
```

---

## 7. Troubleshooting

### Image appears cropped incorrectly

- **Cause:** Image aspect ratio differs significantly from 16:9
- **Fix:** Re-crop the image to exactly 16:9, placing important content in top portion

### Image looks blurry

- **Cause:** Source image too small
- **Fix:** Use higher resolution source (minimum 1280x720 for covers)

### WebP not displaying

- **Cause:** Browser doesn't support WebP (rare, old browsers)
- **Fix:** Keep PNG/JPG as fallback, or use `<picture>` element

### Large file sizes

- **Cause:** High resolution or unoptimized images
- **Fix:**
  - Resize to recommended dimensions
  - Use WebP format
  - Reduce quality to 75-80

---

## 8. Tools Reference

| Tool | Purpose | Install |
|------|---------|---------|
| GIMP | Image editing, cropping | [gimp.org](https://gimp.org) |
| cwebp | WebP conversion | `brew install webp` |
| sips | macOS image info/resize | Built-in on macOS |
| ImageMagick | Batch processing | `brew install imagemagick` |

### Useful Commands

```bash
# Check image dimensions (macOS)
sips -g pixelWidth -g pixelHeight image.png

# Batch check all project images
find public/images/projects -name "*-cover.*" -exec sips -g pixelWidth -g pixelHeight {} \;

# Calculate if image is 16:9
# width / height should equal ~1.78
```

---

## Summary

1. **Cover images:** Always 16:9, standard size 1280×720
2. **Content images:** Flexible ratio, max 1600px wide
3. **Resize first**, then **convert to WebP** before committing
4. **Use the naming convention:** `{slug}-cover.webp` for covers
5. **Test on mobile** to verify cropping looks good

### Quick Commands

```bash
# Resize all covers to 1280x720
./scripts/resize-covers.sh

# Convert all images to WebP
./scripts/convert-to-webp.sh
```
