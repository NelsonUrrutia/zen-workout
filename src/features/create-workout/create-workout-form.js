import { Workout } from "../../models/Workout.js";
import {
  convertMinuteBasedToSeconds,
  getCurrentDate,
  getDateNow,
} from "../../helpers/helpers.js";

/**
 * Represents a custom HTML element for creating workout forms.
 */
export class CreateWorkoutForm extends HTMLElement {
  /**
   * Constructor for CreateWorkoutForm.
   * Initializes the workout property with a new instance of Workout.
   */
  constructor() {
    super();
    this.workout = new Workout();
  }

  // Lifecycle method called when the element is added to the DOM
  connectedCallback() {
    this.section = this;
    this.form = this.section.querySelector("form");
    this.errorMessageContainer = this.querySelector("#error-message");

    this.form.addEventListener(
      "submit",
      this.formSubmitEventHandler.bind(this)
    );

    document.addEventListener(
      "editWorkout",
      this.editWorkoutEventHandler.bind(this)
    );
  }

  // Lifecycle method called when the element is removed from the DOM
  disconnectedCallback() {
    this.form.removeEventListener(
      "submit",
      this.formSubmitEventHandler.bind(this)
    );
  }

  /**
   * Event handler for form submission. Prevents the default form submission
   * and calls the savedWorkout method with form data.
   * @param {Event} event - The form submission event.
   */
  async formSubmitEventHandler(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(this.form));
    this.savedWorkout(data);
  }

  /**
   * Saves workout data, triggers a custom event, and handles errors.
   * @param {Object} data - The workout data from the form.
   */
  async savedWorkout(data) {
    this.setErrorMessage("");
    this.setLoadingState(true);

    try {
      const modelData = this.modelData(data);
      if (!modelData) return;
      await this.workout.saveWorkout(modelData);

      document.dispatchEvent(
        new CustomEvent("savedWorkout", { detail: modelData })
      );
    } catch (error) {
      console.error(error.message);
      this.setErrorMessage(error.message);
    } finally {
      this.setErrorMessage("");
      this.setLoadingState(false);
      this.form.reset();
    }
  }

  async editWorkoutEventHandler(event) {
    const { detail: id } = event;
    const workout = await this.workout.getWorkoutById(+id);
    this.fillFormInputs(workout);
  }

  fillFormInputs(workout) {
    const { id, name, sets, blocks, blockRestTime, blockWorkTime, exercises } =
      workout;

    const setRestTime = +workout.setRestTime;
    let minutes = Math.floor(setRestTime / 60);
    let seconds = setRestTime % 60;

    this.form.querySelector(`#name`).value = name;
    this.form.querySelector("#sets").value = sets;
    this.form.querySelector("#blocks").value = blocks;
    this.form.querySelector("#block-work-time").value = blockWorkTime;
    this.form.querySelector("#block-rest-time").value = blockRestTime;
    this.form.querySelector("#id").value = id;
    this.form.querySelector("#set-resting-minutes").value = minutes;
    this.form.querySelector("#set-resting-seconds").value = seconds;
    document.dispatchEvent(
      new CustomEvent("createExerciseInputsWithContent", { detail: exercises })
    );
  }

  /**
   * Processes raw form data into a structured model for the Workout class.
   * Validates input and provides error messages.
   * @param {Object} rawData - Raw form data.
   * @returns {Object|boolean} - Structured workout model data or false if validation fails.
   */
  modelData(rawData) {
    let {
      id,
      date,
      name,
      sets,
      "set-resting-minutes": setRestingMinutes,
      "set-resting-seconds": setRestingSeconds,
      blocks,
      "block-work-time": blockWorkTime,
      "block-rest-time": blockRestTime,
      ...exercisesObj
    } = rawData;

    const exercises = Object.values(exercisesObj);

    if (!exercises.length) {
      this.setErrorMessage("Add at least one exercise");
      return false;
    }

    return {
      id: +id || getDateNow(),
      date: date || getCurrentDate(),
      name,
      sets: +sets,
      setRestTime: convertMinuteBasedToSeconds(
        +setRestingMinutes,
        +setRestingSeconds
      ),
      blocks: +blocks,
      blockWorkTime,
      blockRestTime,
      exercises: Object.values(exercises),
    };
  }

  /**
   * Sets the error message in the designated container.
   * @param {string} message - The error message to be displayed.
   */
  setErrorMessage(message = "") {
    this.errorMessageContainer.innerHTML = message;
  }

  /**
   * Sets the loading state of the form.
   * @param {boolean} isLoading - Indicates whether the form is in a loading state.
   */
  setLoadingState(isLoading) {
    this.section.querySelector("button[type='submit']").disabled = isLoading;
    this.section.querySelector("button[type='reset']").disabled = isLoading;
    this.section
      .querySelectorAll("input")
      .forEach((el) => (el.disabled = isLoading));
  }
}
