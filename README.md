# RSVP Reader

A lightweight RSVP (Rapid Serial Visual Presentation) reader designed for real-scene reading experiments and speed-reading research.

This project emphasizes **clear state management, precise timing control, and logical correctness**, rather than complex UI design.

---

## ✨ Features

- Word-by-word RSVP playback
- Adjustable reading speed (200–800 ms per word)
- Explicit playback state machine:
  - `idle`
  - `playing`
  - `paused`
  - `finished`
- Clean separation between core logic and UI
- Easy to extend for academic experiments

---

## 🧠 Core Architecture

### RSVP Engine (Logic Layer)

Responsible for:

- Playback state transitions
- Word index management
- Timing and interval control
- Speed adjustment

This separation ensures the engine is reusable, testable, and suitable for research-oriented development.

---

## 📂 Project Structure

```
RSVP-reader/
├── src/
│   ├── controller.js
│   ├── playback-engine.js
│   ├── renderer.css
│   ├── styles.css
│   ├── utils.js
├── scripts/
│   ├── build-extension.sh
├── extension/
│   ├── manifest.json
│   ├── popup-init.js
│   ├── popup.html
│   ├── style.css
├── .github/workflows
│   ├── build-extension.yml
├── index.html
├── .gitignore
├── LICENSE
├── README.md
└── demo_instructions.md

```

> File names may vary slightly depending on implementation.

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/binghan1227/RSVP-reader.git
cd RSVP-reader
```

### Run the Demo

### Option 1: Run via Extension (Recommended)

1. First, execute the build script to generate the extension package:
   
   ```bash
   ./scripts/build-extension.sh
   
2. Open Chrome and navigate to the extension management page:
   chrome://extensions/
   
3. Enable Developer mode (toggle in the top-right corner).
4. Drag the generated ZIP file from the Build folder into the extension page to load it.

### Option 2: Run via HTML File

Open the following file directly in a modern browser:

```index.html```

No build step or server is required.
---

## 🔧 Customization

- Modify reading speed in the RSVP controller
- Replace text input for different experiments
- Extend the state machine to support:
  - backward navigation
  - adaptive speed control
  - eye-tracking or AI-based input (future work)

---

## 🎓 Intended Use

- Speed-reading experiments
- Cognitive science / HCI coursework
- RSVP-based UI prototyping
- Teaching examples for state machines and timing logic

---

## 📌 License

MIT License (or specify your own license).

