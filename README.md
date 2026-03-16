# Lead Tracker — Chrome Extension

A lightweight Chrome extension to save and manage URLs as leads directly from your browser. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **Save Tab** — captures the current active tab's URL with one click
- **Save Input** — manually type and save any URL
- **Persistent storage** — leads are saved to `localStorage` and persist across sessions
- **Delete all** — double-click the DELETE button to clear all saved leads

## Project Structure

```
chrome_extension/
├── index.html       # Popup UI
├── index.js         # Extension logic
├── index.css        # Styles
├── manifest.json    # Chrome extension config (Manifest V3)
├── icon16.png
├── icon48.png
└── icon128.png
```

## Installation (Local)

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select this project folder

## Usage

Click the extension icon in your toolbar to open the popup.

- Type a URL in the input field and click **SAVE INPUT**
- Or click **SAVE TAB** to save the current tab's URL
- Click any saved lead to open it in a new tab
- Double-click **DELETE** to clear all leads

## Tech Stack

- HTML / CSS / JavaScript (vanilla)
- Chrome Extensions API — Manifest V3
- `chrome.tabs` API for active tab detection
- `localStorage` for data persistence
