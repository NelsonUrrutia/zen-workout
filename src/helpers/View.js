export default class View {
  /**
   * Gets the DOM element based on the provided selector
   * @param {HTMLElement} section The section DOM element
   * @param {string} selector The CSS selector for the desired element
   * @returns {HTMLElement}  The selected DOM element
   */
  getElement(section, selector) {
    return section.querySelector(selector);
  }

  /**
   *
   * @param {HTMLElement} section Element to scroll in to view
   * @param {String}  behavior `smooth, instant, auto`
   * @param {String} block `start, center, nearest, end`
   * @param {*} inline `start, center, nearest, end`
   */
  scrollIntoView(section, behavior, block, inline) {
    section.scrollIntoView({
      behavior,
      block,
      inline,
    });
  }
}
