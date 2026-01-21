---
title: "Streamlit Image Editor"
description: "A browser-based meme generator built with Streamlit and Pillow, featuring typography controls, real-time preview, and smart text positioning. Organically gained 3 GitHub stars without any marketing."
categories: ["Web Application"]
technologies: ["Python", "Streamlit", "Pillow", "PIL"]
github: "https://github.com/PrzemyslawKepka/image-editor"
image: "/images/projects/image-editor/image-editor-cover.png"
featured: false
projectType: "side"
year: "2022"
order: 20
lang: "en"
---

## The Motivation

I was using various image editing tools for meme creation and was already a Streamlit fan. So why not build my own simple tool?

## The Solution

A browser-based image editor focused on the classic meme format: top and bottom text overlays with extensive typography controls.

### Key Features

**Dual Text System**
- Top and bottom text with independent configuration
- Real-time preview as you type
- Smart text wrapping based on image dimensions

**Typography Controls**
- 8 professional fonts including Comic Sans (meme essential!)
- Font size customization with validation
- Color picker for any hex color
- Bold, italic, and uppercase options
- Left/center/right alignment

**Smart Text Positioning**
```python
# Dynamic line length based on image and font
line_length = (WIDTH / self.font_size) * 2.2

# Adaptive bottom text positioning
if len(text_wrap) == 1:
    bot_text_height_start = HEIGHT - 10
else:
    bot_text_height_start = HEIGHT - len(text_wrap) * (0.07 * HEIGHT)
```

**One-Click Export**
- In-memory buffer (no server storage)
- PNG format download
- Success confirmation

## Technical Architecture

```
├── app.py                    # Main Streamlit application
├── image_editor/
│   ├── textboxes.py         # TextParams class (OOP)
│   ├── fonts.py             # Cross-platform font management
│   └── multiple_images.py   # Future feature infrastructure
```

### Object-Oriented Design

The `TextParams` class encapsulates all text rendering logic:
- Alignment, font, size, color, styling
- TrueType font loading with variant selection
- Intelligent text wrapping and positioning
- Single class reused for both top and bottom text

### Cross-Platform Font Management

- Automatic Windows/macOS detection
- 4 font variant dictionaries (regular, bold, italic, bold+italic)
- Dynamic font file selection based on styling

## The Organic Discovery

**3 GitHub stars** received without any marketing:
- No LinkedIn promotion
- No Reddit posts
- No Streamlit forum sharing

**How was it found?**

Likely through Google searches for "streamlit meme generator" or "streamlit image editor". This organic discovery proves the project filled a real gap in the Streamlit ecosystem.

## User Experience Design

**Two-Column Layout**
- Left (2/3): Large image preview (800px)
- Right (1/3): Configuration controls in expanders
- Real-time updates on every change

**Smart Defaults**
- 20px font size
- White text color (high contrast)
- Center alignment

**Input Validation**
```python
if not font_size.isnumeric():
    st.error("Please insert a number for a valid font size in px")
```

## Code Quality

- **Black and isort** configured for formatting
- **Type hints** throughout
- **Pinned dependencies** for reproducibility
- **Modular architecture** for extensibility
- **Documentation** with screenshot in README

## Future-Ready

The codebase includes infrastructure for planned features:
- Multi-image combining (horizontal/vertical)
- Image paste functionality
- Code is written but UI integration pending

## Personal Note

This project demonstrates that quality work finds its audience. Without any promotion, people discovered and starred the repository - likely because it solved a real need they were searching for.
