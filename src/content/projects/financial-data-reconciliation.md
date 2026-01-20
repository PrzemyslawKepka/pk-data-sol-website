---
title: "Financial Data Reconciliation Tool"
description: "Python automation for reconciling financial data across multiple enterprise systems, replacing a tedious Excel-based process prone to crashes and errors."
category: "Automation"
technologies: ["Python", "pandas", "openpyxl", "Excel"]
image: "/images/projects/financial-data-reconciliation/financial-data-reconciliation-cover.png"
featured: false
projectType: "fte"
company: "JLL"
year: "2019-2020"
industry: "Finance"
order: 45
lang: "en"
---

## The Problem

Working in the Financial Systems team at JLL, one of my primary responsibilities was reconciling data between multiple enterprise systems:

- **Planning & Analytics system** (IBM Planning Analytics)
- **Budgeting system** (EPBCS)
- **Financial Consolidation system** (OneStream)

The existing process was painful:
- Opening multiple Excel add-ins simultaneously
- Excel frequently overwhelmed and crashing
- Manual comparison across large datasets
- Time-consuming and error-prone

Data moves between systems, and the goal was to verify that financial numbers matched across all platforms - they often didn't, and finding discrepancies was critical.

## The Solution

I built a Python script to automate the reconciliation process.

### How It Worked

**Data Loading**
- Read data from multiple Excel sheets containing exports from different systems
- Handled different sheet structures and skip rows as needed
- Parsed account codes and entity information

**Comparison Logic**
- Iterated through accounts and entities across both datasets
- Compared amounts with proper rounding (2 decimal places)
- Identified matches and mismatches programmatically

**Output Generation**
- Created a summary Excel file with all discrepancies
- Listed: Account, Entity, Amount in System A, Amount in System B, Difference
- Added visual highlighting to the source file for matched items
- Used random filename suffixes to prevent overwrites

### Technical Details

- **pandas** for data manipulation and comparison
- **openpyxl** for Excel file reading and formatting
- **tkinter** for user-friendly file selection dialog
- Proper handling of account code parsing and entity matching

## The Impact

- **Faster reconciliation**: What took significant manual effort now ran in seconds
- **Reduced errors**: Eliminated human error in large dataset comparisons
- **Clear output**: Discrepancies documented in a structured, shareable format

## Lessons Learned

This project reinforced that automation works best for:
- Repetitive, rule-based processes
- Large dataset comparisons where manual review is impractical
- Tasks where tool limitations (Excel crashing) create bottlenecks

It also showed that even when colleagues don't adopt the scripts themselves, the efficiency gains during my own work justified the development effort.
