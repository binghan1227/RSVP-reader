console.log("Controls loaded");

/* ======================
   Player State
====================== */

let playerState = "idle";
// possible: idle | playing | paused | finished

/* ======================
   Fake Engine (stub)
   later replaced by real engine
====================== */

const engine = {
  start() {
    console.log("ENGINE → start");
  },

  pause() {
    console.log("ENGINE → pause");
  },

  reset() {
    console.log("ENGINE → reset");
  },

  setSpeed(ms) {
    console.log("ENGINE → speed set to", ms);
  },

  loadText(words) {
    console.log("ENGINE → text loaded:", words);
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
const fileInput = document.getElementById("fileInput");

/* ======================
   Helpers
====================== */

function parseText(text) {
  if (!text || text.trim().length === 0) {
    return [];
  }
  return text.trim().split(/\s+/).filter(word => word.length > 0);
}

function setState(newState) {
  const oldState = playerState;
  playerState = newState;
  console.log(`STATE → ${oldState} → ${newState}`);
  updateButtonStates();
  updateStatusDisplay();
}

function updateStatusDisplay() {
  const statusText = document.getElementById('statusText');
  if (statusText) {
    statusText.textContent = playerState;
    statusText.style.color = 
      playerState === 'playing' ? '#0066cc' :
      playerState === 'paused' ? '#ff9900' :
      playerState === 'finished' ? '#00cc66' : '#666';
  }
}

function updateButtonStates() {
  // Update button states based on current player state
  if (startBtn) {
    startBtn.disabled = (playerState === "playing");
  }
  if (pauseBtn) {
    pauseBtn.disabled = (playerState !== "playing");
  }
  // Replay button is always enabled (except when idle with no text)
}

function resetPlayback() {
  // Stop any ongoing playback and reset to idle
  if (playerState === "playing" || playerState === "paused") {
    engine.pause();
  }
  engine.reset();
  setState("idle");
}

/* ======================
   Button Controls
====================== */

if (startBtn) {
  startBtn.onclick = () => {
    // Prevent multiple starts
    if (playerState === "playing") {
      console.warn("Already playing, ignoring start");
      return;
    }

    // If paused, resume from pause (engine should handle this)
    // If idle/finished, start fresh
    if (playerState === "paused") {
      engine.start(); // Resume
      setState("playing");
    } else {
      engine.start(); // Start fresh
      setState("playing");
    }
  };
}

if (pauseBtn) {
  pauseBtn.onclick = () => {
    // Only pause if currently playing
    if (playerState !== "playing") {
      console.warn("Not playing, cannot pause");
      return;
    }

    engine.pause();
    setState("paused");
  };
}

if (replayBtn) {
  replayBtn.onclick = () => {
    // Always reset and start from beginning
    // This should work from any state
    engine.reset();
    engine.start();
    setState("playing");
  };
}

/* ======================
   Speed Control
====================== */

if (speedSlider && speedValue) {
  // Initialize display
  speedValue.textContent = speedSlider.value;

  speedSlider.addEventListener("input", () => {
    const ms = Number(speedSlider.value);
    speedValue.textContent = ms;
    engine.setSpeed(ms);
    // Speed changes should apply immediately if playing
    console.log(`Speed updated to ${ms}ms`);
  });
}

/* ======================
   Text Input Handling
====================== */

if (textInput) {
  // Handle text changes - reset playback when text changes
  textInput.addEventListener("input", () => {
    const words = parseText(textInput.value);
    
    // Always reset playback when text changes
    resetPlayback();
    
    if (words.length > 0) {
      engine.loadText(words);
      console.log(`Text loaded: ${words.length} words`);
    } else {
      console.log("Empty text, cleared");
    }
  });

  // Also handle onchange for compatibility
  textInput.addEventListener("change", () => {
    const words = parseText(textInput.value);
    resetPlayback();
    if (words.length > 0) {
      engine.loadText(words);
    }
  });
}

/* ======================
   File Input Handling (TXT file upload)
====================== */

if (fileInput) {
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    
    if (!file) {
      return;
    }

    // Only accept text files
    if (!file.type.startsWith("text/") && !file.name.endsWith(".txt")) {
      alert("Please select a text file (.txt)");
      fileInput.value = ""; // Clear the input
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const fileContent = e.target.result;
      
      // Reset playback and load new text
      resetPlayback();
      
      // Update text input with file content
      if (textInput) {
        textInput.value = fileContent;
      }
      
      const words = parseText(fileContent);
      if (words.length > 0) {
        engine.loadText(words);
        console.log(`File loaded: ${words.length} words from ${file.name}`);
      } else {
        console.log("File is empty");
      }
    };

    reader.onerror = () => {
      alert("Error reading file");
      fileInput.value = ""; // Clear the input
    };

    reader.readAsText(file);
  });
}

// Initialize button states and status display
updateButtonStates();
updateStatusDisplay();
