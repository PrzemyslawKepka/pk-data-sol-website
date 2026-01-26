---
title: "Supabase Image Linker UI"
description: "A modular Panel web application for managing images in any Supabase database table. Features automatic image validation, optimization, and batch processing with a configuration-driven architecture."
categories: ["Developer Tools"]
technologies: ["Python", "Panel", "Supabase", "Pillow", "PostgreSQL"]
github: "https://github.com/PrzemyslawKepka/supabase-img-linker-ui"
image: "/images/projects/supabase-img-linker-ui/supabase-img-linker-ui-cover.png"
projectType: "current"
year: "2025"
isCommercial: false
lang: "en"
---

## Context

While building CM Rentals, I kept running into an annoying workflow for managing property images:

1. Save image from some source (Facebook listing, provided file, wherever)
2. Upload to Supabase Storage through their web UI
3. Generate a signed URL (with some expiration date)
4. Copy that URL back to the database record

Repeat this dozens of times. And when images from external sources (like Facebook) expire, you get to do it all over again.

It was tedious enough that I decided to **build a tool to handle it**.

## Solution

I've built a web application that streamlines the entire image management workflow. Show me all records, tell me which ones have broken images, let me fix them with one click.

### What It Does

- **Dashboard view** - all records with their current image status (working/broken)
- **Parallel URL checking** - validates all image URLs on load, fast enough to be usable
- **One-click updates** - upload a new image (file or URL), it gets optimized, uploaded to Supabase, signed URL generated, database updated. Done.
- **Automatic optimization** - images get resized and compressed (50-80% size reduction typical)

### The Configuration-Driven Part

I built it to be **universal** - works with any Supabase table. All the table names, column mappings, and settings live in a single config file. Switch to a different use case? Just change the config, no code modifications needed.

### Why Panel Instead of Streamlit?

I'm primarily a Streamlit user, but I chose **Panel** for this project to expand my toolkit. Panel gives more control over layout and styling, handles complex UI states better, and has a proper reactive programming model. Good to have another tool in the belt.

## Real-world Application

This is essentially **image asset management** - a common need:
- E-commerce products need photos
- User profiles need avatars
- Content management systems need media
- Property listings need images

The patterns are the same: validation, upload, optimization, URL management. The configuration-driven architecture means this tool can adapt to any of these use cases.

## Professional Takeaways

- **Configuration-driven design** - making tools reusable without code changes
- **Parallel processing** - using ThreadPoolExecutor for concurrent URL validation makes a real difference in UX
- **Image optimization** - finding the right balance between quality and file size
- **Service layer architecture** - clean separation between UI and business logic makes the code much more maintainable
