# Project Description Templates

Use these templates when writing project descriptions. Choose the template based on project type.

---

## Language Notes

The site supports **English** and **Polish**. For each project:

1. **Main content** - Write in English (the markdown body)
2. **Polish short description** - Add `descriptionPl` to frontmatter for Polish card descriptions

```yaml
# In frontmatter
description: "English description shown on cards"
descriptionPl: "Polski opis wyświetlany na kartach"
```

The Polish description should be a direct translation of the English description. See [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md) for full details.

---

## Guiding Principles

1. **Story-driven** - Focus on the WHY before the WHAT. The reader should understand the motivation and context before diving into details.
2. **Personal, conversational tone** - Write like you're explaining to a colleague, not a formal report. Use "I", ask rhetorical questions, be honest about limitations.
3. **Connect to real-world value** - Every project should tie back to practical, transferable skills or business applications.
4. **Bold key phrases** - Use **bold** to highlight important concepts and make sections scannable.
5. **Nested bullets for complex points** - When a bullet point has multiple aspects, break it into sub-bullets rather than writing a wall of text.

---

## Template A: Side Projects (`projectType: "side"`)

Use for: Hobby projects, learning experiments, open-source tools, personal problem-solving.

**Structure:** Context → Solution → Real-world Application → Professional Takeaways

```markdown
## Context

[Set the scene. What situation led to this project? What problem were you facing personally? Use a conversational tone - rhetorical questions work well here.]

## Solution

[What you built and how it works. Can include subsections like "Core Features", "How It Worked", "Technical Implementation" etc.]

### Core Features (or similar subsection)
- [Feature/capability 1]
- [Feature/capability 2]
- [Feature/capability 3]

## Real-world Application

[Connect the personal project to broader, transferable skills. How would these same techniques apply in a business context? What patterns are universal?]

## Professional Takeaways

- [Key skill or insight gained - **bold** the main point]
- [Another takeaway - use nested bullets if the point has multiple aspects:]
  - Sub-point 1
  - Sub-point 2
  - Sub-point 3
```

**Example opening (WBC Game Assistant):**
> ## Context
>
> When I briefly returned to play my childhood's favourite computer game, Warlords Battlecry, I realized that the game is actually pretty complicated.
>
> Many races, many units with different abilities, types of damage and resistance - it's just hard to grasp it all. And when you play in multiplayer mode, with other people, it's reasonable to try to at least not be very terrible at playing...

---

## Template B: Enterprise/Corporate Projects (`projectType: "fte"`)

Use for: Automation projects, ETL pipelines, reporting tools, internal apps at companies.

**Structure:** Problem Definition → Solution → Impact → Professional Takeaways

```markdown
## Problem Definition

[Describe the business context and pain point. What was inefficient, broken, or missing? Be specific about the frustrations - crashed Excel, manual copy-paste, days of work, etc.]

## Solution

[What you built. Lead with the high-level approach, then break down into subsections if needed.]

### How It Worked (or "What We Built", etc.)
- [Capability/step 1]
- [Capability/step 2]
- [Capability/step 3]

## Impact

[Quantified outcomes where possible. Time savings, error reduction, cultural shifts. Can be bullet points or prose.]

**Time savings** - [specific improvement]

**[Other impact]** - [description]

## Professional Takeaways

- [Key skill or insight - **bold** the main learning]
- [Another takeaway]
- [Growth/milestone if relevant]
```

**Example opening (Bank Statement Automation):**
> ## Problem Definition
>
> Processes in Accounting and Finance might quite often include a significant amount of manual overhead. Many systems, many files being moved around. And this means that accountants, instead of focusing on core work requiring real domain knowledge, will spend their time on tedious tasks like just copying and pasting data between files and systems.
>
> And my task, processing bank statements, was no different...

---

## Template C: Current/Active Projects (`projectType: "current"`)

Use for: Ongoing projects, products in development, active side ventures.

**Structure:** Same as Side Projects (Context → Solution → Real-world Application → Professional Takeaways)

These follow the side project template since they're typically personal initiatives, but with present-tense framing where appropriate.

---

## Section Header Reference

| Project Type | Sections |
|--------------|----------|
| Side (`side`) | Context → Solution → Real-world Application → Professional Takeaways |
| Corporate (`fte`) | Problem Definition → Solution → Impact → Professional Takeaways |
| Current (`current`) | Context → Solution → Real-world Application → Professional Takeaways |

Optional additional sections that can be inserted:
- **Technical Evolution** - when a project went through significant iterations/phases
- **Reception** - when there's notable feedback from users/community

---

## Styling Guidelines

### Bold usage
- **Bold key phrases** within paragraphs to aid scanning
- Bold the main concept at the start of bullet points
- Don't over-bold - typically 1-2 bolded phrases per paragraph max

### Bullet points
- Use bullets for lists of features, takeaways, or steps
- Use **nested bullets** when a single point has multiple aspects:
  ```markdown
  - This project helped me understand **when Streamlit is a good fit**:
    - The app is data-focused - playing to the library's strength
    - We're not fighting against the framework
    - Minimal session state needed
  ```
- Keep bullet text concise - if it's becoming a paragraph, restructure

### Tone
- Conversational: "So I thought...", "Well, not really...", "The thing is..."
- Rhetorical questions: "But are those discounts actually real?"
- Honest admissions: "...as far as I'm aware it was not permanently adopted 😅"
- Active voice: "I built" not "A solution was developed"

---

## Writing Tips

### For "Context" / "Problem Definition":
- Start with the situation, not the solution
- Make the reader feel the frustration or curiosity
- Rhetorical questions engage the reader

### For "Solution":
- Lead with what it does, not how it's built
- Technical details should serve the narrative
- Use subsections to break up longer descriptions

### For "Real-world Application":
- Connect the specific project to universal patterns
- "The same techniques apply to..." or "In a business setting..."
- Show transferable value

### For "Professional Takeaways":
- Focus on skills gained and insights learned
- Be specific: "First time deploying to Airflow" not "Learned about orchestration"
- It's okay to mention career milestones (first large project, team leadership, etc.)
