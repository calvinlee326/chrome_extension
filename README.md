# Lead Tracker — Chrome Extension

A lightweight Chrome extension to save and manage URLs as leads directly from your browser. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **Save Tab** — captures the current active tab's URL with one click
- **Save Input** — manually type and save any URL or note
- **Persistent storage** — leads are saved to `localStorage` and persist across sessions
- **Delete All** — double-click the Delete All button to clear all saved leads
- **Lead count badge** — header shows how many leads are currently saved
- **Safe URL handling** — only `http://` and `https://` URLs are made clickable; `javascript:` and other unsafe protocols are blocked
- **XSS protection** — all lead content is rendered via DOM APIs, never raw `innerHTML`

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

- Type a URL in the input field and click **Save Input**
- Or click **Save Tab** to save the current tab's URL automatically
- Click any saved lead to open it in a new tab
- Double-click **Delete All** to clear all leads

## Security

- Input is trimmed and validated before saving — blank entries are rejected
- Only `http://` and `https://` URLs are set as link `href` values; all others are rendered as plain text
- All leads rendered with `document.createElement` + `textContent` to prevent XSS
- `localStorage` reads are wrapped in `try/catch` — corrupted data is discarded gracefully instead of crashing the extension
- Links opened with `target="_blank"` include `rel="noopener noreferrer"` to prevent tab-napping

## Tech Stack

- HTML / CSS / JavaScript (vanilla)
- Chrome Extensions API — Manifest V3
- `chrome.tabs` API for active tab detection
- `localStorage` for data persistence
