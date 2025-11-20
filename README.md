Absolute Tutor — Student-created online learning hub (Calculus)

Overview
- Static site to demonstrate a student-first learning hub.
- Includes: schedule page, student dashboard (local progress), resources (lessons, video, quiz, downloads).

Run locally
- Open `index.html` directly in your browser, or run a simple static server:

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Files of interest
- `index.html` — landing page (site title: Absolute Tutor)
- `schedule.html` — live tutoring & group study schedule (registers to localStorage)
- `dashboard.html` — tracks learning progress using localStorage
- `resources.html` — lessons, embedded video, quiz, downloadable cheat sheet
- `assets/js` — JS modules: `app.js`, `dashboard.js`, `schedule.js`, `resources.js`
- `assets/css/style.css` — styles

Notes
- This is a minimal static prototype. For production use, integrate authentication and a backend (server + DB) to persist schedules and progress across devices.
- To replace the sample PDF, put a real PDF at `assets/resources/sample.pdf`.
