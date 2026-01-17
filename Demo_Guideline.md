# RSVP Demo Guide

This document is **for live demonstration only**.  
It is **not** a product manual and **not** a technical specification.

**Single goal:** ensure the demo is **stable, repeatable, and failure-safe**.

---

## 🎯 Demo Objective

Demonstrate to the audience:

- The core RSVP (Rapid Serial Visual Presentation) experience
- Controlled playback: Start / Pause / Replay
- Adjustable reading speed

**Not demonstrated:**
- Performance limits
- Advanced interactions
- Edge-case behavior

---

## 🧑‍💻 Pre-Demo Setup (Required)

### 1️⃣ Use a Fixed Text (Recommended)

Prepare the following text in advance (or an English paragraph of similar length):

> RSVP allows readers to process text by displaying words sequentially at a fixed location, reducing eye movement and improving reading focus.

⚠️ Do **not** copy unknown or untested text during the demo.

---

### 2️⃣ Initial Configuration

- Speed: **300 ms**
- State: Idle
- Text loaded, **playback not started**

---

## 🎮 Standard Demo Flow (Follow Strictly)

### Step 1: Paste Text
- Paste the prepared text into the input area
- Verify correctness

✅ Do **not** click any playback buttons yet

---

### Step 2: Set Speed
- Adjust the speed slider to **300 ms**
- Adjust **only once**

⚠️ Do not change speed during playback

---

### Step 3: Click Start
- Click **Start**
- Words begin displaying sequentially

🎙️ Talking point:  
> “The system presents words one by one at a fixed position to reduce eye movement.”

---

### Step 4: Pause Playback (Optional)
- After 3–5 words
- Click **Pause**
- Wait for 1–2 seconds

🎙️ Talking point:  
> “Playback can be paused and resumed at any time.”

---

### Step 5: Resume Playback
- Click **Start / Resume**
- Continue until playback finishes

---

### Step 6: Playback Finished
- System enters **Finished** state automatically
- Display stops at the last word

🎙️ Talking point:  
> “After playback completes, the system transitions to a finished state.”

---

### Step 7: Click Replay
- Click **Replay**
- Playback restarts from the first word

🎙️ Talking point:  
> “Users can instantly replay the text from the beginning.”

---

## 🚫 Forbidden Actions During Demo (Critical)

🚫 During playback:
- Editing text
- Adjusting speed slider
- Rapid or repeated button clicks

🚫 After playback finishes:
- Clicking Pause
- Repeatedly clicking Play

These actions are **outside demo scope**.

---

## 🛟 Emergency Plan (Plan B)

If something goes wrong:

### Case 1: No Playback Response
- Refresh the page
- Use built-in default text
- Click Start directly

---

### Case 2: Button State Issues
- Stop explanation
- Refresh the page
- Restart from Step 1

---

### Case 3: Demo Cannot Run
- Use prepared screen recording / GIF
- Walk through the demo script verbally

---

## ✅ Demo Success Criteria

The demo is considered successful if:

- No crashes occur
- Buttons behave as expected
- Audience understands the RSVP concept

> **No need to be fancy — stability matters most.**

---

## 📌 Final Reminder

- Follow the demo flow strictly
- Avoid improvisation
- Do not stress-test the system live

**A demo is a presentation, not a test.**
