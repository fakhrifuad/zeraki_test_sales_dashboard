# Sales Agent Dashboard

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Design Decisions](#design-decisions)
- [Local Deployment](#local-deployment)
- [Deployed Version](https://zeraki-test-sales-dashboard.web.app/)

## Overview

The Sales Agent Dashboard is a responsive web application designed to facilitate the management of school accounts, invoicing, and collections for Zeraki's sales agents. The dashboard provides data visualization for targets and sign-ups, enhancing the ability to monitor and manage sales and collections activities.

## Features

### Navigation

- **Side Navigation**: Divides the application into two primary modules:
  - Dashboard Module
  - Schools Module

### Dashboard Overview

- **Top Card Metrics**:
  - Collections
  - Sign-ups
  - Total Revenue
  - Bounced Cheques
- **Targets Visualization**: Pie charts for signup targets for Zeraki Analytics, Zeraki Finance, and Zeraki Timetable.
- **Signups Overview**: Bar graphs for the distribution of sign-ups across different school types (Primary, Secondary, IGCSE).
- **Upcoming Invoices**: List of upcoming invoices with actions for payment collection.

### School Management

- **Schools**:
  - List of Schools
  - School Details
- **Invoices**:
  - List All Invoices
  - CRUD Operations for Invoices
  - Adding collections to an invoice
- **Collections**:
  - List Collections
  - Mark Collection Status

## Project Structure
```bash
zeraki_test_sales_dashboard
├── .env
├── .gitignore
├── node_modules
├── package-lock.json
├── package.json
├── public
│ ├── favicon.ico
│ ├── index.html
│ ├── manifest.json
│ └── robots.txt
├── README.md
├── src
│ ├── api
│ │ └── server.js
│ ├── App.css
│ ├── App.jsx
│ ├── components
│ │ ├── Dashboard.jsx
│ │ ├── Footer.jsx
│ │ ├── SchoolDetails.jsx
│ │ ├── Schools.jsx
│ │ └── Sidebar.jsx
│ ├── data
│ │ └── db.json
│ ├── index.jsx
│ ├── services
│ │ └── dataService.jsx
│ └── styles
│ ├── Dashboard.css
│ ├── Footer.css
│ ├── SchoolDetails.css
│ ├── Schools.css
│ └── Sidebar.css
└── vercel.json
```
