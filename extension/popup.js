// ======================
// Initialize Renderer
// ======================

const container = document.getElementById('rsvp-display');
const renderer = new RSVPRenderer(container, {
  highlightColor: '#ff6b6b',
  fontSize: '36px'
});

// ======================
// Word Info Display
// ======================

function updateWordInfo(word) {
  const wordInfoEl = document.getElementById('word-info');
  if (!wordInfoEl) return;

  const parts = renderer._splitWord(word);
  const orpIndex = renderer._getORPIndex(word.replace(/^["""'''`([{<¿¡]+/, ''));
  
  wordInfoEl.innerHTML = 
    `Word: "${word}" | Length: ${word.length} | ORP Index: ${orpIndex}<br>` +
    `Parts: ["${parts.before}"] [<span style="color:#ff6b6b">${parts.orp}</span>] ["${parts.after}"]`;
}

// ======================
// Playback Engine
// ======================

let playerState = "idle";
let playbackInterval = null;
let currentWords = [];
let currentIndex = 0;
let currentSpeed = 300; // WPM (Words Per Minute)

// Convert WPM to milliseconds per word
function wpmToMs(wpm) {
  return 60000 / wpm;
}

// Helper function to show next word
function showNextWord() {
  if (currentIndex < currentWords.length) {
    const word = currentWords[currentIndex];
    renderer.render(word);
    updateWordInfo(word);
    currentIndex++;
  } else {
    // Finished
    engine.pause();
    setState("finished");
  }
}

// Helper function to create playback interval
function createPlaybackInterval() {
  return setInterval(showNextWord, wpmToMs(currentSpeed));
}

const engine = {
  start() {
    if (currentWords.length === 0) {
      return;
    }
    
    // If paused, resume from current index
    // If idle/finished, start from beginning
    if (playerState !== "paused") {
      currentIndex = 0;
    }

    // Show first word immediately
    showNextWord();
    
    // Set up interval for remaining words
    playbackInterval = createPlaybackInterval();
  },

  pause() {
    if (playbackInterval) {
      clearInterval(playbackInterval);
      playbackInterval = null;
    }
  },

  reset() {
    engine.pause();
    currentIndex = 0;
    if (currentWords.length > 0) {
      renderer.render(currentWords[0]);
      updateWordInfo(currentWords[0]);
    } else {
      renderer.clear();
      const wordInfoEl = document.getElementById('word-info');
      if (wordInfoEl) wordInfoEl.innerHTML = '';
    }
  },

  setSpeed(wpm) {
    currentSpeed = wpm;
    // If currently playing, update the interval with new speed
    if (playerState === "playing" && playbackInterval) {
      // Clear the old interval
      clearInterval(playbackInterval);
      playbackInterval = null;
      
      // Create new interval with new speed, continuing from current position
      playbackInterval = createPlaybackInterval();
    }
  },

  loadText(words) {
    currentWords = words;
    currentIndex = 0;
    if (words.length > 0) {
      renderer.render(words[0]);
      updateWordInfo(words[0]);
    } else {
      renderer.clear();
      const wordInfoEl = document.getElementById('word-info');
      if (wordInfoEl) wordInfoEl.innerHTML = '';
    }
  }
};

// ======================
// State Management
// ======================

function setState(newState) {
  playerState = newState;
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
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  
  if (startBtn) {
    startBtn.disabled = (playerState === "playing");
  }
  if (pauseBtn) {
    pauseBtn.disabled = (playerState !== "playing");
  }
}

function resetPlayback() {
  if (playerState === "playing" || playerState === "paused") {
    engine.pause();
  }
  engine.reset();
  setState("idle");
}

function parseText(text) {
  if (!text || text.trim().length === 0) {
    return [];
  }
  return text.trim().split(/\s+/).filter(word => word.length > 0);
}

// ======================
// Button Controls
// ======================

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const replayBtn = document.getElementById('replayBtn');

if (startBtn) {
  startBtn.onclick = () => {
    if (playerState === "playing") {
      return;
    }
    engine.start();
    setState("playing");
  };
}

if (pauseBtn) {
  pauseBtn.onclick = () => {
    if (playerState !== "playing") {
      return;
    }
    engine.pause();
    setState("paused");
  };
}

if (replayBtn) {
  replayBtn.onclick = () => {
    engine.reset();
    engine.start();
    setState("playing");
  };
}

// ======================
// Speed Control
// ======================

const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

if (speedSlider && speedValue) {
  // Initialize display
  const initialWpm = Number(speedSlider.value);
  speedValue.textContent = initialWpm;
  currentSpeed = initialWpm;

  // Throttle speed updates to avoid too frequent interval recreation
  let speedUpdateTimeout = null;
  speedSlider.addEventListener('input', () => {
    const wpm = Number(speedSlider.value);
    speedValue.textContent = wpm;
    
    // Clear pending update
    if (speedUpdateTimeout) {
      clearTimeout(speedUpdateTimeout);
    }
    
    // Update speed with a small delay to batch rapid changes
    speedUpdateTimeout = setTimeout(() => {
      engine.setSpeed(wpm);
      speedUpdateTimeout = null;
    }, 50); // 50ms throttle
  });
}

// ======================
// Text Input Handling
// ======================

const textInput = document.getElementById('textInput');
if (textInput) {
  textInput.addEventListener('input', () => {
    const words = parseText(textInput.value);
    resetPlayback();
    if (words.length > 0) {
      engine.loadText(words);
    }
  });
}

// ======================
// File Input Handling
// ======================

const fileInput = document.getElementById('fileInput');
if (fileInput) {
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Only accept text files
    if (!file.type.startsWith("text/") && !file.name.endsWith(".txt")) {
      alert("Please select a text file (.txt)");
      fileInput.value = "";
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
      }
    };

    reader.onerror = () => {
      alert("Error reading file");
      fileInput.value = "";
    };

    reader.readAsText(file);
  });
}

// ======================
// Initialize
// ======================

updateButtonStates();
updateStatusDisplay();

// Load initial text
if (textInput) {
  const initialText = textInput.value || "The quick brown fox jumps over the lazy dog.";
  const initialWords = parseText(initialText);
  if (initialWords.length > 0) {
    engine.loadText(initialWords);
  }
}
