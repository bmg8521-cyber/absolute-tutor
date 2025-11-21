# absolute |tutor|

A modern student learning platform with interactive features, progress tracking, and comprehensive educational resources.

## Quick Start
1. Open `index.html` in your web browser to launch the application
2. Navigate between pages using the top navigation menu
3. All interactions reset on page reload - perfect for clean demonstrations

## File Structure

### Main Pages
- **`index.html`** - Landing page with site introduction and navigation links
- **`schedule.html`** - Interactive schedule for browsing and registering for tutoring sessions
- **`dashboard.html`** - Personal progress tracker with visual indicators and activity counters
- **`resources.html`** - Educational content hub organized by subjects (Math, Science, Computer Science, Languages) with videos, quizzes, and materials

### Styling & Assets
- **`assets/css/style.css`** - Complete stylesheet with Changa fonts, green theme, and responsive design
- **`assets/img/logo.svg`** - Custom SVG logo displaying "absolute |tutor|" branding
- **`assets/img/CONVERT_LOGO.md`** - Instructions for converting SVG text to paths for distribution

### JavaScript Functionality
- **`assets/js/app.js`** - Core navigation system and shared utility functions
- **`assets/js/schedule.js`** - Session database with in-memory storage for demo-friendly presentations
- **`assets/js/dashboard.js`** - Progress tracking, activity counters, and reset functionality with empty state handling
- **`assets/js/resources.js`** - Subject-based resource management, quiz interactions, video lazy-loading, and progress tracking

### Educational Content
- **`assets/resources/sample.pdf`** - Original sample study material for download
- **`assets/resources/calculus_notes.pdf`** - Beginner calculus reference notes and formulas

### Development Tools
- **`tools/generate_pdf.py`** - Python script for generating formatted PDFs using ReportLab library

### Project Documentation
- **`README.md`** - This file with project overview and setup instructions
- **`ATTRIBUTIONS.md`** - Complete credits for fonts, libraries, videos, and copyrighted materials
- **`.gitignore`** - Git ignore rules for Python cache and system files
- **`.nojekyll`** - Ensures proper GitHub Pages deployment without Jekyll processing

## Key Features
- **Demo-Friendly**: All data resets on page reload - perfect for presentations and clean testing
- **Subject Organization**: Resources organized by Math, Science, Computer Science, and Languages with tab navigation
- **Session Management**: Create, browse, and register for tutoring sessions with real-time availability tracking
- **Progress Tracking**: Visual dashboard with activity counters, progress visualization, and completion statistics
- **Accessibility**: Skip links, ARIA labels, keyboard navigation, and screen reader support
- **Responsive Design**: Mobile-friendly layout that adapts to all screen sizes
- **Educational Content**: Embedded Organic Chemistry Tutor videos with lazy-loading and custom thumbnails
- **Interactive Elements**: Subject-specific quizzes, progress bars, and session registration system

## Technical Requirements
- Modern web browser with ES6+ support
- Internet connection for Google Fonts and embedded YouTube content

## Deployment
The site is configured for GitHub Pages hosting with all necessary files included for static deployment.

---

**Live Demo**: [bmg8521-cyber.github.io/absolute-tutor](https://bmg8521-cyber.github.io/absolute-tutor)
