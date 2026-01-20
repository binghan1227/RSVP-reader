/**
 * RSVP Playback Engine
 * Unified playback engine for RSVP reader
 * 
 * SOURCE OF TRUTH: This is the master file.
 * extension/playback-engine.js should be kept in sync with this file.
 */

class RSVPPlaybackEngine {
  constructor(renderer, options = {}) {
    this.renderer = renderer;
    this.onStateChange = options.onStateChange || (() => {});
    this.onWordUpdate = options.onWordUpdate || (() => {});
    
    this.words = [];
    this.currentIndex = 0;
    this.intervalId = null;
    this.speed = options.speed || 300; // WPM (Words Per Minute)
    this.state = "idle"; // idle | playing | paused | finished
  }

  /**
   * Convert WPM to milliseconds per word
   */
  wpmToMs(wpm) {
    return 60000 / wpm;
  }

  /**
   * Load text and parse into words
   */
  loadText(text) {
    if (typeof text === 'string') {
      this.words = text.trim().split(/\s+/).filter(word => word.length > 0);
    } else if (Array.isArray(text)) {
      this.words = text;
    } else {
      this.words = [];
    }
    
    this.currentIndex = 0;
    this.state = "idle";
    
    if (this.words.length > 0) {
      this.renderer.render(this.words[0]);
      this.onWordUpdate(this.words[0]);
    } else {
      this.renderer.clear();
    }
    
    this.onStateChange(this.state);
  }

  /**
   * Set playback speed in WPM
   */
  setSpeed(wpm) {
    this.speed = wpm;
    
    // If currently playing, restart interval with new speed
    if (this.state === "playing" && this.intervalId !== null) {
      this._stopInterval();
      this._startInterval();
    }
  }

  /**
   * Start playback
   */
  start() {
    if (this.words.length === 0) {
      return;
    }

    // If paused, resume from current index
    // If idle/finished, start from beginning
    if (this.state !== "paused") {
      this.currentIndex = 0;
    }

    this.state = "playing";
    this.onStateChange(this.state);
    
    // Show first word immediately
    this._showCurrentWord();
    
    // Set up interval for remaining words
    this._startInterval();
  }

  /**
   * Pause playback
   */
  pause() {
    if (this.state !== "playing") {
      return;
    }
    
    this._stopInterval();
    this.state = "paused";
    this.onStateChange(this.state);
  }

  /**
   * Reset playback to beginning
   */
  reset() {
    this._stopInterval();
    this.currentIndex = 0;
    this.state = "idle";
    this.onStateChange(this.state);
    
    if (this.words.length > 0) {
      this.renderer.render(this.words[0]);
      this.onWordUpdate(this.words[0]);
    } else {
      this.renderer.clear();
    }
  }

  /**
   * Start the playback interval
   */
  _startInterval() {
    // Clear any existing interval
    this._stopInterval();

    const msPerWord = this.wpmToMs(this.speed);
    
    this.intervalId = setInterval(() => {
      this.currentIndex++;
      
      if (this.currentIndex >= this.words.length) {
        // Playback finished
        this._stopInterval();
        this.state = "finished";
        this.onStateChange(this.state);
      } else {
        this._showCurrentWord();
      }
    }, msPerWord);
  }

  /**
   * Stop the playback interval
   */
  _stopInterval() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Show current word
   */
  _showCurrentWord() {
    if (this.currentIndex < this.words.length) {
      const word = this.words[this.currentIndex];
      this.renderer.render(word);
      this.onWordUpdate(word);
    }
  }

  /**
   * Get current state
   */
  getState() {
    return this.state;
  }

  /**
   * Get current speed in WPM
   */
  getSpeed() {
    return this.speed;
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RSVPPlaybackEngine;
}
