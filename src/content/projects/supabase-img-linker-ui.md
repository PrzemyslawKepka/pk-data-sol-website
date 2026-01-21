---
title: "Supabase Image Linker UI"
description: "A modular Panel web application for managing images in any Supabase database table. Features automatic image validation, optimization, and batch processing with a configuration-driven architecture."
categories: ["Developer Tools"]
technologies: ["Python", "Panel", "Supabase", "Pillow", "PostgreSQL"]
github: "https://github.com/PrzemyslawKepka/supabase-img-linker-ui"
image: "/images/projects/supabase-img-linker-ui/supabase-img-linker-ui-cover.png"
featured: false
projectType: "current"
year: "2025"
order: 70
lang: "en"
---

## The Problem

While building CM Rentals, I faced a tedious workflow for managing property images:

- Save images locally from various sources
- Upload each to Supabase Storage via the UI
- Generate signed URLs with expiration dates
- Copy URLs back to the database table

This manual process became increasingly frustrating as the number of properties grew, especially when dealing with expired image URLs from external sources like Facebook.

## The Solution

I built a Panel-based web application that streamlines the entire image management workflow. The tool is designed to be **universal** - it works with any Supabase table through simple configuration changes.

### Key Features

**Image Status Dashboard**
- Displays all records with their image validation status
- Parallel URL checking for fast initial load
- Quick filtering by status (All/OK/Error)

**One-Click Image Updates**
- Upload via file or URL
- Automatic image optimization (smart resizing, JPEG conversion)
- Generates 10-year signed URLs
- Updates database record automatically

**Configuration-Driven Architecture**
- All table and column mappings in a single config file
- No code changes needed to adapt to different use cases
- Supports any entity type: products, users, properties, content

## Technical Architecture

The application follows clean separation of concerns:

```
├── constants/config.py       # Universal configuration
├── services/                 # Business logic layer
│   ├── database_service.py   # Supabase operations
│   ├── data_service.py       # Data management
│   └── image_service.py      # Image processing
├── ui/                       # Presentation layer
│   ├── components.py         # UI widgets
│   ├── callbacks.py          # Event handlers
│   └── styles.py             # CSS styling
└── utils/                    # Utilities
    ├── image_validator.py    # Parallel URL checking
    └── image_optimizer.py    # Smart compression
```

### Performance Optimizations

- **Parallel image checking** with ThreadPoolExecutor
- **In-memory filtering** (no database reload on filter change)
- **Automatic image optimization** (50-80% size reduction)
- **Batch processing** for bulk operations

## Why Panel?

While I'm primarily a Streamlit user, I chose Panel for this project to expand my toolkit. Panel offers:

- More control over layout and styling
- Better handling of complex UI states
- Reactive programming model
- Bootstrap template for professional appearance

## Technical Growth

This project reinforced several important patterns:

- **Configuration-driven design**: Making code reusable through configuration
- **Service layer architecture**: Clean separation between UI and business logic
- **Parallel processing**: Using ThreadPoolExecutor for concurrent operations
- **Image optimization**: Balancing quality and file size
