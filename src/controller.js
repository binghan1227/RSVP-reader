/**
 * RSVP Reader Controller
 * Unified controller for both index.html and extension popup
 *
 * @param {Object} options - Configuration options
 * @param {string} options.fontSize - Font size for renderer (default: '48px')
 * @param {boolean} options.disableStartOnPlay - Disable start button while playing (default: false)
 * @param {boolean} options.throttleSpeed - Throttle speed slider updates (default: false)
 * @param {string} options.defaultText - Default text if textarea is empty (default: null)
 */
function initRSVPController(options = {}) {
  const config = {
    fontSize: options.fontSize || '48px',
    disableStartOnPlay: options.disableStartOnPlay || false,
    throttleSpeed: options.throttleSpeed || false,
    defaultText: options.defaultText || null
  };

  // ======================
  // Initialize Renderer
  // ======================

  const displayContainer = document.getElementById("rsvp-display");
  const renderer = new RSVPRenderer(displayContainer, {
    highlightColor: '#ff6b6b',
    fontSize: config.fontSize
  });

  // ======================
  // Initialize Playback Engine
  // ======================

  let playerState = "idle";

  const engine = new RSVPPlaybackEngine(renderer, {
    speed: 300,
    onStateChange: (state) => {
      playerState = state;
      updateButtonStates();
    }
  });

  // ======================
  // DOM Elements
  // ======================

  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const replayBtn = document.getElementById("replayBtn");
  const speedSlider = document.getElementById("speedSlider");
  const speedValue = document.getElementById("speedValue");
  const textInput = document.getElementById("textInput");
  const fileInput = document.getElementById("fileInput");

  // ======================
  // State Management
  // ======================

  function updateButtonStates() {
    if (config.disableStartOnPlay && startBtn) {
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
  }

  // ======================
  // Button Controls
  // ======================

  if (startBtn) {
    startBtn.onclick = () => {
      if (playerState === "playing") return;

      if (playerState === "finished") {
        engine.reset();
      }

      engine.start();
    };
  }

  if (pauseBtn) {
    pauseBtn.onclick = () => {
      if (playerState !== "playing") return;
      engine.pause();
    };
  }

  if (replayBtn) {
    replayBtn.onclick = () => {
      engine.reset();
      engine.start();
    };
  }

  // ======================
  // Speed Control
  // ======================

  if (speedSlider && speedValue) {
    const initialWpm = Number(speedSlider.value);
    speedValue.textContent = initialWpm;
    engine.setSpeed(initialWpm);

    if (config.throttleSpeed) {
      let speedUpdateTimeout = null;
      speedSlider.addEventListener("input", () => {
        const wpm = Number(speedSlider.value);
        speedValue.textContent = wpm;

        if (speedUpdateTimeout) {
          clearTimeout(speedUpdateTimeout);
        }

        speedUpdateTimeout = setTimeout(() => {
          engine.setSpeed(wpm);
          speedUpdateTimeout = null;
        }, 50);
      });
    } else {
      speedSlider.addEventListener("input", () => {
        const wpm = Number(speedSlider.value);
        speedValue.textContent = wpm;
        engine.setSpeed(wpm);
      });
    }
  }

  // ======================
  // Text Input Handling
  // ======================

  if (textInput) {
    textInput.addEventListener("input", () => {
      const text = textInput.value;
      resetPlayback();
      if (text.trim().length > 0) {
        engine.loadText(text);
      }
    });
  }

  // ======================
  // File Input Handling
  // ======================

  if (fileInput) {
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("text/") && !file.name.endsWith(".txt")) {
        alert("Please select a text file (.txt)");
        fileInput.value = "";
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;

        resetPlayback();

        if (textInput) {
          textInput.value = fileContent;
        }

        if (fileContent.trim().length > 0) {
          engine.loadText(fileContent);
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

  if (textInput) {
    let initialText = textInput.value;
    if (!initialText && config.defaultText) {
      initialText = config.defaultText;
    }
    if (initialText && initialText.trim().length > 0) {
      engine.loadText(initialText);
    }
  }

  return { engine, renderer };
}
