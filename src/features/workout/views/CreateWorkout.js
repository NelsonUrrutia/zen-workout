import View from "../../../helpers/View.js";

/**
 * # CreateWorkout
 *
 * ## This class is responsible for handling the presentation logic
 * ## and user interface related to creating workouts.
 * @class
 */
class CreateWorkout extends View {
  /**
   * Selecting the section elements
   */
  constructor() {
    super();
    this.createWorkoutSection = document.querySelector("#create-workout");
    this.openSectionBtn = this.getElement(
      this.createWorkoutSection,
      "#open-create-workout"
    );
    this.closeSectionBtn = this.getElement(
      this.createWorkoutSection,
      "#close-create-workout"
    );
    this.form = this.getElement(
      this.createWorkoutSection,
      "#create-workout-form"
    );
    this.createBlocksBtn = this.getElement(
      this.createWorkoutSection,
      "#create-blocks"
    );
    this.workoutBlocks = this.getElement(
      this.createWorkoutSection,
      "#create-workout-blocks"
    );
    this.clearWorkoutForm = this.getElement(
      this.createWorkoutSection,
      "#clear-workout-form"
    );
  }

  /**
   * Adds an event handler to the workout creation form submission event
   * @param {Function} handler Function to handle the form submission event
   */
  addHandlerCreateForm(handler) {
    this.form.addEventListener("submit", handler);
  }

  /**
   * Adds an event handler to the button for opening the section
   * @param {Function} handler Function to handle the open  button click event
   */
  addHandlerOpenSection(handler) {
    this.openSectionBtn.addEventListener("click", handler);
  }

  /**
   * Adds an event handler to the button for closing the section
   * @param {Function} handler Function to handle the close button click event
   */
  addEventHandlerCloseSection(handler) {
    this.closeSectionBtn.addEventListener("click", handler);
  }

  /**
   * Adds an event handler to the button for creating workout blocks
   * @param {Function} handler Function to handle the create blocks click event
   */
  addEventHandlerCreateBlocksBtn(handler) {
    this.createBlocksBtn.addEventListener("click", handler);
  }

  /**
   * Adds an event handler to the button to clear the workout form
   * @param {Function} handler Function to handle the clear form button click event
   */
  addEventHandlerClearWorkoutForm(handler) {
    this.clearWorkoutForm.addEventListener("click", handler);
  }

  /**
   * Opens the workout creation section by setting its visibility to "visible"
   */
  openSection() {
    this.createWorkoutSection.dataset.formVisibility = "visible";
  }

  /**
   * Closes the workout creation section by setting its visibility to "hidden"
   */
  closeSection() {
    this.createWorkoutSection.dataset.formVisibility = "hidden";
  }

  /**
   * Creates workout blocks based o the user input
   */
  createWorkoutBlocks() {
    // 1. Gets the input value for blocks to create
    const blocksToCreate = +this.form.querySelector("#blocks").value;
    if (!blocksToCreate) {
      alert("Add at least 1 block to continue");
      return;
    }

    // Create an array based on the quantity and with the markup
    const workoutBlocksHTML = Array.from(
      { length: blocksToCreate },
      (_, index) => {
        const indexBasedOne = index + 1;
        return `
        <div class="block">
            <label for="block-exercise-${index}">#${indexBasedOne} Block exercise </label>
            <input type="text" name="block-exercise-${index}" id="block-exercise-${index}" required />
        </div>`;
      }
    );

    // Populate the HTML with the created markup
    this.workoutBlocks.innerHTML = workoutBlocksHTML.join("");
  }

  /**
   * Clears the container for displaying workout blocks
   */
  clearWorkoutBlocks() {
    this.workoutBlocks.innerHTML = "";
  }

  /**
   * Submits the workout form and returns the form data
   * @param {Event} event The form submission event
   * @returns {FormData} The form data object
   */

  submitForm(event) {
    event.preventDefault();
    return new FormData(this.form);
  }

  /**
   * Resets the workout creation form
   */
  resetForm() {
    this.form.reset();
  }
}

/**
 * Exports a singleton instance of the CreateWorkout class
 */
export default new CreateWorkout();
