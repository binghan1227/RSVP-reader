# RSVP Reader – Demo Instructions

This document explains how to use the RSVP Reader demo and what behaviors it is designed to demonstrate.

---

## 🖥️ Demo Overview

The demo showcases:

- RSVP word-by-word presentation
- Playback state transitions
- Adjustable reading speed
- Pause and resume behavior

The demo UI is intentionally minimal and focuses on logic correctness rather than visual design.

---

## ▶️ How to Run the Demo

1. Navigate to the `demo/` directory
2. Open `demo.html` in a modern web browser
3. The reader starts in the `idle` state

No installation, build process, or server is required.

---

## 🎮 Controls and States

### Start

- Begins RSVP playback
- State transition: `idle → playing`

### Pause

- Temporarily stops word progression
- State transition: `playing → paused`

### Resume

- Continues playback from the current word
- State transition: `paused → playing`

### Finish

- Automatically triggered when the final word is displayed
- State transition: `playing → finished`

---

## ⏱️ Speed Control

- Speed is defined in **milliseconds per word**
- Typical values:
  - Slow: 800 ms
  - Medium: 400 ms
  - Fast: 200 ms

Speed changes take effect immediately during playback.

---

## 🔍 Expected Behaviors

Reviewers should observe that:

- Words advance at consistent intervals
- Pause does not reset the word index
- Resume continues from the correct position
- State transitions are explicit and deterministic

These behaviors demonstrate a correctly implemented RSVP engine.

---

## 🧪 Suggested Demo Scenarios

1. Start → Pause → Resume → Finish
2. Adjust speed while playing
3. Pause at different word positions
4. Restart playback with a new text input

---

## 📎 Notes

- UI simplicity is intentional
- Logic correctness and timing accuracy are the main evaluation targets
- Suitable for coursework, demos, and code review

---

## 📬 Extension

The demo can be extended without modifying the core engine, making it suitable for experimental or research-based customization.

