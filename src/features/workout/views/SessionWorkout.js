import View from "../../../helpers/View.js";

/**
 * # SessionWorkout
 *
 * ## This class is responsible for handling the presentation logic
 * ## and user interface related to the session workout.
 * @extends View
 */
class SessionWorkout extends View {
  /**
   * Constructor for the ActiveWorkout class.
   * Initializes various DOM elements related to the active workout view.
   */
  constructor() {
    super();
    this.section = document.querySelector("#session-workout");
    this.activeWorkoutName = this.getElement(
      this.section,
      "#session-workout-name"
    );
    this.workoutTimer = this.getElement(this.section, "#workout-timer");
    this.restingTimer = this.getElement(this.section, "#resting-timer");
    this.startWorkoutBtn = this.getElement(this.section, "#start-workout");
    this.pauseWorkoutBtn = this.getElement(this.section, "#pause-workout");
    this.continueWorkoutBtn = this.getElement(
      this.section,
      "#continue-workout"
    );
    this.endWorkoutBtn = this.getElement(this.section, "#end-workout");
    this.activeExercise = this.getElement(this.section, "#active-exercise");
    this.nextExercise = this.getElement(this.section, "#next-exercise");
    this.blockCounter = this.getElement(this.section, "#block-counter");
    this.setCounter = this.getElement(this.section, "#set-counter");
  }

  /**
   * Adds an event handler for the 'Start Workout' button click.
   * @param {function} handler - The function to be called when the button is clicked.
   */
  addHandlerStartWorkout(handler) {
    this.startWorkoutBtn.addEventListener("click", handler);
  }

  /**
   * Adds an event handler for the 'Pause Workout' button click.
   * @param {function} handler - The function to be called when the button is clicked.
   */
  addHandlerPauseWorkout(handler) {
    this.pauseWorkoutBtn.addEventListener("click", handler);
  }

  /**
   * Sets the loading state of the active workout section.
   * @param {boolean} flag - If true, sets the loading state; otherwise, removes it.
   */
  setLoadingState(flag) {
    this.section.dataset.loadingSection = flag;
  }

  /**
   * Sets the active state of a given element.
   * @param {HTMLElement} element - The HTML element to set the active state.
   * @param {boolean} flag - If true, sets the active state; otherwise, removes it.
   */
  setActiveState(element, flag) {
    element.dataset.isActive = flag;
  }

  /**
   * Sets the disabled state of a given element.
   * @param {HTMLElement} element - The HTML element to set the disabled state.
   * @param {boolean} flag - If true, disables the element; otherwise, enables it.
   */
  setDisableState(element, flag) {
    element.disabled = flag;
  }

  /**
   * Sets the name of the active workout.
   * @param {string} name - The name of the active workout.
   */
  setActiveWorkoutName(name) {
    this.activeWorkoutName.innerHTML = name;
  }

  /**
   * Updates the workout timer display.
   * @param {number} time - The time value to be displayed in seconds.
   */
  updateWorkoutTimer(time) {
    this.workoutTimer.innerHTML = `<p>${time} seconds</p>`;
  }

  /**
   * Updates the resting timer display with minutes and seconds.
   * @param {number} minutes - The minutes value for the resting timer.
   * @param {number} seconds - The seconds value for the resting timer.
   */
  updateRestingTimer(minutes, seconds) {
    const minutesHTML = minutes ? `${minutes} minutes : ` : "";
    const secondsHTML = seconds ? `${seconds} seconds` : "00";

    this.restingTimer.innerHTML = `<p>${minutesHTML}${secondsHTML}</p>`;
  }

  /**
   * Updates the block counter display.
   * @param {number} counter - The current block counter value.
   * @param {number} total - The total number of blocks.
   */
  updateBlockCounter(counter, total) {
    this.blockCounter.innerHTML = `Blocks: ${counter}/${total}`;
  }

  /**
   * Updates the set counter display.
   * @param {number} counter - The current set counter value.
   * @param {number} total - The total number of sets.
   */
  updateSetCounter(counter, total) {
    this.setCounter.innerHTML = `Sets: ${counter}/${total}`;
  }

  /**
   * Updates the display for the active exercise.
   * @param {string} exercise - The name of the active exercise.
   */
  updateActiveExercise(exercise) {
    this.activeExercise.innerHTML = `${exercise}`;
  }

  /**
   * Updates the display for the next exercise.
   * @param {string} exercise - The name of the next exercise.
   */
  updateNextExercise(exercise) {
    this.nextExercise.innerHTML = `<strong>Next:</strong> ${exercise}`;
  }
}

// Export a single instance of ActiveWorkout.
export default new SessionWorkout();
