# Adeniran Noah — Student Portfolio & Academic Planner

A responsive, multi-page student portfolio and coursework planner built with pure HTML5, CSS3, and vanilla JavaScript — no frameworks, no backend, no database. Created as a COS 106 (Introduction to Web Technologies) assignment at MIVA Open University.

**Live site:** https://lab-assessment-six.vercel.app

## Student Details

| | |
|---|---|
| **Name** | Adeniran Noah |
| **Matric No.** | 2025/C/SENG/0728 |
| **Department** | Software Engineering |
| **University** | MIVA Open University |
| **Repository** | https://github.com/adenirannoah1234/lab-assessment.git |

## Overview

The site combines a personal portfolio (home, about, projects, contact) with a functional academic planner that lets students create, track, filter, and persist coursework tasks entirely in the browser.

## Features

- **Five linked pages** — home, about, projects, academic planner, and contact, with shared navigation, mobile hamburger menu, and active-page highlighting.
- **Academic planner** — create tasks with title, course, due date, and priority; mark complete; filter by all / pending / completed; view live statistics and completion progress; delete with confirmation. Tasks persist via `localStorage` and corrupted storage shows a visible error instead of failing silently.
- **Project showcase** — three illustrated project concepts with working details dialogs.
- **Validated contact form** — required-field, email-format, and digits-only phone checks with inline errors. Submission is a browser-only demonstration; nothing is sent or stored.
- **Accessibility** — semantic landmarks, skip link, labels, focus indicators, and reduced-motion support.
- **Light / dark theme** toggle with responsive mobile-first layouts (Flexbox + Grid).

## Tech Stack

| Technology | Role |
|---|---|
| HTML5 | Page structure, semantic markup, accessible forms |
| CSS3 | Design system, responsive layouts, Flexbox, Grid, theming |
| Vanilla JavaScript | Navigation, dialogs, validation, planner logic |
| `localStorage` | Client-side task persistence (key: `alexMorganAcademicTasks`) |

## Project Structure

```text
.
├── index.html            # Home / hero
├── about.html            # Biography, education table, skills
├── projects.html         # Project concepts + details dialogs
├── planner.html          # Academic task planner
├── contact.html          # Contact form
├── css/
│   └── style.css         # Shared design system
├── js/
│   ├── main.js           # Navigation, theme, dialogs
│   ├── planner.js        # Task CRUD, filters, stats, storage
│   └── contact.js        # Form validation
└── assets/
    └── images/
        ├── Adeniran-noah.jpeg
        ├── grade-calculator.svg
        ├── expense-tracker.svg
        └── digital-library.svg
```

## Getting Started

No build step or dependencies. Open `index.html` directly, or serve locally:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

Planner tasks are stored only in the browser profile where they were created.

## Academic Planner — How It Works

Tasks are stored as an array of `{ id, title, course, dueDate, priority, completed }` objects under the `alexMorganAcademicTasks` key in `localStorage`. The form validates title, course, and date before creating a task. Task cards render dynamically with an empty state, status filters, and live totals (total / pending / completed / completion %). Deletion requires confirmation. Data never leaves the browser.

## Contact Form — Validation Rules

- All fields required (name, email, phone, message)
- Email checked against a standard format pattern
- Phone accepts digits only
- Errors appear beside each field and clear on edit; valid submissions show a demo-only confirmation

## Assignment Requirements

| Requirement | Location |
|---|---|
| Five static pages, consistent nav + footer | `index.html`, `about.html`, `projects.html`, `planner.html`, `contact.html` |
| Shared stylesheet, design tokens, typography | `css/style.css` |
| Responsive layouts, Flexbox/Grid, hamburger menu, reduced motion | `css/style.css`, `js/main.js` |
| Intro, profile photo, study details, skills, CTAs | `index.html` |
| Bio, education table, aspirations, interests | `about.html` |
| Three project concepts with details interactions | `projects.html`, `assets/images/`, `js/main.js` |
| Task add / complete / delete-confirm / filters | `planner.html`, `js/planner.js` |
| Dynamic rendering, stats, progress, persistence | `planner.html`, `js/planner.js` |
| Storage-error and long-title handling | `js/planner.js`, `planner.html` |
| Contact validation with field-level errors | `contact.html`, `js/contact.js` |
| Semantic, accessible markup throughout | All pages |
