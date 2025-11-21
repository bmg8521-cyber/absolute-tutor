# absolute |tutor|

A modern student learning platform with interactive features, progress tracking, and comprehensive educational resources.

## Quick Start
1. Open `index.html` in your web browser to launch the application
2. Navigate between pages using the top navigation menu
3. All data is saved locally in your browser - no account required

## File Structure

### Main Pages
- **`index.html`** - Landing page with site introduction and navigation links
- **`schedule.html`** - Interactive schedule for browsing and registering for tutoring sessions
- **`dashboard.html`** - Personal progress tracker with visual indicators and activity counters
- **`resources.html`** - Educational content hub with videos, quizzes, and downloadable materials

### Styling & Assets
- **`assets/css/style.css`** - Complete stylesheet with Changa fonts, green theme, and responsive design
- **`assets/img/logo.svg`** - Custom SVG logo displaying "absolute |tutor|" branding
- **`assets/img/CONVERT_LOGO.md`** - Instructions for converting SVG text to paths for distribution

### JavaScript Functionality
- **`assets/js/app.js`** - Core navigation system and shared utility functions
- **`assets/js/schedule.js`** - Session registration and localStorage management for schedule page
- **`assets/js/dashboard.js`** - Progress tracking, activity counters, and reset functionality
- **`assets/js/resources.js`** - Quiz interactions, video lazy-loading, and resource completion tracking

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
- **Persistent Data**: All user progress and registrations saved with localStorage
- **Accessibility**: Skip links, ARIA labels, keyboard navigation, and screen reader support
- **Responsive Design**: Mobile-friendly layout that adapts to all screen sizes
- **Educational Content**: Embedded Organic Chemistry Tutor videos with lazy-loading
- **Interactive Elements**: Quizzes, progress bars, and session registration system

## Technical Requirements
- Modern web browser with ES6+ and localStorage support
- Internet connection for Google Fonts and embedded YouTube content

## Deployment
The site is configured for GitHub Pages hosting with all necessary files included for static deployment.

---

**Live Demo**: [bmg8521-cyber.github.io/absolute-tutor](https://bmg8521-cyber.github.io/absolute-tutor)
