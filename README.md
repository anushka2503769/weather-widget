# Aesthetic Singapore Weather Widget for Notion

A lightweight, responsive live weather widget designed for dark-themed, earthy Notion workspaces. This widget pulls real-time meteorological data directly from the official National Environment Agency (NEA) Singapore database and styles it using classical museum-inspired typography, raw umber canvas tones, and poetic mood text.

---

## Features
* **Live API Connection**: Fetches up-to-date ambient temperatures and general atmospheric forecasts for Singapore.
* **Classical Fine-Art Descriptions**: Translates standard weather tags (such as rain or clouds) into romanticized, art-focused prose descriptors.
* **Earthy Fine-Art Palette**: Blends warm charcoals, muted golds, and antique terracotta tones seamlessly into Notion's dark mode canvas framework.
* **Anti-Flicker Engineering**: Employs an active script layout to match container systems and eliminate white loading screen anomalies.
* **Automated Intervals**: Automatically refreshes weather data points in the background every 15 minutes.

---

## Project Structure
Ensure your workspace directory contains these three files named exactly as shown:
```text
├── index.html   # Main card skeleton and framework layers
├── style.css    # Typography scale, margins, alignment, and color declarations
└── script.js    # Open-data API extraction and structural formatting logic
```

---

## Step-by-Step Setup Guide

### 1. Save Your Source Files
1. Copy the code strings for index.html, style.css, and script.js provided into separate plain text files using any standard code editor (such as VS Code, Notepad, or TextEdit).
2. Save them into a dedicated directory on your system.

### 2. Host the Code Online via GitHub Pages
Because Notion requires a web protocol interface link to register embed components, web hosting is necessary:
1. Navigate to GitHub.com and access your account profile.
2. Select the New button to instantiate a fresh project repository. Assign a title such as notion-weather-widget.
3. Configure the visibility parameters to Public.
4. Finalize the workspace creation.
5. Click the option to upload an existing file, then drag and drop index.html, style.css, and script.js into the staging field.
6. Commit the structural file updates.
7. Navigate to the repository Settings panel from the horizontal menu header, locate Pages in the lateral sidebar menu, and select it.
8. Locate Build and deployment, verify the deployment branch is locked to main (or master), and click Save.
9. Allow up to two minutes for structural builds, then refresh the dashboard interface. Copy the active live URL displaying at the header of the page.

---

## Integrating with Notion

1. Copy the live webpage URL destination string from your GitHub Pages portal.
2. Navigate directly to your active Notion canvas dashboard interface.
3. Select an empty line grid element space, type /embed, and choose the embed option module.
4. Insert your live repository deployment link into the input destination path bar.
5. Confirm the action to initialize the live viewport module.
6. Scale and organize the layout grid boundary handles to match your preferred columns.

---

## Customization Variations

### Adjusting Color Values
To alter theme variables to match other classical painting variants, modify the palette definitions at the top of style.css:
```css
:root {
  --bg-dark: #191919;       /* Matches Notion canvas backgrounds */
  --card-bg: #22201D;       /* Changes the interior canvas framework background color */
  --accent-gold: #C5A059;   /* Updates structural borders and text titles */
  --earth-terracotta: #A46A54; /* Sets subheader colors and typography dividing elements */
  --text-parchment: #E2dacb; /* Controls text string brightness standards */
}
```

### Expanding the Poetic Text Profiles
To inject custom poetic prose corresponding to target weather patterns, update the string records inside the moodDatabase declaration array located inside script.js:
```javascript
const moodDatabase = {
  clear: "“Your personalized text here for clear skies.”",
  cloudy: "“Your personalized text here for overcast conditions.”",
  rain: "“Your personalized text here for rain storms.”",
  thunderstorm: "“Your personalized text here for electrical storms.”",
  default: "“Your fallback text string choice.”"
};
```

---

## License
Permission is granted to modify, personalize, and integrate this script engine structure into your personal workspace environment layouts.
