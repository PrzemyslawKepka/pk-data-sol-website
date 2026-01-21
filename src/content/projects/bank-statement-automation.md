---
title: "Bank Statement Processing Automation"
description: "Python automation that transformed manual bank statement processing from hours of copy-paste work to minutes of automated document generation, saving up to 95% of work time."
categories: ["Automation"]
technologies: ["Python", "CSV", "Excel", "NetSuite"]
image: "/images/projects/bank-statement-automation/bank-statement-automation-cover.png"
projectType: "fte"
company: "Ascensia Diabetes Care"
year: "2018"
industry: "Accounting"
lang: "en"
---

## The Problem

As an accounting assistant at a global pharmaceutical company's Shared Service Center, I was tasked with processing bank statements - a highly manual process that involved:

- Going through PDF bank statements (sometimes dozens of pages)
- Manually copying transaction data
- Creating accounting documents (journal entries) in Excel
- Uploading the final CSV to the NetSuite ERP system

For statements with hundreds of transactions, this meant hours of literal copy-paste work. The process was entirely rule-based: incoming payments mapped to specific debit/credit accounts, outgoing payments to others, with only occasional exceptions.

## The Solution

I decided this had to be automated. Despite having no formal programming background, I taught myself Python to build a solution.

### How It Worked

The script processed bank statement CSV files and automatically generated the accounting documents:

**Input Processing**
- Read bank statement CSV files (initially extracted from PDF, later directly from bank)
- Parsed transaction details: amounts, dates, client names, transaction types
- Separated intercompany transactions from regular ones (bank charges, transfers)

**Intelligent Categorization**
- Applied rule-based logic to categorize each transaction
- Mapped transactions to appropriate GL accounts based on type
- Handled incoming vs. outgoing payments differently
- Identified special cases (refunds, loans, bank charges)

**Output Generation**
- Created properly formatted CSV files for NetSuite import
- Generated both header and line files as required by the ERP
- Applied proper date formatting and account mappings
- Included memo fields with transaction details for audit trail

## The Impact

**Time Savings**: Up to 95% reduction in processing time
- What took hours now completed in minutes
- During year-end closing (the busiest period), extremely long statements could be processed almost instantly

**Career Impact**: This automation work led to my promotion from Accounting Assistant to Finance Systems & Processes Analyst

**Cultural Shift**: Sparked curiosity among colleagues about automation and programming

## Technical Growth

This was my first real programming project, and it taught me:

- **Learning by doing**: No tutorials - just a real problem to solve
- **Iterative development**: Started simple, improved over time
- **Business value of automation**: Even basic scripts can save significant time

## Personal Note

This project was my breakthrough moment - the founding story of my professional data career. It proved that automation skills could transform not just processes, but career trajectories as well.
