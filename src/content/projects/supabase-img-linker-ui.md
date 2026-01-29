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

While building [CM Rentals](http://pk-data-solutions.com/projects/cm-rentals), I kept running into an annoying workflow for managing property images:

1. Save image from some source (Facebook listing, provided file, wherever)
2. Upload to Supabase Storage through their web UI
3. Generate a signed URL (with some expiration date)
4. Copy that URL back to the database record

Repeat this dozens of times. 

And if I decided to skip steps two and three, and just use URLs from external sources like Facebook, then they will expire after some time, making you to do it all over again.

It was tedious enough that I decided to **build a tool to handle it**.

## Solution

I've built a web application that streamlines the entire image management workflow. Shows me all records, tells me which ones have broken images, let me fix them with one click.

### What It Does

- **Dashboard view** - all records with their current image status (working/broken), so your user won't be the first to notice a broken image link
- **Parallel URL checking** - validates all image URLs on load, fast enough to be usable
- **One-click updates** - upload a new image (file or URL), it gets optimized, uploaded to Supabase, signed URL generated, database updated. Done (okay, maybe three clicks minimum, but still way less than going fully manual).
- **Automatic optimization** - images get resized and compressed (50-80% size reduction typical)

### The Configuration-Driven Part

As with many solutions - it was built to solve my pain point, but then I realize I cannot be alone in this. So I built it to be **universal** - works with any Supabase table. All the table names, column mappings, and settings live in a single config file. Switch to a different use case? Just change the config, no code modifications needed.

Future updates: To make it even more accessible, I plan to allow the configuration to be done via UI as well. So no digging in config files - you just fire up the app and work only there.

### Why Panel Instead of Streamlit?

I'm primarily a Streamlit user, but I chose **Panel** for this project to expand my toolkit. Panel gives more control over layout and styling, handles complex UI states better, and has a proper reactive programming model. Good to have another tool in the belt.

## Real-world Application

This is essentially **image asset management** - a common need:
- E-commerce products need photos
- User profiles need avatars
- Content management systems need media
- Property listings need images

The patterns are the same: validation, upload, optimization, URL management. The configuration-driven architecture means this tool can adapt to any of these use cases.

And it's a CRUD app as well - we upload files to a Storage, retrieve data from the database and we run Updates there.

## Professional Takeaways

- **Configuration-driven design** - making tools reusable without code changes
- **Parallel processing** - using ThreadPoolExecutor for concurrent URL validation makes a real difference in UX
- **Image optimization** - finding the right balance between quality and file size
- **Service layer architecture** - clean separation between UI and business logic makes the code much more maintainable
