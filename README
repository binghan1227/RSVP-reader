# RSVP Speed Reading Demo

> A minimal, stable RSVP (Rapid Serial Visual Presentation) demo  
> Focused on **engine stability, clear rendering, and safe demo flow**

---

## 🎯 Project Goal

This project demonstrates a **basic RSVP speed reading system** that:

- Plays words one by one at a fixed position
- Supports **Start / Pause / Replay**
- Allows speed control
- Is **demo-safe**: no crashes under normal usage

The scope is intentionally limited to ensure reliability during presentation.

---

## 🧩 System Architecture

The system is divided into **four clearly decoupled roles**:

### 1️⃣ RSVP Engine
**Responsible for:**
- Playback state machine (`idle / playing / paused / finished`)
- Timing logic (word switching)
- Speed control (200–800 ms)

**Not responsible for:**
- UI rendering
- Input handling
- Animation effects

---

### 2️⃣ Renderer & Highlight
**Responsible for:**
- Fixed-position word display
- Center-letter (ORP-style) highlighting
- Font alignment and visual stability

**Not responsible for:**
- Timers
- Playback state
- Control logic

---

### 3️⃣ Controls & Input
**Responsible for:**
- Start / Pause / Replay buttons
- Speed slider
- Text input (simple textarea / TXT)

**Not responsible for:**
- Timing accuracy
- Rendering logic

---

### 4️⃣ Integration & Demo Safety
**Responsible for:**
- Connecting all modules
- Handling edge cases
- Defining demo-safe interaction flow
- Preparing demo script and fallback plan

This role ensures the demo **never crashes**.

---

## 🔌 Engine Interface Contract

The RSVP engine **must expose the following interface**:

```ts
engine.load(words: string[])
engine.play()
engine.pause()
engine.reset()
engine.setSpeed(ms: number)

engine.onWordChange(
  callback: (word: string, index: number) => void
)

engine.onStateChange(
  callback: (state: 'idle' | 'playing' | 'paused' | 'finished') => void
)
```

Integration must **not depend on engine internals**.

---

## 🔄 Playback State Rules

Allowed state transitions:

```
idle → playing → paused → playing → finished
finished → replay → playing
```

Illegal actions must be **ignored**, never crash the system.

| Current State | Play | Pause | Replay |
|--------------|------|-------|--------|
| idle         | ✅   | ❌    | ❌     |
| playing      | ❌   | ✅    | ❌     |
| paused       | ✅   | ❌    | ❌     |
| finished     | ❌   | ❌    | ✅     |

---

## 🎮 Demo-Safe User Flow (IMPORTANT)

Only the following interaction flow is allowed during demo:

1. Paste prepared text
2. Set speed **once**
3. Click **Start**
4. (Optional) Pause → Resume
5. Wait until playback finishes
6. Click **Replay**

🚫 Do NOT:
- Change text during playback
- Spam buttons
- Adjust speed slider while playing

Controls should disable invalid actions when possible.

---

## 🧪 Test Checklist

### Input Tests
- Empty text
- Single word
- Very long word (20+ characters)
- 100+ words

### Interaction Tests
- Repeatedly click Play
- Play → Pause → Pause
- Play → Replay
- Pause after finished

**Expected behavior:**
- No crash
- No duplicated playback
- Stable rendering

---

## 🎤 Demo Script

```
1. Paste prepared text
2. Set speed to 300ms
3. Click Start
4. Pause after a few words
5. Resume playback
6. Wait until finished
7. Click Replay
```

If any step fails:
- Refresh the page
- Use fallback text

---

## 🛟 Fallback Plan (Plan B)

Prepared for demo failure scenarios:

- Hardcoded default text
- Fixed-speed mode
- One-click Start demo
- Optional screen-recorded backup

Goal: **demo must succeed under all circumstances**.

---

## ✅ Definition of Success

The project is successful if:

> **Anyone can follow this README and complete the demo without assistance.**

Stability > Features  
Clarity > Complexity
