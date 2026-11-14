# Student Portfolio & Academic Planner

A responsive, multi-page student portfolio and coursework planner built as a COS 106 – Introduction to Web Technologies assignment for MIVA Open University. It uses only HTML5, CSS3, and vanilla JavaScript; there is no framework, backend, or external database.

## Student details

Update the remaining placeholders before submission:

- **Student name:** Adeniran Noah
- **Matriculation number:** [Add your matriculation number]
- **Department:** Software Engineering
- **University:** MIVA Open University
- **GitHub repository URL:** [Add your repository URL]
- **Live website URL:** [Add your deployed website URL]

## Features

- Five linked pages: home, about, projects, academic planner, and contact.
- Shared responsive navigation with mobile hamburger menu and active-page highlighting.
- Three illustrated project concepts with working details dialogs.
- Academic planner with task creation, course, due date, priority, completion, filters, confirmation before deletion, statistics, and local browser persistence.
- Contact-form validation for required fields, email format, and digits-only phone numbers. Submission is explicitly a browser-only demonstration; it does not send an email.
- About page includes a semantic education table and skills including React, Next.js, TypeScript, Python, and Django.
- The audio/multimedia section and sample audio asset have been removed at the student's request.
- Keyboard focus indicators, a skip link, semantic page structure, responsive layouts, and reduced-motion support.

## Technologies

- HTML5 for page structure and accessible forms.
- CSS3 for the shared design system, responsive layouts, Flexbox, Grid, and interactions.
- Vanilla JavaScript for navigation, project dialogs, form validation, and planner behavior.
- `localStorage` for saving planner tasks in the current browser.

No package installation or build step is required. Google Fonts are used when an internet connection is available; system sans-serif fallbacks are included.

## Folder structure

```text
.
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── planner.js
│   └── contact.js
└── assets/
    └── images/
        ├── student-portrait.svg
        ├── grade-calculator.svg
        ├── expense-tracker.svg
        └── digital-library.svg
```

## Run locally

Open `index.html` in a modern browser. For a local web-server preview, open a terminal in this folder and run one of these commands if installed:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. The project has no server-side functionality. Planner tasks are saved only in the browser profile where they were created.

## Replace the sample student information

1. Replace the sample biography and education row, and add your matriculation number and any other required student details.
2. Update the page titles and descriptions near the top of each HTML file to match your profile.
3. Replace `assets/images/student-portrait.svg` with a profile image you have permission to use, and update the image `src` and meaningful `alt` text as needed.
4. Update the sample interests, skills, achievements, and contact details in `about.html`, `index.html`, and `contact.html`. Do not list qualifications or skills you do not have.
5. Replace the sample project concepts and illustrations with your actual work when available. Keep the details dialog honest about what is implemented versus planned.
6. Fill in your matriculation number, repository URL, and live URL in this README. Only publish personal contact details you are comfortable making public.

## Academic planner behavior

`js/planner.js` stores tasks as an array of objects. Each task contains an ID, title, course, due date, priority, and completion status. The form validates the title, subject, and date before creating a task. The page renders task cards dynamically, filters by all/pending/completed status, and updates total, pending, completed, and completion-percentage summaries whenever a task changes. Tasks are saved under the `alexMorganAcademicTasks` key in `localStorage`, so they persist across refreshes in the same browser. They are not uploaded or synchronized. Deleting a task requires browser confirmation. Corrupted or unavailable storage produces a visible message instead of silently appearing to save.

## Contact-form validation

`js/contact.js` checks that all four fields are filled, checks email syntax with a basic format pattern, and accepts only digits in the phone field. Errors are displayed beside the related field and cleared as the user edits it. A valid submission displays an explicit demonstration-only confirmation. No message is sent or retained.

## Assignment requirements checklist

| Requirement | Implemented in |
|---|---|
| Five static pages with consistent navigation and footer | `index.html`, `about.html`, `projects.html`, `planner.html`, `contact.html` |
| Premium visual style, design tokens, typography, and shared stylesheet | `css/style.css` |
| Responsive mobile-first layouts, Flexbox/Grid, hamburger menu, reduced motion | `css/style.css`, `js/main.js` |
| Student introduction, profile image, study details, skills, featured projects, calls to action | `index.html` |
| Biography, education table, aspirations, skills, interests, and achievement placeholders | `about.html` |
| Three project concepts with illustrations, technologies, and working details interactions | `projects.html`, `assets/images/`, `js/main.js` |
| Academic task add, title/course/date/priority, completion, delete confirmation, filters | `planner.html`, `js/planner.js` |
| Dynamic task rendering, empty state, statistics, progress, and persistent browser storage | `planner.html`, `js/planner.js` |
| Corrupted storage handling and long-title handling | `js/planner.js`, `planner.html` |
| Contact required fields, email and phone checks, field-level errors, demo success | `contact.html`, `js/contact.js` |
| Semantic landmarks, labels, tables, lists, images, accessible states | All HTML pages |
| Local run, customization, planner, validation, and GitHub Pages documentation | `README.md` |


