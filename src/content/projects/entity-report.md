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

## The Challenge

The Entity Report was a monthly C-level summary of all Credit Risk information for the Polish branch of the bank - a comprehensive document spanning dozens of pages in PowerPoint format.

The existing process, designed by a major consulting company, was Excel-based:
- Multiple Excel sheets aggregating data from different sources
- SQL queries and Excel files feeding into the process
- VBA macros generating the final PowerPoint
- **The entire process took days to complete**

## The Solution

I was tasked with overhauling the entire process and creating a Python-based solution. The requirements were simple: a less technical team member should be able to generate the report themselves.

### Technical Architecture

The solution consisted of several interconnected components:

1. **Data Layer**
   - Connections to multiple SQL databases via `pyodbc`
   - Excel file processing with `openpyxl` and `pandas`
   - SharePoint integration for pre-ready slides

2. **Visualization Engine**
   - Dozens of charts generated with `plotly`
   - Charts exported as images for PowerPoint integration

3. **Report Generation**
   - `python-pptx` for creating and manipulating PowerPoint slides
   - Dynamic slide creation, merging, and content insertion
   - Native table creation within PowerPoint

4. **Control Interface**
   - Streamlit-based UI (internally called "Control Panel")
   - Step-by-step workflow guiding users through the process
   - Source availability checking before processing

## Impact

- **Time savings**: Process reduced from days to hours
- **Higher automation level**: Most steps now automated
- **User-friendly interface**: Non-technical users can run the process
- **Maintainability**: Modular code structure for easy updates

## Technical Growth

This project was a significant milestone in my development:

- **First large-scale Python application** (10k-20k lines of code)
- **Learned modularity**: Moved from single-file scripts to proper project structure
- **First use of classes** in a real project context
- **Led a team**: Managed interns and junior analysts

## Key Takeaway

This project demonstrated the value of automation in enterprise settings. The original solution from a major consulting firm was expensive and underwhelming - our internal solution delivered better results at a fraction of the cost.
