---
title: "WBC Game Assistant"
description: "An interactive web application for Warlords Battlecry III players, displaying unit statistics, matchups, and combat effectiveness across 16 different races with 180+ units."
category: "Web Application"
technologies: ["Python", "Streamlit", "pandas", "Pillow", "HTML/CSS"]
github: "https://github.com/PrzemyslawKepka/wbc-game-assistant"
liveUrl: "https://wbc-game-assistant.onrender.com/"
image: "public/images/projects/wbc-game-assistant/wbc-game-assistant.jpg"
featured: false
projectType: "side"
year: "2022"
industry: "Gaming"
order: 40
lang: "en"
---

## The Context

When I started playing Warlords Battlecry III again, I wanted a quick way to understand unit matchups and combat effectiveness. The game features 16 races with over 180 units, each with unique stats, abilities, and damage type resistances.

## The Solution

I built an interactive reference tool that helps players make strategic decisions:

### Core Features

**Race Comparison**
- Select your race and up to 5 enemy races
- View all unit statistics side-by-side
- Quick "reverse matchup" button to swap perspectives

**Unit Analysis**
- Damage types, armor, HP, speed, and special abilities
- Favorable matchups (units you counter)
- Unfavorable matchups (units that counter you)
- Visual indicators using damage type icons

**Smart Filtering**
- Filter by unit type (builders, T1 fliers, dragons, titans)
- Browse all units in tabular format
- Collapsible sections for advanced options

## Technical Implementation

### Architecture

```
├── app.py                    # Main Streamlit application
├── wbc_game_assistant/
│   ├── load_data.py         # Data loading with caching
│   ├── units.py             # Matchup calculations
│   └── mappings.py          # 180+ unit definitions
└── unit_images/             # Unit portraits
```

### Data Flow

```
External JSON (GitHub) → load_data.py (cached) →
User selections → units.py (matchup logic) →
HTML tables → Streamlit rendering
```

### Key Technical Decisions

- **External JSON files** on GitHub for unit data
- **Streamlit caching** to avoid repeated API calls
- **Base64 image encoding** for inline display in HTML tables
- **Pandas operations** for efficient data filtering

### Complex Matchup Logic

The `units.py` module handles sophisticated combat calculations:
- Attack types (ground/air/both)
- Flying unit interactions
- Damage type resistances and vulnerabilities
- Special ability considerations

## Why Streamlit Was Perfect

This project is a textbook Streamlit use case:

- **Data exploration application** with interactive filtering
- **Visual-heavy presentation** with 180+ unit images
- **Minimal state management** (only the "reverse" feature uses session state)
- **Rapid development** - pure Python, no frontend code
- **Trivial deployment** - runs on Streamlit Cloud and Render

## Code Quality

The project demonstrates clean practices:

- **Modular structure** with clear separation of concerns
- **Comprehensive docstrings** for every function
- **Type hints** for better code clarity
- **Reusable functions** like `get_unit_image()` and `filter_units()`

## Personal Note

This is what I consider a "Streamlit state of the art" application - a great utilization of the framework for its intended purpose. It was fast to build, easy to maintain, and serves its purpose perfectly.
