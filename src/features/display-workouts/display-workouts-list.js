import { Workout } from "../../models/Workout.js";

export class DisplayWorkoutsList extends HTMLElement {
  constructor() {
    super();
    this.workout = new Workout();
  }

  connectedCallback() {
    this.section = this;
    this.workoutsListContainer = this.querySelector("#workouts-list");
    this.loadingMessage = this.section.querySelector("#loading-message");
    this.errorMessageContainer = this.section.querySelector(
      "#display-workouts-list-error-message"
    );

    this.renderWorkouts();
    document.addEventListener("savedWorkout", this.renderWorkouts.bind(this));
  }

  disconnectedCallback() {}

  async renderWorkouts() {
    this.setErrorMessage();
    try {
      const workouts = await this.workout.getWorkouts();
      const workoutsMarkup = workouts
        .map((workout) => this.buildWorkoutMarkup(workout))
        .join("");
      this.workoutsListContainer.insertAdjacentHTML(
        "afterbegin",
        workoutsMarkup
      );
    } catch (error) {
      this.setErrorMessage(error);
    } finally {
      this.showLoadingMessage(false);
    }
  }

  buildWorkoutMarkup(workout) {
    const { id, date, name, sets, blocks, exercises } = workout;

    return `
    <div class="workout-item">
      <h3>${name}</h3>
      <small><strong>Created at:</strong> ${date}</small>
      <div class="workout-item-details">
        <div>
          <p><strong>Sets:</strong> ${sets}</p>
          <p><strong>Blocks:</strong> ${blocks}</p>
        </div>
        <div>
        <p><strong>Exercises:</strong></p>
          <ul>
            ${exercises.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      </div>
      <button class="select-workout">Select Workout</button>
      <button class="edit-workout">Edit Workout</button>
      <button class="delete-workout" data-id="${id}">Delete Workout</button>
    </div>`;
  }

  setErrorMessage(message = "") {
    this.errorMessageContainer = message;
  }

  showLoadingMessage(flag) {
    this.loadingMessage.style.display = flag ? "block" : "none";
  }
}
