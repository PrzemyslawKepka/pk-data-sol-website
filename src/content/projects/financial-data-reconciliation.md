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

*"Do the numbers match?"*

That's the fundamental question in data reconciliation. And when you're dealing with **multiple enterprise systems**, getting to the answer can be surprisingly tedious.

In big organizations, data might actually have quite an extensive journey:
- The start would be at an ERP System, where the accounting transactions are made (Oracle PeopleSoft Financial)
- Then there's a separate system for Planning and Analytics (IBM Planning Analytics)
- And another one for Budgeting (ePBCS)
- And there's a system for Financial Consolidation as well (OneStream)

So when the road is so long, a lot can happen among the way. One transaction is missing somehow, and then there's a discrepancy that has to be verified and potentially fixed.

So three systems had to be reconcilied regularly (ERP and Planning and Analytics systems were always matching). And how to do that? Well, the process was rather...challenging:
- These systems could be accessed directly as an app in the browser, but then it would require manual exports
- But all of them had Excel add-ins at the same time, so the numbers could be pull down from there
- So a Profit&Loss Statements (or Balance Sheets) would be retrieved from all the systems
- And then manually going account by account, the numbers would either match, or you find the discrepancy
- At the same time Excel would be constantly crashing because it was overwhelmed by using 3 add-ins at the same time, so trying to run some VBA macros could cause the same

So doing a manual reconciliation, marking rows one by one as either green or red, depending if they're matching or not, does not sound like an efficient (and pleasant) solution.

## Solution

So I've built a Python script (fairly simple one to be honest) to do the comparison automatically.

The script would:
- **Load exports from two systems** (Excel files with specific structures)
- **Compare amounts** for each account and entity combination, with proper rounding
- **Output a clean summary** of all discrepancies - Account, Entity, Amount in System A, Amount in System B, Difference
- **Output an original file with added highlighting as well** - so in standard way, but without the manual work

So the solution at the same time kept the old way, but also introduced a new file, where the discrepancies could be tracked, without the heavy add ins.

## Impact

**Speed** - what used to take significant manual effort now ran in seconds. Load the files, run the script, get your discrepancy list.

**Accuracy** - no more human error from staring at thousands of rows and hoping you didn't miss something.

**Documentation** - discrepancies were automatically logged in a shareable format, not just highlighted cells in a spreadsheet that might get closed without saving.

## Professional Takeaways

- **Automation works best for rule-based, repetitive tasks** - comparing numbers across systems is exactly this
- **Sometimes the tool itself is the bottleneck** - Excel crashing under load was the trigger for finding a better way
- **Personal efficiency matters** - even if colleagues don't adopt your scripts, the time you save in your own work justifies building them (I've created the script at my last months in the company, and even though I've shared it, as far as I'm aware it might have not been adopted widely)
