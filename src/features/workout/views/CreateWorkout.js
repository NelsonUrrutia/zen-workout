import View from "../../../helpers/View.js";

/**
 * # CreateWorkout
 *
 * ## This class is responsible for handling the presentation logic
 * ## and user interface related to creating workouts.
 * @extends View
 */
class CreateWorkout extends View {
  /**
   * Creates an instance of CreateWorkout.
   * Initializes DOM elements for handling the form.
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
            <button data-delete-block>❌</button>
        </div>`;
      }
    );

    // Populate the HTML with the created markup
    this.workoutBlocks.innerHTML = workoutBlocksHTML.join("");
  }

  /**
   * Populates form with workout data
   * @param {Object} workoutData The workout data object
   */
  populateForm(workoutData) {
    const {
      id,
      date,
      name,
      sets,
      restingTimeSetsMinutes,
      restingTimeSetsSeconds,
      blocks,
      workingTimeBlocksSeconds,
      restingTimeBlocksSeconds,
      blockSettings,
    } = workoutData;

    this.form.querySelector(`#workout-id`).value = id;
    this.form.querySelector(`#created-at`).value = date;
    this.form.querySelector(`#name`).value = name;
    this.form.querySelector(`#sets`).value = sets;
    this.form.querySelector(`#resting-time-sets-minutes`).value =
      restingTimeSetsMinutes;
    this.form.querySelector(`#resting-time-sets-seconds`).value =
      restingTimeSetsSeconds;
    this.form.querySelector(`#blocks`).value = blocks;
    this.form.querySelector(`#working-time-blocks-seconds`).value =
      workingTimeBlocksSeconds;
    this.form.querySelector(`#resting-time-blocks-seconds`).value =
      restingTimeBlocksSeconds;
    this.createWorkoutsBlocksWithContent(blockSettings);
  }

  createWorkoutsBlocksWithContent(blockSettings) {
    this.workoutBlocks.innerHTML = blockSettings
      .map(({ name, order }) => {
        return `
      <div class="block">
          <label for="block-exercise-${order}">
            #${+order + 1} Block exercise 
          </label>
          <input type="text" value="${name}"  name="block-exercise-${order}" id="block-exercise-${order}" required />
          <button data-delete-block>❌</button>
      </div>`;
      })
      .join("");
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

  /**
   * Toggles the disabled attribute when on the form submit event
   * @param {Boolean} isDisabled Flag to toggle the disabled attribute
   */
  setInputsLoadingState(isDisabled) {
    this.form
      .querySelectorAll(`input`)
      .forEach((el) => (el.disabled = isDisabled));

    this.form
      .querySelectorAll("button")
      .forEach((el) => (el.disabled = isDisabled));
  }
}

/**
 * Exports a singleton instance of the CreateWorkout class
 */
export default new CreateWorkout();
