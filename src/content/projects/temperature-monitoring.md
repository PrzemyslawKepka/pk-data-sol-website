---
title: "IoT Temperature Monitoring"
description: "A Raspberry Pi-based system for monitoring refrigerator temperatures with DS18B20 sensors, email alerts, InfluxDB storage, and Grafana dashboards."
categories: ["Dashboard", "ETL Pipeline"]
technologies: ["Python", "Raspberry Pi", "InfluxDB", "Grafana", "pandas", "matplotlib"]
github: "https://github.com/PrzemyslawKepka/temperature-monitoring"
image: "/images/projects/temperature-monitoring/temperature-monitoring-cover.png"
projectType: "side"
year: "2020-2021"
industry: "IoT"
lang: "en"
---

## The Problem

I suspected my refrigerator wasn't working correctly. At the same time, I wanted to learn about Raspberry Pi and IoT technologies. Why not solve a real problem while learning?

## The Solution

I built a complete IoT monitoring system with temperature sensors connected to a Raspberry Pi 4B. The system continuously collects data and provides intelligent alerting.

### Hardware Setup

- **Raspberry Pi 4B** as the central controller
- **DS18B20 temperature sensors** (2 units)
  - One for the fridge compartment
  - One for the freezer
- **Breadboard** for sensor wiring

### Key Features

**Continuous Monitoring**
- 1-second polling intervals
- Sensor identification by unique ID (not array position)
- Graceful handling of sensor disconnection

**Intelligent Alerting**
- Temperature thresholds: Fridge >10°C, Freezer >-10°C
- **Rate limiting**: Maximum 1 email per sensor every 6 hours
- Script failure notifications
- Gmail SMTP integration

**Data Persistence**
- CSV exports every 10,000 readings
- Automatic export on script crash
- Timestamped filenames with randomized suffixes

## Technical Evolution

### Phase 1: MVP

The initial version (`temperature_monitoring.py`) focused on core functionality:
- Local Python script
- Email notifications via SMTP
- CSV exports and matplotlib graphs
- Pandas data processing with smart fill strategies

### Phase 2: Production Enhancement

The enhanced version (`data_to_influxDB.py`) added professional monitoring:
- **InfluxDB** for time-series storage
- **Grafana** for real-time dashboards
- **Batch processing** (10 readings per write) to reduce DB operations
- Automatic database creation on startup

## Production-Aware Design

**Rate Limiting**
```python
if datetime.now() > (fridge_notif_sent + timedelta(hours=6)):
    temperature_too_high(current_temperature, current_sens)
    fridge_notif_sent = datetime.now()
```

**Graceful Degradation**
- Data export triggered on any failure
- Notification sent when script goes down
- No data loss during errors

**Smart Data Handling**
- Forward-fill for freezer gaps
- Backward-fill for fridge gaps
- Pivot tables for multi-sensor comparison

## The Outcome

The monitoring system successfully identified the refrigerator malfunction - the freezer showed high temperature amplitude, confirming my suspicions. The data provided concrete evidence for the appliance replacement decision.

## Skills Demonstrated

- **IoT Hardware Integration**: Physical sensor wiring, GPIO interface
- **Time-Series Data Engineering**: InfluxDB, batch processing
- **Monitoring & Observability**: Alerting strategies, Grafana dashboards
- **Production Thinking**: Error handling, rate limiting, graceful degradation

## Personal Note

This project perfectly embodies my approach: solving real problems while learning new technologies. Not a tutorial project, but a practical solution that delivered measurable value.
