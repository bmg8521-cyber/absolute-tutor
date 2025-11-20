Converting `assets/img/logo.svg` text to path outlines

Goal: create an SVG where the logo text is converted to vector path outlines so the logo renders identically everywhere (no external fonts required).

Recommended approach (Inkscape, local machine)

1. Install Inkscape (if not installed):
   - Ubuntu/Debian: `sudo apt install inkscape`
   - Mac: `brew install --cask inkscape`

2. Open the SVG and convert text to paths (GUI):
   - Open `assets/img/logo.svg` in Inkscape.
   - Select the text objects (absolute and tutor).
   - Path → Object to Path (Shift+Ctrl+C).
   - File → Save As... → choose "Plain SVG" and save as `assets/img/logo-outlined.svg`.

3. CLI (Inkscape 1.0+):
   - You can also run:

```bash
# exports a new SVG with text converted to outlines
inkscape assets/img/logo.svg --export-plain-svg=assets/img/logo-outlined.svg --export-text-to-path
```

Notes:
- Different Inkscape versions have slightly different CLI flags; if the above fails, open in the GUI and use Path → Object to Path.
- After conversion, inspect `logo-outlined.svg` to confirm there are no <text> elements (only <path> elements for letters).

Optional: create PNG versions

```bash
# create a PNG raster at 2x size (example)
rsvg-convert -w 1040 -h 240 assets/img/logo-outlined.svg -o assets/img/logo@2x.png
# or use Inkscape CLI
inkscape assets/img/logo-outlined.svg --export-filename=assets/img/logo@2x.png -w 1040 -h 240
```

If you'd like, I can attempt to run these conversion commands here — tell me if you want me to try and I will run the appropriate command (Inkscape must be available in the environment).