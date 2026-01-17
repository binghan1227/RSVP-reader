# RSVP Reader Renderer

A lightweight **Rapid Serial Visual Presentation (RSVP)** renderer for fast reading applications.  
This project provides a simple, browser-based implementation for rendering text **word by word** with **Optimal Recognition Point (ORP)** highlighting, suitable for speed reading research, demos, and prototyping.

---

## ✨ Features

- Word-by-word RSVP text rendering  
- Automatic ORP (Optimal Recognition Point) calculation and highlighting  
- Customizable font size and highlight color  
- Pure JavaScript implementation, no external dependencies  
- Runs directly in the browser without a build step  

---

## 📂 Project Structure

```
RSVP-reader-render/
├── LICENSE
├── README.md
├── demo.html
└── src/
    ├── renderer.js
    └── renderer.css
```

---

## 🚀 Getting Started

### 1. Download or Clone

```bash
git clone https://github.com/binghan1227/RSVP-reader-render.git
```

### 2. Run the Demo

Open `demo.html` directly in your browser.  
No server or additional setup is required.

---

## 🧠 Basic Usage

```html
<div id="rsvp"></div>

<script src="src/renderer.js"></script>
<script>
  const container = document.getElementById('rsvp');

  const renderer = new RSVPRenderer(container, {
    highlightColor: '#ff0000',
    fontSize: '48px'
  });

  renderer.renderWord("reading");
</script>
```

---

## 📖 About ORP (Optimal Recognition Point)

The **Optimal Recognition Point (ORP)** is the position in a word where readers naturally focus their gaze during reading.  
Highlighting this point helps reduce eye movement and improve reading efficiency.

---

## 📄 License

See the LICENSE file for details.
