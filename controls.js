console.log("Controls loaded");

/* ======================
   RSVP Renderer Initialization
====================== */

const displayContainer = document.getElementById("rsvp-display");
const renderer = new RSVPRenderer(displayContainer, {
  highlightColor: '#ff6b6b',
  fontSize: '48px'
});

/* ======================
   Player State
====================== */

let playerState = "idle";
// possible: idle | playing | paused | finished

/* ======================
   Playback Engine
====================== */

const engine = {
  words: [],
  currentIndex: 0,
  intervalId: null,
  speed: 400,

  loadText(words) {
    this.words = words;
    this.currentIndex = 0;
    console.log("ENGINE → text loaded:", words);
    if (words.length > 0) {
      renderer.clear();
    }
  },

  setSpeed(ms) {
    this.speed = ms;
    console.log("ENGINE → speed set to", ms);
    
    // If currently playing, restart the interval with new speed
    if (playerState === "playing" && this.intervalId !== null) {
      this._stopInterval();
      this._startInterval();
    }
  },

  start() {
    if (this.words.length === 0) {
      console.log("ENGINE → no text loaded");
      return;
    }

    // If already at the end, don't start
    if (this.currentIndex >= this.words.length) {
      console.log("ENGINE → already finished");
      return;
    }

    console.log("ENGINE → start from index", this.currentIndex);
    this._startInterval();
  },

  pause() {
    console.log("ENGINE → pause at index", this.currentIndex);
    this._stopInterval();
  },

  reset() {
    console.log("ENGINE → reset");
    this._stopInterval();
    this.currentIndex = 0;
    renderer.clear();
  },

  _startInterval() {
    // Clear any existing interval
    this._stopInterval();

    // Show current word immediately
    if (this.currentIndex < this.words.length) {
      renderer.render(this.words[this.currentIndex]);
    }

    // Set up interval for next words
    this.intervalId = setInterval(() => {
      this.currentIndex++;
      
      if (this.currentIndex >= this.words.length) {
        // Playback finished
        this._stopInterval();
        setState("finished");
      } else {
        renderer.render(this.words[this.currentIndex]);
      }
    }, this.speed);
  },

  _stopInterval() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
};

/* ======================
   DOM Elements
====================== */

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const replayBtn = document.getElementById("replayBtn");

const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");

const textInput = document.getElementById("textInput");

/* ======================
   Helpers
====================== */

function parseText(text) {
  return text.trim().split(/\s+/);
}

function setState(newState) {
  playerState = newState;
  console.log("STATE →", playerState);
  
  // Update button states based on player state
  if (newState === "playing") {
    pauseBtn.disabled = false;
  } else {
    pauseBtn.disabled = true;
  }
}

/* ======================
   Button Controls
====================== */

startBtn.onclick = () => {
  if (playerState === "playing") return;

  // If finished, reset first
  if (playerState === "finished") {
    engine.reset();
  }

  engine.start();
  setState("playing");
};

pauseBtn.onclick = () => {
  if (playerState !== "playing") return;

  engine.pause();
  setState("paused");
};

replayBtn.onclick = () => {
  engine.reset();
  engine.start();
  setState("playing");
};

/* ======================
   Speed Control
====================== */

speedSlider.addEventListener("input", () => {
    const ms = Number(speedSlider.value); // 获取当前滑块值
    speedValue.textContent = ms;          // 更新显示
    engine.setSpeed(ms);                   // 通知 engine
  });


/* ======================
   Text Input Handling
====================== */

textInput.onchange = () => {
  const words = parseText(textInput.value);
  engine.reset();
  engine.loadText(words);
  setState("idle");
};

// Initialize with default text and speed
const initialWords = parseText(textInput.value);
engine.loadText(initialWords);
engine.setSpeed(Number(speedSlider.value));
setState("idle");
