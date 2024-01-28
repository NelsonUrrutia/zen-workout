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

  renderLoadingSpinner() {
    console.log("TODO render login spinner");
  }
}
