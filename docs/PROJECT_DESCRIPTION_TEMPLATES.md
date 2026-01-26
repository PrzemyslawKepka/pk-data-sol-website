# Project Description Templates

Use these templates when writing/polishing project descriptions. Choose the template based on project type.

## Guiding Principles

1. **Universal framing** - Describe problems anyone in the industry would recognize
2. **Outcome-focused** - Lead with what was achieved, not how
3. **Concise** - 3-5 sentences per section max
4. **No jargon deep-dives** - Technical details only where they add value
5. **Problem-first** - The reader should immediately understand *why* this project matters

---

## Template A: Enterprise/Corporate Projects (`projectType: "fte"`)

Use for: Automation projects, ETL pipelines, reporting tools, internal apps at companies.

```markdown
## The Problem

[1-2 sentences: Universal business pain point - what was inefficient, broken, or missing?]
[1-2 sentences: Concrete impact - time wasted, errors, bottlenecks, costs]

## The Solution

[1-2 sentences: High-level description of what you built]

### Key Capabilities
- [Capability 1 - what it does, not how]
- [Capability 2]
- [Capability 3]

## Impact

- **[Metric 1]**: [Quantified outcome - time saved, error reduction, etc.]
- **[Metric 2]**: [Business outcome - adoption, cost savings, etc.]
- **[Metric 3]**: [Optional - career/cultural impact]

## Technical Highlights

[2-3 bullet points of notable technical decisions or challenges overcome - only if genuinely interesting]

## Personal Note

[1-2 sentences: Why this project mattered to you personally or what it taught you]
```

**Example opening (Entity Report):**
> ## The Problem
>
> Executive-level financial reports often require aggregating data from multiple systems into polished presentations - a process that typically involves days of manual Excel work and is prone to human error. At Santander, the monthly Credit Risk report for C-level executives followed exactly this pattern: multiple data sources, complex transformations, and a VBA-powered Excel process that took days to complete.

---

## Template B: Side Projects / Personal Learning (`projectType: "side"`)

Use for: Hobby projects, learning experiments, open-source tools, personal problem-solving.

```markdown
## The Motivation

[1-2 sentences: What sparked the idea? Personal need, curiosity, or learning goal]

## The Solution

[1-2 sentences: What you built and what it does]

### Features
- [Feature 1]
- [Feature 2]
- [Feature 3]

## Key Insights

[2-4 bullet points: What you discovered, learned, or proved through this project]

## Personal Note

[1-2 sentences: Reflection on the project's significance to your growth or its reception]
```

**Example opening (Electronics Web Scraping):**
> ## The Motivation
>
> Are Black Friday discounts real, or just marketing illusion? Rather than trust retailer claims, I decided to collect months of pricing data and find out empirically.

---

## Template C: Current/Active Projects (`projectType: "current"`)

Use for: Ongoing projects, products in development, active side ventures.

```markdown
## The Problem

[1-2 sentences: Market gap or personal pain point being addressed]

## The Solution

[1-2 sentences: What you're building]

### Current Features
- [Feature 1]
- [Feature 2]
- [Feature 3]

## Technical Approach

[Brief description of architecture decisions and why - 2-3 sentences or bullets]

## Status & Learnings

[Where the project stands and what you've learned so far]
```

---

## Template D: Web Applications (Public-Facing)

Use for: CM Rentals, portfolio site, tools with live URLs.

```markdown
## The Problem

[1-2 sentences: Gap in existing solutions or unmet need]

## The Solution

[What you built and who it serves]

### Key Features
- [User-facing feature 1]
- [User-facing feature 2]
- [User-facing feature 3]

## Technical Decisions

[2-3 key architectural choices and their rationale]

## Reception & Lessons

[User feedback, metrics, or key learnings from building/launching]
```

---

## Section Header Reference

For consistency, use these exact headers:

| Purpose | Header |
|---------|--------|
| Why the project exists | `## The Problem` (enterprise/current) or `## The Motivation` (side) |
| What was built | `## The Solution` |
| Quantified outcomes | `## Impact` |
| Technical details | `## Technical Highlights` or `## Technical Approach` |
| Learnings | `## Key Insights` or `## Lessons Learned` |
| Personal reflection | `## Personal Note` |

---

## Writing Tips

### For "The Problem" section:
- Start with the universal pain, not your specific situation
- Bad: "At Company X, we had a spreadsheet that..."
- Good: "Financial reconciliation across enterprise systems typically requires..."

### For "The Solution" section:
- Lead with *what*, not *how*
- Save implementation details for Technical section
- Focus on capabilities, not code

### For "Impact" section:
- Quantify wherever possible (%, hours, users)
- Include business outcomes, not just technical metrics
- Career impact is valid (promotions, new responsibilities)

### For "Personal Note":
- Keep it brief (1-2 sentences)
- Connect to your broader journey or values
- Optional - skip if it would feel forced
