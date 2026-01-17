/**
 * RSVPRenderer - Rapid Serial Visual Presentation renderer
 * Displays words with ORP (Optimal Recognition Point) highlighting
 */

const FUNCTION_WORDS = new Set([
  'a', 'an', 'the',
  'and', 'but', 'or', 'nor', 'for', 'yet', 'so',
  'to', 'of', 'in', 'on', 'at', 'by', 'up',
  'i', 'he', 'we', 'it',
  'is', 'am', 'be', 'do', 'as'
]);

class RSVPRenderer {
  /**
   * @param {HTMLElement} containerElement - The container element to render into
   * @param {Object} options - Configuration options
   * @param {string} options.highlightColor - Color for the ORP character (default: '#ff0000')
   * @param {string} options.fontSize - Font size for the display (default: '48px')
   */
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.highlightColor = options.highlightColor || '#ff0000';
    this.fontSize = options.fontSize || '48px';

    this._setupContainer();
  }

  /**
   * Set up the container with required child elements
   */
  _setupContainer() {
    this.container.classList.add('rsvp-container');
    this.container.style.fontSize = this.fontSize;

    // Create the three display parts
    this.beforeEl = document.createElement('span');
    this.beforeEl.classList.add('rsvp-before');

    this.orpEl = document.createElement('span');
    this.orpEl.classList.add('rsvp-orp');
    this.orpEl.style.color = this.highlightColor;

    this.afterEl = document.createElement('span');
    this.afterEl.classList.add('rsvp-after');

    this.container.innerHTML = '';
    this.container.appendChild(this.beforeEl);
    this.container.appendChild(this.orpEl);
    this.container.appendChild(this.afterEl);
  }

  /**
   * Calculate the ORP (Optimal Recognition Point) index for a word
   * @param {string} word - The word to calculate ORP for
   * @returns {number} The index of the ORP character
   */
  _getORPIndex(word) {
    let len = word.length;

    if (FUNCTION_WORDS.has(word.toLowerCase())) {
      len = Math.max(len, 4);
    }

    if (len <= 3) return 0;      // 1st letter (index 0)
    if (len <= 5) return 1;      // 2nd letter (index 1)
    if (len <= 9) return 2;      // 3rd letter (index 2)
    if (len <= 13) return 3;     // 4th letter (index 3)
    return 4;                     // 5th letter (index 4)
  }

  /**
   * Count leading punctuation/quotes in a word
   * @param {string} word - The word to check
   * @returns {number} Number of leading punctuation characters
   */
  _countLeadingPunctuation(word) {
    const punctuationPattern = /^["""'''`([{<¿¡]/;
    let count = 0;
    for (let i = 0; i < word.length; i++) {
      if (punctuationPattern.test(word[i])) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }

  /**
   * Split a word into before, ORP, and after parts
   * @param {string} word - The word to split
   * @returns {Object} Object with before, orp, and after properties
   */
  _splitWord(word) {
    if (!word || word.length === 0) {
      return { before: '', orp: '', after: '' };
    }

    // Count leading punctuation
    const leadingPunct = this._countLeadingPunctuation(word);

    // Get the actual word content (without leading punctuation)
    const contentWord = word.slice(leadingPunct);

    if (contentWord.length === 0) {
      // Word is all punctuation
      return { before: '', orp: word[0] || '', after: word.slice(1) };
    }

    // Calculate ORP index based on content word length
    const orpIndexInContent = this._getORPIndex(contentWord);

    // Adjust for leading punctuation
    const actualOrpIndex = leadingPunct + orpIndexInContent;

    return {
      before: word.slice(0, actualOrpIndex),
      orp: word[actualOrpIndex] || '',
      after: word.slice(actualOrpIndex + 1)
    };
  }

  /**
   * Render a word with ORP highlighting
   * @param {string} word - The word to display
   */
  render(word) {
    if (!word || word.length === 0) {
      this.clear();
      return;
    }

    const parts = this._splitWord(word);

    this.beforeEl.textContent = parts.before;
    this.orpEl.textContent = parts.orp;
    this.afterEl.textContent = parts.after;
  }

  /**
   * Clear the display
   */
  clear() {
    this.beforeEl.textContent = '';
    this.orpEl.textContent = '';
    this.afterEl.textContent = '';
  }

  /**
   * Set the highlight color for the ORP character
   * @param {string} color - CSS color value
   */
  setHighlightColor(color) {
    this.highlightColor = color;
    this.orpEl.style.color = color;
  }

  /**
   * Set the font size for the display
   * @param {string} size - CSS font size value
   */
  setFontSize(size) {
    this.fontSize = size;
    this.container.style.fontSize = size;
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RSVPRenderer;
}
