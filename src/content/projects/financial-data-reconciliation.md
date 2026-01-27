---
title: "Financial Data Reconciliation Tool"
description: "Python automation for reconciling financial data across multiple enterprise systems, replacing a tedious Excel-based process prone to crashes and errors."
categories: ["Automation"]
technologies: ["Python", "pandas", "openpyxl", "Excel"]
image: "/images/projects/financial-data-reconciliation/financial-data-reconciliation-cover.png"
projectType: "fte"
company: "JLL"
year: "2019-2020"
industry: "Finance"
lang: "en"
---

## Problem Definition

Do the numbers match?

That's the fundamental question in data reconciliation. And when you're dealing with **multiple enterprise systems**, getting to the answer can be surprisingly tedious.

Working in the Financial Systems team at JLL, one of my recurring tasks was exactly this - **reconciling data between multiple enterprise systems**:
- Planning & Analytics (IBM Planning Analytics)
- Budgeting (EPBCS)
- Financial Consolidation (OneStream)

Data flows between these systems, and the numbers need to match. When they don't - which happens more often than you'd think - you need to find where the discrepancy is.

The existing process was brutal:
- Opening Excel with multiple add-ins connected to different systems
- Excel constantly crashing because it was overwhelmed
- Manually comparing rows across huge datasets, trying to spot where things don't match
- Slow, tedious, and error-prone

## Solution

So I've built a Python script to do the comparison automatically.

The script would:
- **Load exports from both systems** (Excel files with specific structures)
- **Compare amounts** for each account and entity combination, with proper rounding
- **Output a clean summary** of all discrepancies - Account, Entity, Amount in System A, Amount in System B, Difference

Simple file selection via tkinter so you could just point it at the files you wanted to compare.

The output was a structured Excel file that you could immediately share or use as a starting point for investigation - much better than trying to remember which cells you manually highlighted.

## Impact

**Speed** - what used to take significant manual effort now ran in seconds. Load the files, run the script, get your discrepancy list.

**Accuracy** - no more human error from staring at thousands of rows and hoping you didn't miss something.

**Documentation** - discrepancies were automatically logged in a shareable format, not just highlighted cells in a spreadsheet that might get closed without saving.

## Professional Takeaways

- **Automation works best for rule-based, repetitive tasks** - comparing numbers across systems is exactly this
- **Sometimes the tool itself is the bottleneck** - Excel crashing under load was the trigger for finding a better way
- **Personal efficiency matters** - even if colleagues don't adopt your scripts, the time you save in your own work justifies building them
