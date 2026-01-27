---
title: "Entity Report Automation"
description: "Automated generation of a comprehensive C-level Credit Risk report in PowerPoint format, replacing a semi-manual Excel-based process and significantly reducing the time required from days to hours."
categories: ["Automation"]
technologies: ["Python", "Streamlit", "pandas", "plotly", "python-pptx", "pyodbc", "openpyxl", "SharePoint API"]
image: "/images/projects/entity-report/entity-report-cover.png"
projectType: "fte"
company: "Santander Bank Poland"
year: "2021-2024"
industry: "Credit Risk"
lang: "en"
---

## Problem Definition

"Can you bring this to Excel?"
"Can we have it as PowerPoint slides?"

These words might be like a nightmare in the data world, haunting many people. But sometimes we don't really have an impact on that, for instance due to some formal or regulatory reasons.

However, what we do have an impact on is **how we generate these slides** (or Excel files, but in this case it will be the slides).

So in this project, every month, the Credit Risk department had to produce the "Entity Report" - a comprehensive C-level summary of all risk information for the Polish branch of the bank. Dozens of pages of PowerPoint slides, packed with charts and tables.

And the existing process? Designed by a major consulting company, and it was... painful:
- Multiple Excel sheets aggregating data from different sources
- SQL queries feeding into Excel, which then fed into more Excel
- VBA macros trying to generate the final PowerPoint
- **The entire process took days to complete**

And when something broke (which it did), debugging VBA macros in Excel was not exactly a pleasant experience.

## Solution

So my responsibility **overhaul the entire process** and creating a Python-based solution. The key requirement was simple: at the end, a less technical team member should be able to generate the report themselves, without needing to understand the code.

And the rest? How to implement? Well, it was left for my ~~fantasy~~...expertise I mean, of course.

And what I've built together with my coworkers was:
- **Data layer** connecting to multiple SQL databases and processing Excel files
- **Visualization engine** generating dozens of charts with Plotly, exported as images
- **Report generator** using `python-pptx` to create and manipulate PowerPoint slides, including dynamic slide creation and table generation
- **Streamlit "Control Panel"** - a user-friendly interface guiding users step by step through the process, checking if all data sources are available before proceeding

The interface was crucial - it made the whole thing accessible to non-technical users who just needed to click through the steps.

## Impact

**Time savings** - process reduced from days to hours. What used to be a multi-day ordeal became something you could kick off and have ready within a reasonable timeframe.

**Democratization** - business analysts could now run the process themselves, without depending on someone technical to babysit Excel macros.

And here's the thing that always stuck with me: **the original solution came from a major consulting firm**, probably cost a significant amount, and it was underwhelming. Our internal solution, built by a small team, delivered better results.

## Professional Takeaways

This project was a significant milestone in my development:

- **First large-scale Python application** - somewhere between 10k-20k lines of code, definitely the biggest thing I had built at that point
- **Learned proper modularity** - moved from single-file scripts to actual project structure with modules and packages
- **First real use of classes** - finally applied OOP in a meaningful context
- **Team leadership** - managed interns and junior analysts working on parts of the project

It also taught me that **internal solutions can often beat expensive external ones**, especially when built by people who actually understand the problem and have to live with the result.
